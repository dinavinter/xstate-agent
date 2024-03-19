
const windowObjectValidationHtmlPath = '/base/src/helpers/WindowObjectValidation/windowObjectValidation.html';
export const whiteListParams = ['gigya', '__gigyaConf', 'resolver'];

export interface IPluginValidationResult extends MessageEvent {
    globalObjectDiff: string[],
    pluginName: string;
}

export async function validateWindowObject(): Promise<IPluginValidationResult[]> {
    let pluginResult = [];
    const gigyaJsPlugins = await getAllPlugins();
    for (const gigyaJsPlugin of gigyaJsPlugins) {
        const res = await loadGigyaPlugin(gigyaJsPlugin);
        pluginResult.push(res)
    }
    return pluginResult;
}

async function loadGigyaPlugin(pluginName: string): Promise<IPluginValidationResult> {
    return new Promise(resolve => {
        const ifr = createIframe(`${windowObjectValidationHtmlPath}?plugin=${pluginName}`);
        window.addEventListener("message", (event: IPluginValidationResult) => {
            try {
                const data = JSON.parse(event.data);
                if (data.pluginName === pluginName) {
                    ifr?.remove();
                    resolve(data);
                }
            } catch (e) {}
        });
        document.body.appendChild(ifr);
    });
}

async function getAllPlugins(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.addEventListener("load", function() {
            const res = JSON.parse(this.responseText);
            resolve(filterJsPlugins(res.files));
        });
        req.open("GET", "/js/getAllJsFileNames");
        req.send();
    });
}

function filterJsPlugins(files: string[]): string[] {
    return files
        .filter(file => file.match(/\/*.plugin.*.js$/))
        .filter(file => !file.match(/\/*.plugin.*.min.js$/));
}

function createIframe(htmlSrc: string) {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", htmlSrc);
    iframe.style.width = "480px";
    iframe.style.height = "480px";
    return iframe;
}
