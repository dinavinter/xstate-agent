export type TemplatePreprocessorFn = (screenTemplate: HTMLElement) => void;

export abstract class TemplatePreprocessor {

    abstract name: string;
    abstract preprocessTemplate: TemplatePreprocessorFn;
}
