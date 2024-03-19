const mockXssInjection = "<image src=x onerror=alert('xss')>";
const xssAsSimpleStringAfterSanitization = `${mockXssInjection}`;

export const bindingWidgetTestData = [
    {
        name: `when getting xss in binding`,
        accountInfo: {
            profile: {
                zip: mockXssInjection
            }
        },
        originalText: `Your zip is: {{profile.zip}}`,
        expected: `Your zip is: ${xssAsSimpleStringAfterSanitization}`
    },
    {
        name: `when expression evaluate to string from account info's profile.`,
        accountInfo: {
            profile: {
                firstName: 'Kobi'
            }
        },
        originalText: 'Hi, {{profile.firstName}}',
        expected: 'Hi, Kobi'
    },
    {
        name: `when expression evaluate to null`,
        accountInfo: {
            profile: {
                email: null
            }
        },
        originalText: 'Hi, {{profile.email}}',
        expected: 'Hi, null'
    },
    {
        name: `when expression evaluate to object from account info's profile.`,
        accountInfo: {
            profile: {
                work: {
                    startDate: '11/06/2017'
                }
            }
        },
        originalText: '{{profile.work}}',
        expected: '[object Object]'
    },
    {
        name: `when expression evaluate to boolean from account info's profile.`,
        accountInfo: {
            profile: {
                verified: true
            }
        },
        originalText: 'user is verified: {{profile.verified}}',
        expected: 'user is verified: true'
    },
    {
        name: `when expression does not evaluate to anything`,
        accountInfo: {
            profile: {
                email: 'some@email.com'
            }
        },
        originalText: 'Hi, {{profile.notExist}}',
        expected: 'Hi,'
    },
    {
        name: `when expression is non valid`,
        accountInfo: {
            profile: {
                email: 'some@email.com'
            }
        },
        originalText: '{{non-valid?.expression}}',
        expected: ''
    },
    {
        name: `when expression evaluate to string from account info's profile. and an apostrophe is present`,
        accountInfo: {
            profile: {
                email: "some@email.com"
            }
        },
        originalText: "Hi, we've send email to {{profile.email}}",
        expected: "Hi, we've send email to some@email.com"
    },
    {
        name: `when expression evaluate to string from account info's profile. and parentheses are present`,
        accountInfo: {
            profile: {
                email: "some@email.com"
            }
        },
        originalText: 'Hi, we"ve send email to {{profile.email}}',
        expected: 'Hi, we"ve send email to some@email.com'
    },
    {
        name: `when expression contain multiple placeholders`,
        accountInfo: {
            profile: {
                email: "some@email.com",
                zip: 1234
            }
        },
        originalText: `Your email is: {{profile.email}} and zip is: {{profile.zip}}`,
        expected: 'Your email is: some@email.com and zip is: 1234'
    },
    {
        name: `when expression evaluated to undefined`,
        accountInfo: {
            profile: {
                email: "some@email.com"
            }
        },
        originalText: `Your email is: {{profile.email}} and zip is: {{profile.zip}}`,
        expected: 'Your email is: some@email.com and zip is:'
    }
];
