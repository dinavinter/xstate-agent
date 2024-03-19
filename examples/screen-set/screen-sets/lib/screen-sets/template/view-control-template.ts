import {ControlTemplate} from "./control-template";

export class ViewControlTemplate extends ControlTemplate {

    public setText(text: string): ControlTemplate {
        this.ref.innerText = text;
        return this;
    }

    public setHtml(html: string): ControlTemplate {
        this.ref.innerHTML = html;
        return this;
    }
}
