
/* usage:
*   <div is="screen-set" id="registration-login" links="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" >
*       <div is="screen" id="register">
*           <h1>Screen 1</h1>
*       </div>
*  </div>
* */
class ScreenSet extends HTMLDivElement {
    get links() {return this.getAttribute('links') ? this.getAttribute('links')?.split(',') : [];}
    get css() {return this.getAttribute('css') || '';}

    private root: any;
       constructor() {
        super();
        // this.attachShadow({ mode: 'open' });
        // Prepare a container for dynamic content
         this.root=this.getRootNode()
        
    }
    
    static get observedAttributes() {
        return [ 'id', 'css', 'links' , 'data-height', 'data-width', 'data-responsive', 'data-start-screen', 'data-dialog-style'];
    }

    connectedCallback() { 
        this.render();
    }

    render() {
        
        this.innerHTML= `<slot></slot>` 
        
        this.root = this.getRootNode();
        this.root.appendChild(document.createElement('style')).textContent = this.css;
       
        // Load external CSS links if any
        this.links?.forEach(link => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = link;
            this.root.appendChild(linkElement);
        }); 
        
      }
}

// Register the new element with the browser
customElements.define('screen-set', ScreenSet, {extends: 'div'});

