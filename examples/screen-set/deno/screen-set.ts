
export class ScreenSet extends HTMLElement {
    get screenSet() {
        return this.getAttribute('screen-set');
    }

    set screenSet(val) {
        if(val)
            this.setAttribute('screen-set', val);
    }

    static get observedAttributes() {
        return ['screen-set'];
    }

    attributeChangedCallback(_name: any, oldVal: any, newVal: any) {
        if(oldVal !== newVal )
            this.render();
    }
    constructor() {
        super();
        this.show = this.show.bind(this);
        this.updateScreen = this.updateScreen.bind(this);
        this.render = this.render.bind(this);

    }


    container =  `<div id="gigya-screen-set-container" class="centered"></div>`;

    show(){
        console.debug('rendering..');
        gigya.accounts.showScreenSet({
            screenSet: this.screenSet!,
            containerID: "gigya-screen-set-container"
        });
    }

    updateScreen({container, html, css, js} :{container:string, html:string, css:string, js:string}) {
        console.log('updating screen', {container, html, css, js});
        // const shadow = elem.attachShadow({mode: 'open'});

        this.innerHTML = `
        <style>
        ${css}
        </style>
        ${container}
        <div style="display: none" >
           ${html}
        </div>
        <script>
        ${js}
        </script>
        `;


        gigya && gigya.isReady && this.show();
        window.onGigyaServiceReady = this.show;


        // this.getElementsByClassName('screen-set')[0].style.display = 'none';

    }

    render() {
        async function fetchScreen(screen_set:string, container:string){
            const html =  fetch(`${screen_set}/index.html`).then(res => res.text());
            const css =  fetch(`${screen_set}/index.css`).then(res => res.text());
            const js =  fetch(`${screen_set}/index.js`).then(res =>res.ok? res.text() : '');
            return Promise.all([html, css, js]).then(([html, css, js]) => {
                console.log('fetched screen', {container, html, css, js});
                return {container, html, css, js}
            });
        }

        fetchScreen(this.screenSet!, this.container).then(this.updateScreen);
    }

    connectedCallback() {
        console.log('connected!', this);
        this.render();
    }
    disconnectedCallback() {
        console.log('disconnected', this);
    }

}



if ('customElements' in window) {
    customElements.define('screen-set', ScreenSet);
}
 