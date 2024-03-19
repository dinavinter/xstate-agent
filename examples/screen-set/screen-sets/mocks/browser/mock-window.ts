
let getInnerSizeSpy: jasmine.Spy;
let getOuterSizeSpy: jasmine.Spy;

export function initMockViewport() {
    getInnerSizeSpy = spyOn(gigya.utils.viewport, 'getInnerSize').and.callThrough();
    getOuterSizeSpy = spyOn(gigya.utils.viewport, 'getOuterSize').and.callThrough();
}

export function mockDomain(domain: string) {
    gigya.thisScript.globalConf['topDomain'] = domain;
}

export function removeMockDomain() {
    delete gigya.thisScript.globalConf['topDomain'];
}

export async function setViewportSize(width: number, height?: number): Promise<void> {
    getInnerSizeSpy.and.returnValue({w: width, h: height});
    getOuterSizeSpy.and.returnValue({w: width, h: height});

    // hack for getting the poller notice the change faster
    gigya._.plugins.instances.screenSet['_poller'].stop();
    gigya._.plugins.instances.screenSet['_poller'].start(1);

    return new Promise(resolve => {
        setTimeout(() => {
            gigya._.plugins.instances.screenSet['_poller'].stop();
            gigya._.plugins.instances.screenSet['_poller'].start(150);
            resolve();
        }, 1);
    });
}

export function getViewportSize(): { w: number, h: number } {
    return gigya.utils.viewport.getInnerSize();
}
