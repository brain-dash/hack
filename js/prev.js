class Prev extends HTMLElement {
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
      }
        button{
          display: flex;
          justify-content: center;
          align-items: center;
          background:transparent;
          border:none;
          color:white;
        }
        button p{
          padding-left:10px;
        }
       
 
    </style>`
    }
    html(){
        return /*html*/`
          <button onclick="history.back()">
          <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.45 11.7L13.65 20.475L21.45 29.25" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="0.5" y="0.5" width="38" height="38" rx="19" stroke="white"/>
          </svg>
          <p>Назад</p>
          
          </button>
        `
    }
  }
  
if (!customElements.get('bpla-prev')) {
    customElements.define('bpla-prev',Prev);
}
