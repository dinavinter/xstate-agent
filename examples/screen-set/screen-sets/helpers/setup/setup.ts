import { customMatchers } from '../custom-matchers';
import { clearScreenSetsCache, disposeScreenSetTemplates, initMockBackend, initDefaultResponses, stopPluginPollers } from '../utils';
import { setUpCustomsEventMap, resetCustomEvent } from '../custom-events';
import { removeMockDomain, initMockViewport } from '../../mocks/browser/mock-window';
import { removeMockSession } from '../../mocks/browser/mock-session';
import { initGlobalLoginEvents, teardownGlobalLoginEvents } from '../global-login-events';
import { initGlobalErrorEvents, teardownGlobalErrorEvents } from '../global-error-events';
import {webSDKBootstrap, setUpWebSdkBootstrap, setUpGetSDKConfig} from './web-sdk-bootstrap';
import { setUpMockSSO } from '../../mocks/browser/mock-sso';
import { setUpMockPopup } from '../../mocks/browser/mock-popup';
import { setUpMockBackend } from '../../mocks/api/mock-backend';
import globalInterruptions from '../global-interruptions';
import globalScreenSetEvent from '../global-screen-set-event';

const styleTag = require('style-tag');
const loadScript = require('load-script');

export const apiKey = 'mock-api-key';

beforeAll(async () => {

    jasmine.getEnv().allowRespy(true); // needed because we may recreate the spy for apiService if we bootstrap more than once in case of sso tests
    jasmine.addMatchers(customMatchers);

    await new Promise(resolve => {
        styleTag(require('../../mocks/screen-sets/default.css'));
        loadScript(`/js/gigya.js?apiKey=${apiKey}`, resolve)
    });

    // this should happen only once
    setUpGetSDKConfig();
    setUpCustomsEventMap();
    setUpMockBackend();
    setUpMockPopup();
    setUpMockSSO();
    setUpWebSdkBootstrap();
});

beforeEach(async () => {
    localStorage.clear();
    initMockBackend();
    initDefaultResponses();
    initGlobalLoginEvents();
    initGlobalErrorEvents();
    initMockViewport();
    globalScreenSetEvent.init();
    globalInterruptions.init();
    await webSDKBootstrap();
});

afterEach(async () => {
    await disposeScreenSetTemplates();
    teardownGlobalLoginEvents();
    teardownGlobalErrorEvents();
    clearScreenSetsCache();
    stopPluginPollers();
    removeMockSession();
    removeMockDomain();
    resetCustomEvent();
    globalInterruptions.clear();
    globalScreenSetEvent.dispose();
    document.body.innerHTML = '';
});
