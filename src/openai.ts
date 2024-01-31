import {ChatOpenAI, OpenAIClient as OpenAI} from '@langchain/openai';
import {
    type AnyEventObject,
    fromObservable,
    fromPromise,
    toObserver,
    type ObservableActorLogic,
    type Observer,
    type PromiseActorLogic,
    type Values,
} from 'xstate';
import {
    ContextSchema,
    ConvertContextToJSONSchema,
    ConvertToJSONSchemas,
    createEventSchemas,
    EventSchemas,
    getAllTransitions
} from './utils';
import {FromSchema} from 'json-schema-to-ts';
import {CreateOpenAIToolsAgentParams} from "langchain/agents";
import {RunnableLambda, RunnablePassthrough, RunnableSequence} from "@langchain/core/runnables";
import {JsonOutputToolsParser} from "langchain/output_parsers";
import type {BaseLanguageModelInput} from "@langchain/core/language_models/base";
type ChatCompletionCreateParamsNonStreaming  = OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;
type ChatCompletionCreateParamsBase = OpenAI.Chat.Completions.ChatCompletionCreateParams;
type ChatCompletionCreateParamsStreaming = OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming;


/**
 * Creates [promise actor logic](https://stately.ai/docs/promise-actors) that uses the OpenAI API to generate a completion.
 *
 * @param openai The OpenAI instance.
 * @param agentSettings
 * @param inputFn A function that maps arbitrary input to OpenAI chat completion input.
 *
 */
export function fromChatCompletion<TInput>(
  openai: ChatOpenAI,
  agentSettings: CreateAgentOutput<any>,
  inputFn: (
    input: TInput
  ) => string | OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming
) {
  return fromPromise<OpenAI.Chat.Completions.ChatCompletion, TInput>(
    async ({ input }) => {
      const openAiInput = inputFn(input);
      const params: ChatCompletionCreateParamsNonStreaming =
        typeof openAiInput === 'string'
          ? {
              model: agentSettings.model,
              messages: [
                {
                  role: 'user',
                  content: openAiInput,
                },
              ],
            }
          : openAiInput;
        return await openai.completionWithRetry(params);
    }
  );
}

/**
 * Creates [observable actor logic](https://stately.ai/docs/observable-actors) that uses the OpenAI API to generate a completion stream.
 *
 * @param openai The OpenAI instance to use.
 * @param agentSettings
 * @param inputFn A function that maps arbitrary input to OpenAI chat completion input.
 */
export function fromChatCompletionStream<TInput>(
  openai: ChatOpenAI,
  agentSettings: CreateAgentOutput<any>,
  inputFn: (
    input: TInput
  ) => string | OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming
) {
  return fromObservable<OpenAI.Chat.Completions.ChatCompletionChunk, TInput>(
    ({ input }) => {
      const observers = new Set<Observer<any>>();

      (async () => {
        const openAiInput = inputFn(input);
        const resolvedParams: ChatCompletionCreateParamsBase =
          typeof openAiInput === 'string'
            ? {
                model: agentSettings.model,
                messages: [
                  {
                    role: 'user',
                    content: openAiInput,
                  },
                ],
               stream: true
              }
            : openAiInput;
        const stream = await openai.completionWithRetry({
          ...resolvedParams , 
            stream: true
        });

        for await (const part of stream) {
          observers.forEach((observer) => {
            observer.next?.(part);
          });
        }
      })();

      return {
        subscribe: (...args) => {
          const observer = toObserver(...(args as any));
          observers.add(observer);

          return {
            unsubscribe: () => {
              observers.delete(observer);
            },
          };
        },
      };
    }
  );
}

/**
 * Creates [promise actor logic](https://stately.ai/docs/promise-actors) that passes the next possible transitions as functions to [OpenAI tool calls](https://platform.openai.com/docs/guides/function-calling) and returns an array of potential next events.
 *
 * @param openai The OpenAI instance to use.
 * @param agentSettings
 * @param inputFn A function that maps arbitrary input to OpenAI chat completion input.
 * @param options
 */
export function fromEventChoice<TInput>(
  openai: CreateOpenAIToolsAgentParams["llm"],
  agentSettings: CreateAgentOutput<any>,
  inputFn: (
    input: TInput
  ) => BaseLanguageModelInput,
  options?: {
    /**
     * Immediately execute sending the event to the parent actor.
     * @default false
     */
    execute?: boolean;
  }
) {
    return fromPromise<AnyEventObject[] | undefined, TInput>(
        async ({input, self, system}) => {
            const transitions = getAllTransitions(self._parent!.getSnapshot());
            const functionNameMapping: Record<string, string> = {};
            const functions:OpenAI.ChatCompletionTool[] = transitions
                .filter((t) => {
                    return !t.eventType.startsWith('xstate.');
                })
                .map((t) => {
                    const name = t.eventType.replace(/\./g, '_');
                    functionNameMapping[name] = t.eventType;
                    return {
                        type: 'function', 
                         function: { 
                            name,
                            description:
                                t.description ??
                                agentSettings.schemas.events[t.eventType]?.description,
                            parameters: {
                                type: 'object',
                                properties:
                                    agentSettings.schemas.events[t.eventType]?.properties ?? {},
                            },
                        },
                    }  ;
                });
 
            const openAiInput = inputFn(input);

            const callSelectedTool = RunnableLambda.from(
                (toolInvocation: Record<string, any>) => { 
                      const toolCallChain = RunnableSequence.from([
                        (toolInvocation) => toolInvocation.args,
                         new RunnableLambda({
                             func: async (args) => {
                                 if(options?.execute) {
                                     // @ts-ignore
                                     system._relay(self, self._parent, {
                                         type: functionNameMapping[toolInvocation.type],
                                         ...args,
                                     })
                                 }
                             }
                         })
                    ]);
                    // We use `RunnablePassthrough.assign` here to return the intermediate `toolInvocation` params
                    // as well, but you can omit if you only care about the answer.
                    return RunnablePassthrough.assign({
                        output: toolCallChain,
                    });
                }
            );
            const modelWithTools =  openai.bind({tools: functions} )

            const chain = RunnableSequence.from([
                modelWithTools,
                new JsonOutputToolsParser(),
                // .map() allows us to apply a function for each item in a list of inputs.
                // Required because the model can call multiple tools at once.
                callSelectedTool.map(),
                new JsonOutputToolsParser()
            ]);

 
            return  await chain.invoke(openAiInput);
        }
    );
}

export interface CreateAgentOutput<
  T extends {
    model: ChatCompletionCreateParamsBase['model'];
    context: ContextSchema;
    events: EventSchemas;
  }
> {
  model: T['model'];
  schemas: T;
  types: {
    context: FromSchema<ConvertContextToJSONSchema<T['context']>>;
    events: FromSchema<Values<ConvertToJSONSchemas<T['events']>>>;
  };
  fromEvent: <TInput>(
    inputFn: (input: TInput) => string | ChatCompletionCreateParamsNonStreaming
  ) => PromiseActorLogic<
    FromSchema<Values<ConvertToJSONSchemas<T['events']>>>[] | undefined,
    TInput
  >;
  fromEventChoice: <TInput>(
    inputFn: (input: TInput) => string | ChatCompletionCreateParamsNonStreaming
  ) => PromiseActorLogic<
    FromSchema<Values<ConvertToJSONSchemas<T['events']>>>[] | undefined,
    TInput
  >;
  fromChatCompletion: <TInput>(
    inputFn: (input: TInput) => string | ChatCompletionCreateParamsNonStreaming
  ) => PromiseActorLogic<OpenAI.Chat.Completions.ChatCompletion, TInput>;
  fromChatCompletionStream: <TInput>(
    inputFn: (input: TInput) => string | ChatCompletionCreateParamsStreaming
  ) => ObservableActorLogic<
    OpenAI.Chat.Completions.ChatCompletionChunk,
    TInput
  >;
}

export function createAgent<
  T extends {
    model: ChatCompletionCreateParamsBase['model'];
    context: ContextSchema;
    events: EventSchemas;
  }
>(openai: ChatOpenAI, settings: T): CreateAgentOutput<T> {
  const agentSettings: CreateAgentOutput<T> = {
    model: settings.model,
    schemas: {
      context: {
        type: 'object',
        properties: settings.context,
        additionalProperties: false,
      },
      events: createEventSchemas(settings.events),
    } as any,
    types: {} as any,
    fromEvent: (input) =>
      // @ts-ignore
      fromEventChoice(openai, agentSettings, input, { execute: true }),
    // @ts-ignore infinitely deep
    fromEventChoice: (input) => fromEventChoice(openai, agentSettings, input),
    fromChatCompletion: (input) =>
      fromChatCompletion(openai, agentSettings, input),
    fromChatCompletionStream: (input) =>
      fromChatCompletionStream(openai, agentSettings, input),
  };

  return agentSettings as any;
}
 
