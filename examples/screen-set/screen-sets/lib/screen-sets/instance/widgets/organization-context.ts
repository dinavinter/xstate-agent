import {GigyaWidget} from '../widget';
import {WidgetType} from '../../template/control-template';
import {
    IOrganizationInfo
} from "../../../../../../../src/accounts/Gigya.JS.Plugin.screenSet2/app/Widgets/OrganizationContextWidget";

export const OrganizationContextConsts = {
    changeOrganizationContextWidgetSelector: 'div.gigya-organization-context-widget',
    organizationContextLabelTextSelector: '.gigya-organization-context-label-text',
    organizationContextSelectOptionSelector: '.gigya-organization-context-dropdown-options',
    selectElementCellClass: 'gigya-organization-context-dropdown-control',
    selectElementCellSelector: '.gigya-organization-context-dropdown-control',
    selectElemetnSelector: '.gigya-organization-context-dropdown',
    linkButtonElementSelector: '.gigya-organization-context-control-link-button',
    widgetHostAttribute: 'data-widget-host'
};

export interface SelectOrganizationInfo {
    organizations : IOrganizationInfo[],
    selectedOrganization: IOrganizationInfo,
    disabled: boolean
}

export class OrganizationContextWidget extends GigyaWidget {
    public static get selector(): string {
        return `${OrganizationContextConsts.changeOrganizationContextWidgetSelector}`;
    };


    public getOrganizationSelectInfo(): SelectOrganizationInfo {
        const selectEl = this.getSelectEl();

        let organizations: IOrganizationInfo[] = [];
        let selectedOrganization: IOrganizationInfo = null;
        for (let i = 0; i < selectEl.options.length; i++) {
            const option = selectEl.options[i] as HTMLOptionElement;
            organizations.push( {
                orgName : option.text,
                bpid : option.value,
                orgId: null,
                status: 'active'
            });

            if(option.selected && option.value != ''){
                selectedOrganization = organizations[organizations.length - 1];
            }
        }
        return {
            organizations: organizations,
            selectedOrganization: selectedOrganization,
            disabled: selectEl.disabled
        };
    }

    public chooseOrganizationContextInSelect(bpid: string) {
        const selectEl = this.getSelectEl();

        for (let i = 0; i < selectEl.options.length; i++) {
            const option = selectEl.options[i] as HTMLOptionElement;
            if(option.value === bpid){
                option.selected = true;
                selectEl.dispatchEvent(new UIEvent('change'));
                return;
            }
        }
    }

    public clickSelectButton() {
        const buttonEl = this.getLinkButtonElement();
        if(buttonEl)
            buttonEl.dispatchEvent(new UIEvent('click'));
    }

    public getSelectEl(): HTMLSelectElement{
        return <HTMLSelectElement>this.nativeElement.querySelector(OrganizationContextConsts.selectElemetnSelector);
    }

    public getLinkButtonElement() {
        return <HTMLSelectElement>this.nativeElement.querySelector(OrganizationContextConsts.linkButtonElementSelector);
    }
}


GigyaWidget.addWidgetToLibrary(WidgetType.OrganizationContext, OrganizationContextWidget);
