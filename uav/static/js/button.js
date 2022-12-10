class Button extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = this.render();
      this.button = this.shadowRoot.querySelector('button')
    }
  
    static get observedAttributes() { return ['text']; }
  
    connectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "text") 
        this.button.innerHTML = newValue;
    }

    get onclick(){
      console.log("onclick")
        this.button.addEventListener('click',()=>console.log(1))
    //   return this.getAttribute('onclick')
    }
    set onclick(value){
      this.addEventListener('click', value)
    }

  
    render(){
      return `${this.css()}${this.html()} `;
    }
    css(){
      return /*css*/`<style> 
        :host{
          width: 80%;
          display:flex;
          justify-content: center;
          align-items: center;
        }
        div{
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          width: 80%;
          height: 32px;

          background: #C9F2FF;
          border: 1px solid #B0D9FF;
          border-radius: 39px;

          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 16px;
          color: black;
          margin:20px 0;

          border: 1px solid #B0D9FF;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          transition: all 0.4s linear;
          cursor: pointer;
          t
        }
        ::slotted(a){
          color:black !important;
          text-decoration:none !important;
          width:100%;
          height:100%;
          display:flex;
          justify-content: center;
          align-items: center;
        }
        div:hover{
          color: black;
          background: #e3f2f7;
        }
        div:active{
          background: #61777e;
          color: white;
        }
       
 
    </style>`
    }
    html(){
        return /*html*/`
        <div>
          <slot></slot>
        </div>
        `
    }
  }
  
if (!customElements.get('bpla-button')) {
    customElements.define('bpla-button',Button);
}
