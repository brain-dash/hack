class View extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = this.render();
    }
  
    connectedCallback() {
      this.shadowRoot.querySelector("button").addEventListener('click',()=>this.swap())
 
    }

    render(){
      return `${this.css()}${this.html()} `;
    }
    swap = () =>{
      this.shadowRoot.querySelector(".video").classList.toggle("invisible");
      this.shadowRoot.querySelector(".map").classList.toggle("invisible");
    }
    css(){
      return /*css*/`<style> 
        :host{
          width:80%;
        }
        ::slotted(*){
          height:40vh;
          border:1px solid var(--light-blue)
        }
        button{
          display: flex;
          justify-content: center;
          align-items: center;
          background:transparent;
          border:none;
          color:white;
          cursor:pointer;
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          padding:20px 0
        }
        button svg{
          margin-right:10px!important;

        }
        button:active .circle{
          fill:white;
        }
        button:hover .circle{
          fill:var(--grey);
        }
        .invisible{
          display:none;
        }
        p{
          margin: 0 !important; 
        }
        ::slotted(div)[name=map]{
          width: 100%;
        }
    </style>`
    }
    html(){
        return /*html*/`
  
        <link rel="stylesheet" href="static/css/bootstrap.min.css">

        <button >
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="26" height="26" rx="13" fill="white" fill-opacity="0.07"/>
        <path d="M10.1947 11.6015H6.61722C6.53815 11.6015 6.46232 11.5686 6.40641 11.51C6.3505 11.4515 6.31909 11.3721 6.31909 11.2892V7.54227C6.31909 7.45945 6.3505 7.38003 6.40641 7.32148C6.46232 7.26292 6.53815 7.23002 6.61722 7.23002C6.69629 7.23002 6.77212 7.26292 6.82803 7.32148C6.88394 7.38003 6.91535 7.45945 6.91535 7.54227V10.5398L8.93516 8.41656C10.2243 7.07325 11.9687 6.31915 13.7872 6.31915C15.6056 6.31915 17.3501 7.07325 18.6392 8.41656C18.6926 8.47714 18.7223 8.55657 18.7223 8.63904C18.7223 8.7215 18.6926 8.80094 18.6392 8.86152C18.6115 8.89102 18.5784 8.91445 18.5419 8.93044C18.5055 8.94643 18.4663 8.95467 18.4268 8.95467C18.3872 8.95467 18.3481 8.94643 18.3116 8.93044C18.2752 8.91445 18.2421 8.89102 18.2144 8.86152C17.0383 7.63547 15.4465 6.94716 13.7872 6.94716C12.1278 6.94716 10.536 7.63547 9.35999 8.86152L7.34018 10.977H10.1947C10.2738 10.977 10.3496 11.0099 10.4056 11.0685C10.4615 11.127 10.4929 11.2064 10.4929 11.2892C10.4929 11.3721 10.4615 11.4515 10.4056 11.51C10.3496 11.5686 10.2738 11.6015 10.1947 11.6015ZM20.9571 15.3953H17.3796C17.3005 15.3953 17.2247 15.4282 17.1688 15.4868C17.1129 15.5453 17.0815 15.6247 17.0815 15.7076C17.0815 15.7904 17.1129 15.8698 17.1688 15.9283C17.2247 15.9869 17.3005 16.0198 17.3796 16.0198H20.2342L18.2144 18.1353C17.0383 19.3613 15.4465 20.0496 13.7872 20.0496C12.1278 20.0496 10.536 19.3613 9.35999 18.1353C9.33225 18.1058 9.29918 18.0823 9.26272 18.0664C9.22625 18.0504 9.18711 18.0421 9.14757 18.0421C9.10804 18.0421 9.0689 18.0504 9.03243 18.0664C8.99596 18.0823 8.9629 18.1058 8.93516 18.1353C8.88173 18.1959 8.85206 18.2753 8.85206 18.3578C8.85206 18.4402 8.88173 18.5197 8.93516 18.5802C10.2233 19.9255 11.9681 20.6809 13.7872 20.6809C15.6062 20.6809 17.3511 19.9255 18.6392 18.5802L20.659 16.4569V19.4545C20.659 19.5373 20.6904 19.6168 20.7463 19.6753C20.8022 19.7339 20.8781 19.7668 20.9571 19.7668C21.0362 19.7668 21.112 19.7339 21.1679 19.6753C21.2239 19.6168 21.2553 19.5373 21.2553 19.4545V15.7076C21.2553 15.6247 21.2239 15.5453 21.1679 15.4868C21.112 15.4282 21.0362 15.3953 20.9571 15.3953Z" fill="#00FFFF"/>
        <rect x="0.5" y="0.5" width="26" height="26" rx="13" stroke="white"/>
        </svg>
        
          <p>Переключиться на вид с камеры</p>
        </button>


        <div>
          <slot class="map " name="map"></slot>
          <slot class="video invisible" name="video"></slot>
        </div>
      `
    }
  }
  
if (!customElements.get('bpla-view')) {
    customElements.define('bpla-view',View);
}
  