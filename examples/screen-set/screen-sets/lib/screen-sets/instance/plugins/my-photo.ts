import {BasePlugin, PluginSource} from './base-plugin';

const selectors = {
    UploadButton: '.gigya-myPhoto-upload-button',
    Tooltip: '.gigya-myPhoto-tooltip-text-wrap',
    Input: '.gigya-myPhoto-upload'
}

export class MyPhotoPlugin extends BasePlugin {

    get tooltipText(): string {
        return this.getElementInnerText(selectors.Tooltip);
    }

    get inputTitle(): string {
        const elem = this.ref.querySelector(selectors.Input) as HTMLElement;
        return elem?.title;
    }

    get uploadButtonText(): string {
        return this.getElementInnerText(selectors.UploadButton);
    }

    private getElementInnerText(selector: string): string {
        const elem = this.ref.querySelector(selector) as HTMLElement;
        return elem?.innerText;
    }
}

BasePlugin.registerPlugin(PluginSource.ShowMyPhotoUI, MyPhotoPlugin);
