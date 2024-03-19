import {ScreenSet} from "../instance/screen-set";
import {DefaultScreenID, ScreenTemplate} from "./screen-template";
import {clearScreenSetsCache, getScreenSetElementById} from "../../../helpers/utils";
import { ServerEndpoint } from "../../api/endpoints";
import { ApiMockFactory } from "../../../mocks/api/mock-factory";
import {ScreenSetParams} from "../events.interface";
import mockBackend from "../../../lib/api/mock-backend";
import { TemplatePreprocessorsRegistry } from "../../../helpers/template-preprocessors/_template-preprocessors-registry";
import {merge, remove} from 'lodash';

export enum ScreenSetType {
    RegistrationLogin = "RegistrationLogin",
    RegistrationLoginOuterSize = "RegistrationLoginOuterSize",
    ReAuthentication = "ReAuthentication",
    ProfileUpdate = "ProfileUpdate",
    LiteRegistration = "LiteRegistration",
    OneAccountSubscription = "OneAccountSubscription",
    LinkAccounts = "LinkAccounts",
    PasswordlessLogin = "PasswordlessLogin",
    RegistrationLoginForceLinking = "RegistrationLoginForceLinking",
    OrganizationRegistration = "OrganizationRegistration",
    RegistrationLoginWithMultiTfaProviders = "RegistrationLoginWithMultiTfaProviders"
}

const templateLiterals = new Map<ScreenSetType, string>();
templateLiterals.set(ScreenSetType.RegistrationLogin, require(`../../../mocks/screen-sets/defaults/RegistrationLogin.html`));
templateLiterals.set(ScreenSetType.RegistrationLoginOuterSize, require(`../../../mocks/screen-sets/use-cases/RegistrationLoginOuterSize.html`));
templateLiterals.set(ScreenSetType.RegistrationLoginForceLinking, require(`../../../mocks/screen-sets/use-cases/RegistrationLoginForceLinking.html`));
templateLiterals.set(ScreenSetType.RegistrationLoginWithMultiTfaProviders, require(`../../../mocks/screen-sets/use-cases/RegistrationLoginWithMultiTfaProviders.html`));
templateLiterals.set(ScreenSetType.LinkAccounts, require(`../../../mocks/screen-sets/defaults/LinkAccounts.html`));
templateLiterals.set(ScreenSetType.ProfileUpdate, require(`../../../mocks/screen-sets/defaults/ProfileUpdate.html`));
templateLiterals.set(ScreenSetType.ReAuthentication, require(`../../../mocks/screen-sets/defaults/ReAuthentication.html`));
templateLiterals.set(ScreenSetType.LiteRegistration, require(`../../../mocks/screen-sets/defaults/LiteRegistration.html`));
templateLiterals.set(ScreenSetType.OneAccountSubscription, require(`../../../mocks/screen-sets/defaults/OneAccountSubscription.html`));
templateLiterals.set(ScreenSetType.PasswordlessLogin, require(`../../../mocks/screen-sets/defaults/PasswordlessLogin.html`));
templateLiterals.set(ScreenSetType.OrganizationRegistration, require(`../../../mocks/screen-sets/defaults/OrganizationRegistration.html`));

const screenSetTranslations = new Map<ScreenSetType, any>();
screenSetTranslations.set(ScreenSetType.RegistrationLogin, require(`../../../mocks/screen-sets/defaults/RegistrationLogin.json`));
screenSetTranslations.set(ScreenSetType.RegistrationLoginOuterSize, require(`../../../mocks/screen-sets/defaults/RegistrationLogin.json`));
screenSetTranslations.set(ScreenSetType.RegistrationLoginForceLinking, require(`../../../mocks/screen-sets/defaults/RegistrationLogin.json`));
screenSetTranslations.set(ScreenSetType.RegistrationLoginWithMultiTfaProviders, require(`../../../mocks/screen-sets/defaults/RegistrationLogin.json`));
screenSetTranslations.set(ScreenSetType.LinkAccounts, require(`../../../mocks/screen-sets/defaults/LinkAccounts.json`));
screenSetTranslations.set(ScreenSetType.ProfileUpdate, require(`../../../mocks/screen-sets/defaults/ProfileUpdate.json`));
screenSetTranslations.set(ScreenSetType.ReAuthentication, require(`../../../mocks/screen-sets/defaults/ReAuthentication.json`));
screenSetTranslations.set(ScreenSetType.LiteRegistration, require(`../../../mocks/screen-sets/defaults/LiteRegistration.json`));
screenSetTranslations.set(ScreenSetType.OneAccountSubscription, require(`../../../mocks/screen-sets/defaults/OneAccountSubscription.json`));
screenSetTranslations.set(ScreenSetType.PasswordlessLogin, require(`../../../mocks/screen-sets/defaults/PasswordlessLogin.json`));
screenSetTranslations.set(ScreenSetType.OrganizationRegistration, require(`../../../mocks/screen-sets/defaults/OrganizationRegistration.json`));

export const screenSetTemplateCollection = new Map<ScreenSetType, ScreenSetTemplate>();

export enum AB_TESTING_ATTRIBUTES {
    GROUP = 'data-variant-group',
    PERCENTAGE = 'data-variant-percentage',
    ORIGINAL_SCREEN = 'data-variant-original-screen',
    ACTIVE_GROUPS = 'data-active-groups',
    TEST_START_DATE = 'data-test-start-date',
    TEST_ID = 'data-variant-test-id'
}

export interface IVariantConfig {
    id: string;
    percentage: number;
    isOriginal?: boolean;
}

export class ScreenSetTemplate {

    private _instance: ScreenSet;
    private _screenSetTemplateEl: HTMLDivElement;
    private _screenTemplates = new Map<DefaultScreenID | string, ScreenTemplate>();

    constructor(type: ScreenSetType, protected css: string = '', protected translations: Object = {}) {
        this.init(type);
    }

    private init(type: ScreenSetType) {
        this.initScreenSetTemplate(type);
        this.setupMockResponseForGetScreenSets(type);
    }

    public getScreenTemplate(id: DefaultScreenID | string): ScreenTemplate {
        if(!this._screenTemplates.has(id)) {
            throw new Error(`Screen: ${id} doesn't exist`);
        }
        return this._screenTemplates.get(id);
    }

    public addScreen(id: string, templateID: DefaultScreenID): ScreenTemplate {
        if(!this._screenTemplates.has(templateID)) {
            throw new Error(`Can't find template screen ${templateID}`);
        }
        return this._addScreenFromBaseScreen(this._screenTemplates.get(templateID), id);
    }

    public removeScreen(id: string) {
        if(!this._screenTemplates.has(id)) {
            throw new Error(`Can't remove screen: ${id}, because it doesn't exist`);
        }
        this._screenSetTemplateEl.removeChild(getScreenSetElementById(id, this._screenSetTemplateEl));
        this._screenTemplates.delete(id);
    }

    public setTranslations(langKey: string, translationsObj: Object) {
        this.translations = merge(this.translations, {[langKey]: translationsObj});
    }

    public createABTest(screenId: DefaultScreenID, testId: string, variants: IVariantConfig[]): ScreenSetTemplate {
        if (!this._screenTemplates.has(screenId)) {
            throw new Error(`Can't find template screen ${screenId}`);
        }
        for (const variant of variants) {
            this.addScreen(variant.id, screenId).setAsScreenVariant(variant, screenId, testId);
        }
        this.removeScreen(screenId);
        return this;
    }

    public startABTest(screenId: DefaultScreenID): ScreenSetTemplate {
        this.addMetadata(AB_TESTING_ATTRIBUTES.ACTIVE_GROUPS, [...this.getActiveGroups(), screenId].join(','));
        return this;
    }

    public stopABTest(screenId: DefaultScreenID): ScreenSetTemplate {
        this.addMetadata(AB_TESTING_ATTRIBUTES.ACTIVE_GROUPS, remove(this.getActiveGroups(), screenId).join(','));
        return this;
    }

    public addMetadata(key: string, value: string) {
        key = key?.startsWith('data-') ? key: `data-${key}`;
        this._screenSetTemplateEl.setAttribute(key, value);
    }

    public async show(startScreen?: DefaultScreenID | string, params?: Partial<ScreenSetParams>): Promise<ScreenSet> {
        if (this._instance) {
            console.warn('calling show on screen-set while we already have an instance displayed!');
            await this._instance.hide();
        }
        clearScreenSetsCache();
        this._instance = new ScreenSet(this._screenSetTemplateEl.id, startScreen, params as ScreenSetParams);
        await this._instance.show();
        return this._instance;
    }

    public async dispose() {
        if (this._instance) {
            await this._instance.hide();
        }
    }

    private _addScreenFromBaseScreen(baseScreen: ScreenTemplate, newScreenID: string): ScreenTemplate {
        if(this._screenTemplates.has(newScreenID)) {
            throw new Error(`Can't add screen: ${newScreenID}, the screen already exist`);
        }
        const newScreenEl = document.createElement('div');
        baseScreen.attributes.forEach(attr => {
            newScreenEl.setAttribute(attr.name, attr.value);
        });
        newScreenEl.id = newScreenID;
        newScreenEl.innerHTML = baseScreen.template;
        this._screenSetTemplateEl.appendChild(newScreenEl);
        const screenTpl = new ScreenTemplate(newScreenEl);
        this._screenTemplates.set(newScreenID, screenTpl);
        return screenTpl;
    }

    private initScreenSetTemplate(type: ScreenSetType) {

        // get or create the parent div wrapper for the screen-sets templates
        const localScreenSets = document.createElement('div');

        // inject the (default) screen-set template into the DOM
        localScreenSets.innerHTML = localScreenSets.innerHTML + templateLiterals.get(type);
        this._screenSetTemplateEl = getScreenSetElementById<HTMLDivElement>(`Default-${ScreenSetType[type]}`, localScreenSets);

        // set this ScreenSetTemplate instance in the global map
        screenSetTemplateCollection.set(type, <ScreenSetTemplate>this);

        this.initScreenTemplates();
    }

    private initScreenTemplates() {
        // get all screen templates from current screen-set template
        const screenTemplates = this._screenSetTemplateEl.querySelectorAll<HTMLElement>('div.gigya-screen');
        Array.from(screenTemplates).forEach((screenTemplate: HTMLElement) => {
            // ui-builder sometimes makes changes to the template before it saves it. this is to sync things up..
            this.preprocessScreenTemplate(screenTemplate);
            // add a new screen-template into the current screen-set screens map
            this._screenTemplates.set(screenTemplate.id, new ScreenTemplate(<HTMLDivElement>screenTemplate))
        });
    }

    private setupMockResponseForGetScreenSets(type: ScreenSetType) {
        mockBackend
            .when(ServerEndpoint.GetScreenSets, {screenSetIDs: `Default-${ScreenSetType[type]}`})
            .returnResponse((params) => {
                return ApiMockFactory.createResponse({
                    screenSets: [{
                        screenSetID: `Default-${ScreenSetType[type]}`,
                        metadata: {},
                        html: this._screenSetTemplateEl.outerHTML,
                        css: this.css,
                        translations: merge(this.translations, {[params.lang]: screenSetTranslations.get(type).default})
                    }]
                });
            });
    }
    private preprocessScreenTemplate(screenTemplate: HTMLElement) {
        const templatePreprocessors = TemplatePreprocessorsRegistry.getAllTemplatePreprocessors();
        templatePreprocessors.forEach(templatePreprocessor => templatePreprocessor(screenTemplate));
    }

    private getActiveGroups(): string[] {
        if (this._screenSetTemplateEl.hasAttribute(AB_TESTING_ATTRIBUTES.ACTIVE_GROUPS)) {
            return this._screenSetTemplateEl?.getAttribute(AB_TESTING_ATTRIBUTES.ACTIVE_GROUPS)?.split(',') || [];
        }
        return [];
    }
}

export function createDefaultScreenSets() {
    return [
        new ScreenSetTemplate(ScreenSetType.RegistrationLogin),
        new ScreenSetTemplate(ScreenSetType.ReAuthentication),
        new ScreenSetTemplate(ScreenSetType.ProfileUpdate),
        new ScreenSetTemplate(ScreenSetType.LinkAccounts),
        new ScreenSetTemplate(ScreenSetType.LiteRegistration),
        new ScreenSetTemplate(ScreenSetType.OneAccountSubscription),
        new ScreenSetTemplate(ScreenSetType.PasswordlessLogin),
	    new ScreenSetTemplate(ScreenSetType.OrganizationRegistration)
    ];
}

export function injectIntoDocument(screenSet: ScreenSetType) {
    const templateLiteral = templateLiterals.get(screenSet);
    document.body.innerHTML += templateLiteral;
}




/*
 get css() {return this.getAttribute('css') || '';}
    set css(val) {if(val) this.setAttribute('css', val);}
   get dataHeight() {return this.getAttribute('id') || '';}
   set dataHeight(val) {if(val) this.setAttribute('id', val);}
    get dataResponsive() {return this.hasAttribute('data-responsive');}
    
    set dataResponsive(val) {if(val) this.setAttribute('data-responsive', val);}
    get dataStartScreen() {return this.getAttribute('data-start-screen') || '';}
    
    set dataStartScreen(val) {if(val) this.setAttribute('data-start-screen', val);}
    get dataWidth() {return this.getAttribute('data-width') || '100%';}
    set dataWidth(val) {if(val) this.setAttribute('data-width', val);}
    get id() {return this.getAttribute('screen-id') || '';}
    set id(val) {if(val) this.setAttribute('id', val);}
    get links() {return this.getAttribute('links') ? this.getAttribute('links')?.split(',') : [];}
    set links(val) {if(val) this.setAttribute('links', val.join(','));}
    get dataDialogStyle() {return this.getAttribute('data-dialog-style') || 'none';}
    set dataDialogStyle(val) {if(val) this.setAttribute('data-dialog-style', val);}

 */

/*`    const styleElement = document.createElement('style');
          styleElement.textContent = 
              
              :host {
                  display: block;
                  width: ${this.dataWidth};
                  height: ${this.dataHeight};
                  ${this.css}  
              }
  
               .screen-set-container {
                  box-sizing: border-box;
               }
  
               ${this.dataResponsive ? `
              @media (max-width: 600px) {
                  :host {
                   }
              }` : ''}
          `;
        

      this.root.appendChild(styleElement);
      
        */ 