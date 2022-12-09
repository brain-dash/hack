class TableTask extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = this.render();
    }
  
    static get observedAttributes() { return ['name','status']; }
  
    connectedCallback() {
      this.shadowRoot.querySelector(".table-bpla-el").addEventListener('click',()=>this.handlerClick())
    }

    handlerClick = () =>{
      window.location.href = 'view.html'
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "name") {
        this.nameEl.innerHTML = newValue;
        this.headerEl.value = newValue;
        this.querySelector(".more").dataset.bsId=newValue;
      }
    
    }
    
    /**
     * Переход на новую вкладку, если это не нажатие на кнопку с открытием модального окна
     * @param {event} e 
     */
    openView = (e) => {
      if (!e.path.find(element => element == this.moreEl))
        console.log(e.path.find(element => element == this.moreEl))

      // else
      //   e.preventDefault
    }
    render(){
      return `${this.css()}${this.html()} `;
    }
    css(){
      return /*css*/`<style> 
        :host{
          width:100%;
        }
        
        .table-bpla-el{
          display:flex;
          justify-content: space-between;
          align-items: center;
          height:4rem;
          width: 100%;
          cursor:pointer;
          transition:all 0.2s linear;
        }
        .table-bpla-el:hover{
          background:grey
        }
        .bpla{
          display:flex;
          justify-content: center;
          align-items: center;
        }
        .road{
          display:flex;
          flex-direction:column;
          align-items: end;
        }
        .road-info{
          display:flex;
          
        }
        .road-info p{
          margin:0;
        }
        ::slotted(*){
          margin: 0 !important;;
        }
        .road-info ::slotted(*){
          font-weight:700;
          color:var(--light-blue);
        }
    </style>`
    }
    html(){
        return /*html*/`
          <div class="table-bpla-el">
            <div class="bpla">
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 14.4228C28 14.8003 27.925 15.174 27.7796 15.5217C27.6341 15.8694 27.4211 16.1841 27.1532 16.447C26.8852 16.71 26.5678 16.9159 26.2198 17.0526C25.8717 17.1893 25.5001 17.2539 25.1268 17.2428L18.4863 17.0458L13.6453 27.168C13.2571 27.9814 12.44 28.5 11.5458 28.5C11.3621 28.5001 11.1805 28.4609 11.013 28.3848C10.8455 28.3087 10.6959 28.1975 10.574 28.0586C10.4521 27.9197 10.3608 27.7563 10.306 27.579C10.2513 27.4018 10.2343 27.2148 10.2563 27.0305L11.4659 16.8375L6.18903 16.6816L5.50227 18.5819C5.37506 18.9337 5.14404 19.2374 4.84047 19.4521C4.5369 19.6668 4.17544 19.782 3.80499 19.7822C3.63904 19.7822 3.47472 19.7491 3.32142 19.6848C3.16812 19.6206 3.02884 19.5264 2.91156 19.4077C2.79428 19.289 2.7013 19.1481 2.63792 18.993C2.57454 18.8379 2.54201 18.6717 2.54219 18.5039V16.4123L1.40694 16.1729C1.00932 16.0891 0.652367 15.8695 0.396127 15.5509C0.139887 15.2322 0 14.8341 0 14.4235C0 14.0128 0.139887 13.6147 0.396127 13.2961C0.652367 12.9775 1.00932 12.7578 1.40694 12.6741L2.54219 12.436V10.3416C2.54185 10.0306 2.65392 9.73017 2.85732 9.49686C3.06071 9.26355 3.34141 9.11343 3.64662 9.07473L3.80499 9.06481C4.17504 9.06515 4.53607 9.18029 4.83934 9.39467C5.1426 9.60906 5.37351 9.91237 5.50087 10.2637L6.19044 12.1625L11.4477 12.0067L10.2563 1.96809C10.2537 1.94217 10.2518 1.91618 10.2507 1.89015L10.2479 1.81221C10.2479 1.08809 10.8296 0.5 11.5458 0.5C12.3657 0.5 13.1197 0.935042 13.5402 1.63366L13.6453 1.83205L18.4148 11.8012L25.1282 11.6028C25.8679 11.581 26.5859 11.8573 27.1242 12.3707C27.6624 12.8841 27.977 13.5927 27.9986 14.3406V14.4228H28Z" fill="white"/>
              </svg>
              <slot name="name"></slot>
            </div>
            <div class="road">
              <slot name="road"></slot>
              <div class="road-info">
                <p>Долетит через</p>
                <slot name="time"></slot>
              </div>
            </div>
          </div>
            
        `
    }
  }
  
if (!customElements.get('bpla-table-task')) {
    customElements.define('bpla-table-task',TableTask);
}
