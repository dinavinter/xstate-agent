export const loginIdInputTestData = [
    {
        email: 'ronen@gmail.com',
        format: `regex('^(0|[1-9][0-9]*)$')`,
        expectedError: 'E-mail address is invalid.',
    },
    {
        email: 'ronen@gmail.com',
        format: `regex('^(?=(.{1,64}@.{1,255}))([!#$%&'*\\-\\/=?\\^_\`{|}~a-zA-Z0-9ñÑ}]{1,64}(\\.[!#$%&'*\\-\\/=?\\^_\`{|}~a-zA-Z0-9ñÑ]{0,}){0,})@((\\[(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\\])|([a-zA-Z0-9-ñÑ]{1,63}(\\.[a-zA-Z0-9-ñÑ]{1,63}){1,}))$')`,
        expectedError: '',
    },
    {
        email: 'ronen@gmail.com',
        format: '',
        expectedError: '',
    },
    {
        email: 'ronen-gmail',
        format: '',
        expectedError: 'E-mail address is invalid.',
    },
    {
        email: 'ronen@gmail',
        format: '',
        expectedError: 'E-mail address is invalid.',
    },
    {
        email: 'ronen@gmail@c.com',
        format: '',
        expectedError: 'E-mail address is invalid.',
    }
];