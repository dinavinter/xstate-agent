import { getNextColor } from "./colors";

const enabled = true;

class Logger {

    constructor(private _color: string = null){}

    public group(name: string, collapsed = false){
        const groupFn = collapsed ? console.groupCollapsed : console.group;
        const color = getNextColor();
        if(enabled){
            groupFn.apply(console, [`%c${name}`, `color:${color};`]);
        }
        return this;
    }

    public end(){
        if(enabled){
            console.groupEnd();
        }
    }

    public info(message: string, ...args: any[]) {
        if (this._color) {
            message = `%c${message}`;
            args = [`color:${this._color};`].concat(args);
        }
        if(enabled){
            console.log.apply(console, [message].concat(args));
        }
        return this;
    }

    public endWhen(done: Promise<any> | (() => void|Promise<any>)) {
        if (typeof done == 'function') {
            done = done() as Promise<any>|undefined;
        }
        if (done instanceof Promise) { // async
            done.then(() => this.end());
        } else { // sync
            this.end();
        }
    }
}
export default new Logger();