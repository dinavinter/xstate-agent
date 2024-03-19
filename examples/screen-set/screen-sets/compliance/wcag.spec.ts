import {ScreenSetTemplate, ScreenSetType} from '../lib/screen-sets/template/screen-set-template';
import {DefaultScreenID} from '../lib/screen-sets/template/screen-template';
import mockBackend from '../lib/api/mock-backend';
import * as axe from 'axe-core';
import {ServerEndpoint} from '../lib/api/endpoints';
import {GSErrors} from '../../../../src/core/Gigya.Js/app/GSErrors';
import {mockSession} from '../mocks/browser/mock-session';

import {qrCode} from '../mocks/test-data/widgets/tfa/qrCode';
import {ScreenSet} from '../lib/screen-sets/instance/screen-set';
import {ApiMockFactory} from '../mocks/api/mock-factory';

describe('wcag', () => {
    let screenTemplate: ScreenSetTemplate;

    describe('RegistrationLogin', () => {
        beforeEach(() => {
            screenTemplate = new ScreenSetTemplate(ScreenSetType.RegistrationLogin);
        });

        [DefaultScreenID.Login, DefaultScreenID.Register, DefaultScreenID.CompleteRegistration,
            DefaultScreenID.MobileLogin, DefaultScreenID.ChangeEmail, DefaultScreenID.ForgotPassword,
            DefaultScreenID.ForgotPasswordSent, DefaultScreenID.ResetPassword, DefaultScreenID.ResetPasswordSuccess,
            DefaultScreenID.MandatoryPasswordChange, DefaultScreenID.VerificationPending, DefaultScreenID.VerificationSent,
            DefaultScreenID.LinkAccountProgression, DefaultScreenID.MobileForgotPassword
        ].forEach(screen => {
            it( `${screen} should be wcag compliance`, async () => {
                const displayedScreen = await screenTemplate.show(screen);

                // Act
                await wcagEvaluation(displayedScreen);
            });
        });

        it( `${DefaultScreenID.MobileLoginVerification} should be wcag compliance`, async () => {
            const displayedScreen = await screenTemplate.show(DefaultScreenID.MobileLogin);
            await displayedScreen.submit({
                phoneNumber: '+9721234567'
            });

            // Act
            await wcagEvaluation(displayedScreen);
        });

        it( `${DefaultScreenID.MobileForgotPasswordVerification} should be wcag compliance`, async () => {
            const displayedScreen = await screenTemplate.show(DefaultScreenID.MobileForgotPassword);
            await displayedScreen.submit({
                phoneNumber: '+9721234567'
            });

            // Act
            await wcagEvaluation(displayedScreen);
        });


        it( `${DefaultScreenID.VerifyEmailCode} should be wcag compliance`, async () => {
            const email = 'test@test.com';
            mockBackend.when(ServerEndpoint.Login)
                .returnError(GSErrors.PENDING_CODE_VERIFICATION)
                .addParams({profile: {email}});

            const displayedScreen = await screenTemplate.show(DefaultScreenID.Login);
            await displayedScreen.submit({
                loginID: email,
                password: '123123'
            });

            // Act
            await wcagEvaluation(displayedScreen);
        });
    });

    describe('LiteRegistration', () => {
        beforeEach(() => {
            screenTemplate = new ScreenSetTemplate(ScreenSetType.LiteRegistration);
        });

        [DefaultScreenID.SubscribeWithEmail, DefaultScreenID.SubscribeThankYouScreen].forEach(screen => {
            it( `${screen} should be wcag compliance`, async () => {
                const displayedScreen = await screenTemplate.show(screen);

                // Act
                await wcagEvaluation(displayedScreen);
            });
        });
    });

    describe('LinkAccount', () => {
        beforeEach(() => {
            screenTemplate = new ScreenSetTemplate(ScreenSetType.LinkAccounts);

            mockBackend.when(ServerEndpoint.GetAccountInfo)
              .returnResponse(ApiMockFactory.createResponse({
                  'socialProviders': 'googleplus'
              }));

            mockBackend.when(ServerEndpoint.GetConflictingAccount)
              .returnResponse(ApiMockFactory.createResponse({
                  conflictingAccount: {
                      loginProviders: ['site', 'googleplus'],
                      loginID: 'test@test.com'
                  },
              }));
        });

        [DefaultScreenID.LinkAccount, DefaultScreenID.ForgotPassword, DefaultScreenID.ForgotPasswordSent].forEach(screen => {
            it( `${screen} should be wcag compliance`, async () => {
                const displayedScreen = await screenTemplate.show(screen);

                // Act
                await wcagEvaluation(displayedScreen);
            });
        });
    });

    describe('LinkAccount with widgets', () => {
        beforeEach(() => {
            screenTemplate = new ScreenSetTemplate(ScreenSetType.LinkAccounts);

            mockBackend.when(ServerEndpoint.GetAccountInfo)
              .returnResponse(ApiMockFactory.createResponse({
                  'socialProviders': 'googleplus'
              }));

            mockBackend.when(ServerEndpoint.GetConflictingAccount)
              .returnResponse(ApiMockFactory.createResponse({
                  conflictingAccount: {
                      loginProviders: ['site', 'emailOtp', 'password', 'googleplus'],
                      phones: [{lookup: 'phone-lookup', obfuscated: '+9xxxxxxxxx21'}],
                      loginID: 'test@test.com'
                  },
              }));
        });

        [DefaultScreenID.LinkAccount, DefaultScreenID.ForgotPassword, DefaultScreenID.ForgotPasswordSent].forEach(screen => {
            it( `${screen} should be wcag compliance`, async () => {
                const displayedScreen = await screenTemplate.show(screen);

                // Act
                await wcagEvaluation(displayedScreen);
            });
        });
    });

    describe('ReAuthentication', () => {
        beforeEach(() => {
            screenTemplate = new ScreenSetTemplate(ScreenSetType.ReAuthentication);
        });

        [DefaultScreenID.ReAuthentication, DefaultScreenID.ForgotPassword, DefaultScreenID.ForgotPasswordSent].forEach(screen => {
            it( `${screen} should be wcag compliance`, async () => {
                const displayedScreen = await screenTemplate.show(screen);

                // Act
                await wcagEvaluation(displayedScreen);
            });
        });
    });

    describe('PasswordlessLogin', () => {
        beforeEach(() => {
            mockBackend.when(ServerEndpoint.AuthGetMethods)
                .returnOk()
                .addParams({
                    methods: ['password', 'push', 'magicLink', 'emailOtp']
                });
            mockBackend
                .when(ServerEndpoint.EmailOTPCodeSend)
                .returnOk({vToken: 'validVToken'});

            screenTemplate = new ScreenSetTemplate(ScreenSetType.PasswordlessLogin);
        });

        it( `${DefaultScreenID.PasswordlessLogin} should be wcag compliance`, async () => {
            const displayedScreen = await screenTemplate.show(DefaultScreenID.PasswordlessLogin);

            // Act
            await wcagEvaluation(displayedScreen);
        });

        [null, 'password', 'push', 'magicLink', 'emailOtp'].forEach(method => {
            const screens = {
                password: DefaultScreenID.PasswordAuth,
                push: DefaultScreenID.PushAuth,
                magicLink: DefaultScreenID.MagicLinkAuth,
                emailOtp: DefaultScreenID.EmailOtpAuth,
            };
            it(`${screens[method] || DefaultScreenID.AuthMethods} should be wcag compliance`, async () => {
                spyOn(gigya.accounts.auth, 'getPreferredLoginMethod').and.returnValue(method);
                const displayedScreen = await screenTemplate.show(DefaultScreenID.PasswordlessLogin);
                await displayedScreen.submit({
                    loginID: 'test@test.com'
                });

                // Act
                await wcagEvaluation(displayedScreen);
            });
        });
    });

    describe('ProfileUpdate', () => {
        beforeEach(() => {
            screenTemplate = new ScreenSetTemplate(ScreenSetType.ProfileUpdate);
            mockSession();
            mockBackend.when(ServerEndpoint.GetAccountInfo)
                .returnOk()
                .addParams({
                    profile: {
                        firstName: 'First',
                        lastName: 'Last',
                        email: 'test@test.com',
                        birthYear: '1999',
                        zip: '90210',
                        country: 'Albania',
                        phoneNumber: '+972543218874'
                    }
                })
        });

        [DefaultScreenID.UpdateProfile, DefaultScreenID.ChangePassword, DefaultScreenID.Communication,
            DefaultScreenID.MobileEdit, DefaultScreenID.ChangeEmail, DefaultScreenID.Privacy].forEach(screen => {
            it( `${screen} should be wcag compliance`, async () => {
                const displayedScreen = await screenTemplate.show(screen);

                // Act
                await wcagEvaluation(displayedScreen);
            });
        });

        it( `${DefaultScreenID.PasskeyManager} should be wcag compliance`, async () => {
            mockBackend.when(ServerEndpoint.FidoGetCredentials)
                .returnOk({
                    credentials: [
                        {
                            Browser: "Chrome",
                            City: "",
                            Country: "Ireland",
                            Id: "CeEKGewDli/cL08bsT8/w9RvGuH58mUnPHU1VTB8gZQ=",
                            IpAddress: "34.250.233.95",
                            IsMobile: false,
                            LastLogin: "638144895771776105",
                            Platform: "Windows",
                            State: ""
                        }
                    ]
                });
            const displayedScreen = await screenTemplate.show(DefaultScreenID.PasskeyManager);

            // Act
            await wcagEvaluation(displayedScreen);
        });

        it( `${DefaultScreenID.VerifyEmailCode} should be wcag compliance`, async () => {
            const displayedScreen = await screenTemplate.show(DefaultScreenID.ChangeEmail);
            await displayedScreen.submit({
                email: 'test@test.com'
            });

            // Act
            await wcagEvaluation(displayedScreen);
        });

        it( `${DefaultScreenID.MobileEditVerification} should be wcag compliance`, async () => {
            const displayedScreen = await screenTemplate.show(DefaultScreenID.MobileEdit);
            await displayedScreen.submit({
                phoneNumber: '+972543218874'
            });

            // Act
            await wcagEvaluation(displayedScreen);
        });
    });

    describe('TFA', () => {
        beforeEach(() => {
            mockSession();
            mockBackend.resetCalls();
            mockBackend.when(ServerEndpoint.TfaInitTFA)
                .returnOk({gigyaAssertion: 'test_assertion'});
        });

        describe('register', () => {
            beforeEach(() => {
                screenTemplate = new ScreenSetTemplate(ScreenSetType.RegistrationLogin);
            });
            it(`${DefaultScreenID.TFARegistration} - phone should be wcag compliance`, async () => {
                // Arrange
                mockBackend.when(ServerEndpoint.TfaGetProviders)
                    .returnOk({inactiveProviders: [{name: "gigyaPhone"}]});

                // Act
                const screen = await screenTemplate.show(DefaultScreenID.TFARegistration);
                await wcagEvaluation(screen);
            });

            it(`${DefaultScreenID.TFARegistration} - totp should be wcag compliance`, async () => {
                // Arrange
                mockBackend.when(ServerEndpoint.TfaGetProviders)
                    .returnOk({inactiveProviders: [{name: "gigyaTotp"}]});

                mockBackend.when(ServerEndpoint.TfaTotpRegister)
                    .returnOk({qrCode});

                // Act
                const screen = await screenTemplate.show(DefaultScreenID.TFARegistration);
                await wcagEvaluation(screen);
            });

            it(`${DefaultScreenID.TFARegistration} - email should be wcag compliance`, async () => {
                // Arrange
                mockBackend.when(ServerEndpoint.TfaGetProviders)
                    .returnOk({inactiveProviders: [{name: "gigyaEmail"}]});

                mockBackend.when(ServerEndpoint.TfaEmailGetRegisterEmails)
                    .returnOk({emails: [
                            {id: 'test-id', obfuscated: 'te*****om', lastVerification: "2020-12-16T09:00:03.217Z"},
                        ]});

                // Act
                const screen = await screenTemplate.show(DefaultScreenID.TFARegistration);
                await wcagEvaluation(screen);
            });
        });

        describe('edit', () => {
            beforeEach(() => {
                screenTemplate = new ScreenSetTemplate(ScreenSetType.ProfileUpdate);
            });
            it(`${DefaultScreenID.TFAEdit} - phone should be wcag compliance`, async () => {
                // Arrange
                mockBackend.when(ServerEndpoint.TfaGetProviders)
                    .returnOk({activeProviders: [{name: "gigyaPhone"}]});
                mockBackend.when(ServerEndpoint.TfaGetRegisteredPhones)
                    .returnOk({
                        phones: [
                            { id: "test-id1", obfuscated: "##-###-#777", lastMethod: "sms", lastVerification: "2020-12-16T09:00:03.217Z"},
                        ]
                    });

                // Act
                const screen = await screenTemplate.show(DefaultScreenID.TFAEdit);
                await wcagEvaluation(screen);
            });

            it(`${DefaultScreenID.TFAEdit} - totp should be wcag compliance`, async () => {
                // Arrange
                mockBackend.when(ServerEndpoint.TfaGetProviders)
                    .returnOk({activeProviders: [{name: "gigyaTotp"}]});

                // Act
                const screen = await screenTemplate.show(DefaultScreenID.TFAEdit);
                await wcagEvaluation(screen);
            });
        });

        describe('verify', () => {
            beforeEach(() => {
                screenTemplate = new ScreenSetTemplate(ScreenSetType.RegistrationLogin);
            });

            it(`${DefaultScreenID.TFAVerification} - phone should be wcag compliance`, async () => {
                // Arrange
                mockBackend.when(ServerEndpoint.TfaGetProviders)
                    .returnOk({activeProviders: [{name: "gigyaPhone"}]});
                mockBackend.when(ServerEndpoint.TfaPhoneSendCode).returnOk();
                mockBackend.when(ServerEndpoint.TfaGetRegisteredPhones)
                    .returnOk({
                        phones: [
                            { id: "test-id1", obfuscated: "##-###-#777", lastMethod: "sms", lastVerification: "2020-12-16T09:00:03.217Z"},
                        ]
                    });

                // Act
                const screen = await screenTemplate.show(DefaultScreenID.TFAVerification);
                await wcagEvaluation(screen);
            });

            it(`${DefaultScreenID.TFAVerification} - totp should be wcag compliance`, async () => {
                // Arrange
                mockBackend.when(ServerEndpoint.TfaGetProviders)
                    .returnOk({activeProviders: [{name: "gigyaTotp"}]});

                // Act
                const screen = await screenTemplate.show(DefaultScreenID.TFAVerification);
                await wcagEvaluation(screen);
            });

            it(`${DefaultScreenID.TFAVerification} - email should be wcag compliance`, async () => {
                // Arrange
                mockBackend.when(ServerEndpoint.TfaGetProviders)
                    .returnOk({activeProviders: [{name: "gigyaEmail"}]});
                mockBackend.when(ServerEndpoint.TfaEmailSendCode).returnOk();
                mockBackend.when(ServerEndpoint.TfaEmailGetRegisterEmails)
                    .returnOk({
                        emails: [
                            { id: "test-id1", obfuscated: "te*****.com", lastVerification: "2020-12-16T09:00:03.217Z"},
                        ]
                    });

                // Act
                const screen = await screenTemplate.show(DefaultScreenID.TFAVerification);
                await wcagEvaluation(screen);
            });

            it(`${DefaultScreenID.TFAVerification} - push should be wcag compliance`, async () => {
                // Arrange
                mockBackend.when(ServerEndpoint.TfaGetProviders)
                    .returnOk({activeProviders: [{name: "gigyaPush"}]});
                mockBackend.when(ServerEndpoint.TfaPushSendVerification).returnOk();
                mockBackend.when(ServerEndpoint.TfaPushIsVerified).returnOk();

                // Act
                const screen = await screenTemplate.show(DefaultScreenID.TFAVerification);
                await wcagEvaluation(screen);
            });
        })
    });

    async function wcagEvaluation(screenSet: ScreenSet) {
        const result = await axe.run(screenSet.currentScreen.nativeElement);

        const v = result.violations.map(({impact, description, nodes, tags}) => {
            return {
                screenId: screenSet.currentScreen.id,
                impact,
                description,
                nodes,
                tags: tags.join(', '),
            };
        });
        expect(v.length).toBe(0);
        expect(v).toEqual([]);
    }
});
