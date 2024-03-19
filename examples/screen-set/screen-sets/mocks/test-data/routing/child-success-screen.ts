import {EndFlowScreen} from "../../../lib/screen-sets/template/screen-template";

export const childSuccessScreenTestData: any[] = [
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
];
