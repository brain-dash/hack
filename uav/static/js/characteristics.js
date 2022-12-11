class Characteristics extends HTMLElement {
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
          width:80%;
        }
        ::slotted(*){
          display:flex;
          justify-content: space-between;
        }
        .progress{
          
          box-shadow:0 0 7px 1px black;
        }
        .progress-bar {
          background-color: transparent;
          background: linear-gradient(57deg, #446778, #7adaff);
      } 
    </style>`
    }
    html(){
        return /*html*/`
        <link rel="stylesheet" href="static/css/bootstrap.min.css">

        <div>
          <slot name="left"></slot>
          <slot name="total"></slot>
          <slot name="fromstart"></slot>
          <div class="progress">
          <div class="progress-bar" role="progressbar" aria-label="Example with label" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
        </div>
      `
    }
  }
  
if (!customElements.get('bpla-chars')) {
    customElements.define('bpla-chars',Characteristics);
}
