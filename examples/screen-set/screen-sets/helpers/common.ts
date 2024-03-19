import { ScreenSet } from "../lib/screen-sets/instance/screen-set";
import { SocialLoginPlugin } from "../lib/screen-sets/instance/plugins/social-login";
import { PluginSource } from "../lib/screen-sets/instance/plugins/base-plugin";
import { SocialProvider } from "../lib/screen-sets/template/screen-template";
import { getPlugin } from "./plugins";
export interface IRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export function siteLogin(screenSet: ScreenSet): Promise<boolean> {
    const loginForm = screenSet.form;
    return loginForm.submit({
        loginID: 'some@email.com',
        password: 'some-password'
    });
}

export function completeRegistration(screenSet: ScreenSet): Promise<boolean> {
    const completeRegForm = screenSet.form;
    return completeRegForm.submit({
        email: 'some@email.com',
        'profile.birthYear': '1987',
        'profile.zip': '1234'
    });
}

export function siteRegistration(screenSet: ScreenSet, data?: IRegistrationData): Promise<boolean> {
    const registrationData = Object.assign(data || {} ,{
        firstName: 'first', lastName: 'last', email: 'some@email.com', password: 'password'
    }) as IRegistrationData;
    const registrationForm = screenSet.form;
    return registrationForm.submit({
        email: registrationData.email,
        'profile.firstName': registrationData.firstName,
        'profile.lastName': registrationData.lastName,
        password: registrationData.password,
        passwordRetype: registrationData.password
    });
}

export async function socialLogin_v1(provider: SocialProvider): Promise<boolean> {
    gigya.socialize.showLoginUI();
    const socialLoginPlugin = await getPlugin<SocialLoginPlugin>(document.body, PluginSource.ShowLoginUI, 'showLoginUI');
    return await socialLoginPlugin.loginWithProvider(`div[gigid="showLoginUI_showLoginUI_v1"] div[gigid="${provider}"]`, PluginSource.ShowLoginUI, 'showLoginUI');
}

export async function showAddConnectionsUI(provider: SocialProvider): Promise<boolean> {
    gigya.socialize.showAddConnectionsUI_v2({version: 2, captionText: 'caption text'});
    const socialLoginPlugin = await getPlugin<SocialLoginPlugin>(document.body, PluginSource.ShowAddConnectionsUI_v2, 'showAddConnectionsUI_v2');
    return await socialLoginPlugin.loginWithProvider(`span[data-gigya-provider="${provider}"]`, PluginSource.ShowAddConnectionsUI_v2, 'showAddConnectionsUI_v2');
}

export async function updatePhoneNumber(screenSet: ScreenSet, link: HTMLAnchorElement, newPhoneNumber: string, code: string) {
    link.click();
    const sendCodeForm = (await screenSet.nextScreen()).form;
    await sendCodeForm.setField('phoneNumber', newPhoneNumber);
    await sendCodeForm.submit();

    const otpUpdateForm = screenSet.form;
    await otpUpdateForm.setField('code', code);
    return otpUpdateForm.submit();
}

export async function updateEmail(screenSet: ScreenSet, link: HTMLAnchorElement, newEmail: string, code: string) {
    link.click();
    const sendCodeForm = (await screenSet.nextScreen()).form;
    await sendCodeForm.setField('email', newEmail);
    await sendCodeForm.submit();

    const otpUpdateForm = screenSet.form;
    await otpUpdateForm.setField('code', code);
    return otpUpdateForm.submit();
}
