import { TemplatePreprocessor, TemplatePreprocessorFn } from "./_template-preprocessor";
import { TemplatePreprocessorsRegistry } from "./_template-preprocessors-registry";
import {ApiLinkAttributes, ApiLinkTemplate} from '../../lib/screen-sets/template/widgets/api-link-template';

/**
 * based on screen-sets-app - ConditionBinding.ts - cleanHtML method
 * **/
class ApiLinkWidgetPreprocessor extends TemplatePreprocessor {
    name: string = 'api-link-widget';

    preprocessTemplate: TemplatePreprocessorFn  = (screenTemplate: HTMLElement) => {
        screenTemplate.querySelectorAll(ApiLinkAttributes.selector).forEach(el => {
            const widget = new ApiLinkTemplate(el as HTMLElement);
            widget.disableOnRender = false;
        });
    }
}

TemplatePreprocessorsRegistry.registerTemplatePreprocessor(new ApiLinkWidgetPreprocessor());
