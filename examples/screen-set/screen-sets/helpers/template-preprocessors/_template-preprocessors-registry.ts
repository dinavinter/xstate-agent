import { TemplatePreprocessor, TemplatePreprocessorFn } from "./_template-preprocessor";

type TemplatePreprocessorsMap = {[name: string]: TemplatePreprocessor};

export class TemplatePreprocessorsRegistry {

    private static registry: TemplatePreprocessorsMap = {};

    public static registerTemplatePreprocessor(tp: TemplatePreprocessor){
        const registry = TemplatePreprocessorsRegistry.registry;
        if (registry[tp.name])
            throw new Error(`template preprocessor "${tp.name}" already exists`);
        registry[tp.name] = tp;
    }

    public static getAllTemplatePreprocessors(): TemplatePreprocessorFn[] {
        const registry = TemplatePreprocessorsRegistry.registry;
        return Object.keys(registry).map(key => registry[key].preprocessTemplate);
    }
}
