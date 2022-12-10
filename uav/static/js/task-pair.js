class TaskPair extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = this.render();
    }
  
    connectedCallback() {
    }

    render(){
      return `${this.css()}${this.html()} `;
    }

    css(){
      return /*css*/`<style> 
        :host{
 
        }
 
    </style>`
    }
    html(){
        return /*html*/`
        <div>
          <slot name="name"></slot>
          <slot name="route"></slot>
        </div>
      `
    }
  }
  
if (!customElements.get('bpla-task-pair')) {
    customElements.define('bpla-task-pair',TaskPair);
}
