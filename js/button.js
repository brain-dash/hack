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
      this.setAttribute('onclick', ()=>{console.log(1)})
    }

  
    render(){
      return `${this.css()}${this.html()} `;
    }
    css(){
      return /*css*/`<style> 
        :host{
          width: 250px;
          height: 32px;
        }
        button{
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          position: absolute;
          width: 250px;
          height: 32px;

          background: #C9F2FF;
          border: 1px solid #B0D9FF;
          border-radius: 39px;

          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          color: black;
        }
 
    </style>`
    }
    html(){
        return /*html*/`
            <button></button>
        `
    }
  }
  
if (!customElements.get('bpla-button')) {
    customElements.define('bpla-button',Button);
}
