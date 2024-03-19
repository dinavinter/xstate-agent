import {DefaultScreenID, EndFlowScreen} from "../../../lib/screen-sets/template/screen-template";
import {ScreenSetType} from "../../../lib/screen-sets/template/screen-set-template";

export const successScreenTestData = [
    {
        successScreen: EndFlowScreen.Finish,
        when: 'next screen is _finish',
        it: 'should end flow',
        expectedEndFlow: true
    },
    {
        successScreen: EndFlowScreen.Skip,
        when: 'next screen is _skip',
        it: 'should end flow',
        expectedEndFlow: true
    },
    {
        successScreen: `Default-${ScreenSetType[ScreenSetType.ReAuthentication]}/${DefaultScreenID.ForgotPassword}`,
        when: 'next screen is from another screen-set with forms',
        it: `should switch to next screen: ${ScreenSetType[ScreenSetType.ReAuthentication]}/${DefaultScreenID.ForgotPassword}`,
        expectedScreen: DefaultScreenID.ForgotPassword,
        expectedScreenSet: ScreenSetType[ScreenSetType.ReAuthentication],
        expectedForm: true
    },
    {
        successScreen: `Default-${ScreenSetType[ScreenSetType.ReAuthentication]}/${DefaultScreenID.ForgotPasswordSent}`,
        when: 'next screen is from another screen-set without forms',
        it: `should switch to next screen: ${ScreenSetType[ScreenSetType.ReAuthentication]}/${DefaultScreenID.ForgotPasswordSent}`,
        expectedScreen: DefaultScreenID.ForgotPasswordSent,
        expectedScreenSet: ScreenSetType[ScreenSetType.ReAuthentication],
        expectedForm: false
    },
    {
        successScreen: DefaultScreenID.ForgotPassword,
        when: 'next screen is from same screen-set with forms',
        it: `should switch to next screen: ${ScreenSetType[ScreenSetType.RegistrationLogin]}/${DefaultScreenID.ForgotPassword}`,
        expectedScreen: DefaultScreenID.ForgotPassword,
        expectedScreenSet: ScreenSetType[ScreenSetType.RegistrationLogin],
        expectedForm: true
    },
    {
        successScreen: DefaultScreenID.ForgotPasswordSent,
        when: 'next screen is from same screen-set without forms',
        it: `should switch to next screen: ${ScreenSetType[ScreenSetType.RegistrationLogin]}/${DefaultScreenID.ForgotPasswordSent}`,
        expectedScreen: DefaultScreenID.ForgotPasswordSent,
        expectedScreenSet: ScreenSetType[ScreenSetType.RegistrationLogin],
        expectedForm: false
    }
];
