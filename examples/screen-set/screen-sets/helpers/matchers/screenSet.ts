import MatchersUtil = jasmine.MatchersUtil;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import {ScreenSet} from "../../lib/screen-sets/instance/screen-set";
import {ScreenSetType} from "../../lib/screen-sets/template/screen-set-template";
import {GigyaScreenType} from "../../lib/screen-sets/template/screen-template";
import {FormType} from "../../lib/screen-sets/template/form-template";

export const toShowScreen = <CustomMatcherFactory>(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]): CustomMatcher => {
    return {
        compare: <CustomMatcher>(screenSet: ScreenSet, expectedScreen: GigyaScreenType, expectedScreenSet?: ScreenSetType): CustomMatcherResult => {

            if (!screenSet) {
                return {pass: false, message: "Custom matcher must be invoked with a ScreenSet instance"};
            }

            if (!expectedScreen) {
                return {pass: false, message: "A screen must be specified when asserting if a screen is shown"};
            }

            if(!expectedScreenSet) {
                expectedScreenSet = screenSet.type;
            }

            if(!screenSet.currentScreen) {
                return {
                    pass: false,
                    message: `no screen has been shown`
                }
            }

            const screenMatch = screenSet.currentScreen.id === expectedScreen;
            const screenSetTypeMatch = screenSet.type === expectedScreenSet;

            if(screenMatch && screenSetTypeMatch) {
                return {
                    pass: true,
                    message: `screen set is showing ${expectedScreenSet}/${expectedScreen}`
                }
            }

            return {
                pass: false,
                message: `expected screenSet to show ${expectedScreenSet}/${expectedScreen} but actually shown: ${screenSet.type}/${screenSet.currentScreen.id}`
            };

        }
    };
};

export const toBeClosed = <CustomMatcherFactory>(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]): CustomMatcher => {
    return {
        compare: <CustomMatcher>(screenSet: ScreenSet): CustomMatcherResult => {

            if (!screenSet) {
                return {pass: false, message: "Custom matcher must be invoked with a ScreenSet instance"};
            }

            if(!screenSet.currentScreen) {
                return {
                    pass: true,
                    message: `screen set has been closed`
                }
            }

            return {
                pass: false,
                message: `screen set is not closed, actually is showing: ${screenSet.currentScreen.id}`
            };

        }
    };
};

export const toContainForm = <CustomMatcherFactory>(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]): CustomMatcher => {
    return {
        compare: <CustomMatcher>(screenSet: ScreenSet, expectedForm: FormType): CustomMatcherResult => {

            if (!screenSet) {
                return {pass: false, message: "Custom matcher must be invoked with a ScreenSet instance"};
            }

            if(!screenSet.currentScreen || !screenSet.form) {
                return {
                    pass: false,
                    message: `expected screen set to contain ${expectedForm || 'a form'}, but actually it doesn't contain any form`
                }
            }

            if(expectedForm && screenSet.form.type !== expectedForm) {
                return {
                    pass: false,
                    message: `expected screen set to contain ${expectedForm}, but actually it contain: ${screenSet.form.type}`
                }
            }

            return {
                pass: true,
                message: `screen set contain form ${screenSet.form.type}`
            };

        }
    };
};
