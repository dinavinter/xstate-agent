export const validPhoneNumberTestData = [
    {
        countryCode: '+1',
        number: '2345678',
        expected: '+12345678'
    },
    {
        countryCode: "",
        number: "",
        expected: null
    },
    {
        countryCode: '+972',
        number: '505252118',
        expected: '+972505252118'
    },
    {
        countryCode: '+246',
        number: '028945411',
        expected: '+24628945411'
    },
    {
        countryCode: '+39', // Do not trim leading zero when country is Italy
        number: '058962312',
        expected: '+39058962312'
    }
];
export const savedPhoneNumberTestData = [
    {
        number: '+12345678',
        expectedCountryCode: '+1',
        expectedSubscriberNumber: '2345678'
    },
    {
        number: '+972505252118',
        expectedCountryCode: '+972',
        expectedSubscriberNumber: '505252118'
    },
    {
        number: '+24628945411',
        expectedCountryCode: '+246',
        expectedSubscriberNumber: '28945411'
    },
    {
        number: '+39058962312',
        expectedCountryCode: '+39', // Do not trim leading zero when country is Italy
        expectedSubscriberNumber: '058962312'
    },
    {
        number: '+1210123456789',
        expectedCountryCode: '+1',
        expectedSubscriberNumber: '210123456789'
    },
    {
        number: '+224210123456',
        expectedCountryCode: '+224',
        expectedSubscriberNumber: '210123456'
    }
];
