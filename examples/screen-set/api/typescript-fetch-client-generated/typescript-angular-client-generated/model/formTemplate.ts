/**
 * Form Template API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Behavior } from './behavior';
import { ContainerTemplate } from './containerTemplate';

export interface FormTemplate { 
    /**
     * A brief description of the form.
     */
    description?: string;
    behavior: Behavior;
    children: Array<ContainerTemplate>;
    
    /**
     * Defines which screen to switch in case of successful submission and processing of the form. If not specified, after successful processing of the form, the flow finishes and SAP Customer Data Cloud hides the screen-set (see also Removing the Screen-Set section).
     */
    dataOnSuccessScreen?: string;
    /**
     * A boolean attribute with a default value \"false\". When the value is set to \"true\" and all the required fields in the form have data (from the database), the form is automatically skipped and behaves as if it was successfully submitted and processed. SAP Customer Data Cloud loads the data-on-success-screen if defined, or finishes the flow and hides the screen-set. The data-auto-skip logic also takes into consideration the data-empty-fields settings, so a screen may not be skipped if it has a container that has missing required fields and passes all other defined conditions (so the container is visible).
     */
    dataAutoSkip?: boolean;
    /**
     * When specified, this attribute overrides the data-on-success next screen attribute and allows specifying a different next screen when the form is successfully submitted vs. when the screen is auto-skipped. If this attribute is not specified, then the next screen for both cases is determined by the data-on-success attribute.
     */
    dataOnAutoSkipScreen?: string;
    /**
     * Indicates the next screen to display when a screen in a different screen-set was skipped, returning control to the current screen-set.
     */
    dataOnScreensetSkippedScreen?: string;
    /**
     * Indicates the next screen to display when the user is missing a login identity.
     */
    dataOnMissingLoginidScreen?: string;
}