import { TemplatePreprocessor, TemplatePreprocessorFn } from "./_template-preprocessor";
import { TemplatePreprocessorsRegistry } from "./_template-preprocessors-registry";

/**
 * based on screen-sets-app - ConditionBinding.ts - cleanHtML method
 * **/
class ConditionBindingPreprocessor extends TemplatePreprocessor {

    name = 'condition-binding';

    preprocessTemplate: TemplatePreprocessorFn = (screenTemplate: HTMLElement) => {

        screenTemplate.querySelectorAll('[data-condition]').forEach(el => {

            // If condition was set, wrap element in gigya-container with data-condition set.
            const condition = el.getAttribute('data-condition');
            if (condition) {
                el.removeAttribute('data-condition');
                el.classList.remove('gigya-conditional');
                if (!el.parentElement.classList.contains('gigya-visible-when')) {
                    const wrapper = document.createElement('div');
                    wrapper.classList.add("gigya-container", "gigya-visible-when");
                    wrapper.setAttribute('data-condition', condition);
                    el.parentElement.insertBefore(wrapper, el);
                    el.parentElement.removeChild(el);
                    wrapper.appendChild(el);
                }
                el.parentElement.setAttribute('data-condition', condition);
                const onRender = el.getAttribute('data-on-render');
                if(onRender !== null) {
                    el.removeAttribute('data-on-render');
                    el.parentElement.setAttribute('data-on-render', onRender);
                }
            }
        });
    }
}

TemplatePreprocessorsRegistry.registerTemplatePreprocessor(new ConditionBindingPreprocessor());
