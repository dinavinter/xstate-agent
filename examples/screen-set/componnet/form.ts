import { Behavior } from "../model/behavior";
import {ContainerTemplate} from "../model/containerTemplate";
import {FormTemplate} from "../model/formTemplate";

interface IFormComponent extends FormTemplate {
}

class FormComponent extends HTMLElement   {
    constructor() {
        super();
          this.attachShadow({mode: 'open'});
    }
    

 
    connectedCallback() {
          this.render();
    }

    render() {
        // For the purpose of this example, we'll just create a placeholder form.
        // A real implementation would dynamically create form fields based on this component's attributes or child elements.
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Form specific styles */
                .form-container {
                    /* Styles */
                }
            </style>
            <form class="form-container">
                <p>Dynamic form based on attributes will go here.</p>
                <!-- Dynamically add form fields here based on attributes -->
            </form>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('form-component', FormComponent);
