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
    </style>`
    }
    html(){
        return /*html*/`
  
        <link rel="stylesheet" href="static/css/bootstrap.min.css">

        <button >
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_14_1274)">
            <rect class="circle" x="1" y="2" width="27" height="27" rx="13.5" fill="grey"  shape-rendering="crispEdges"/>
            <path d="M11.1947 13.6015H7.61722C7.53815 13.6015 7.46232 13.5686 7.40641 13.51C7.3505 13.4515 7.31909 13.3721 7.31909 13.2892V9.54227C7.31909 9.45945 7.3505 9.38003 7.40641 9.32148C7.46232 9.26292 7.53815 9.23002 7.61722 9.23002C7.69629 9.23002 7.77212 9.26292 7.82803 9.32148C7.88394 9.38003 7.91535 9.45945 7.91535 9.54227V12.5398L9.93516 10.4166C11.2243 9.07325 12.9687 8.31915 14.7872 8.31915C16.6056 8.31915 18.3501 9.07325 19.6392 10.4166C19.6926 10.4771 19.7223 10.5566 19.7223 10.639C19.7223 10.7215 19.6926 10.8009 19.6392 10.8615C19.6115 10.891 19.5784 10.9144 19.5419 10.9304C19.5055 10.9464 19.4663 10.9547 19.4268 10.9547C19.3872 10.9547 19.3481 10.9464 19.3116 10.9304C19.2752 10.9144 19.2421 10.891 19.2144 10.8615C18.0383 9.63547 16.4465 8.94716 14.7872 8.94716C13.1278 8.94716 11.536 9.63547 10.36 10.8615L8.34018 12.977H11.1947C11.2738 12.977 11.3496 13.0099 11.4056 13.0685C11.4615 13.127 11.4929 13.2064 11.4929 13.2892C11.4929 13.3721 11.4615 13.4515 11.4056 13.51C11.3496 13.5686 11.2738 13.6015 11.1947 13.6015ZM21.9571 17.3953H18.3796C18.3005 17.3953 18.2247 17.4282 18.1688 17.4868C18.1129 17.5453 18.0815 17.6247 18.0815 17.7076C18.0815 17.7904 18.1129 17.8698 18.1688 17.9283C18.2247 17.9869 18.3005 18.0198 18.3796 18.0198H21.2342L19.2144 20.1353C18.0383 21.3613 16.4465 22.0496 14.7872 22.0496C13.1278 22.0496 11.536 21.3613 10.36 20.1353C10.3322 20.1058 10.2992 20.0823 10.2627 20.0664C10.2262 20.0504 10.1871 20.0421 10.1476 20.0421C10.108 20.0421 10.0689 20.0504 10.0324 20.0664C9.99596 20.0823 9.9629 20.1058 9.93516 20.1353C9.88173 20.1959 9.85206 20.2753 9.85206 20.3578C9.85206 20.4402 9.88173 20.5197 9.93516 20.5802C11.2233 21.9255 12.9681 22.6809 14.7872 22.6809C16.6062 22.6809 18.3511 21.9255 19.6392 20.5802L21.659 18.4569V21.4545C21.659 21.5373 21.6904 21.6168 21.7463 21.6753C21.8022 21.7339 21.8781 21.7668 21.9571 21.7668C22.0362 21.7668 22.112 21.7339 22.1679 21.6753C22.2239 21.6168 22.2553 21.5373 22.2553 21.4545V17.7076C22.2553 17.6247 22.2239 17.5453 22.1679 17.4868C22.112 17.4282 22.0362 17.3953 21.9571 17.3953Z" fill="#00FFFF"/>
            <rect x="1.5" y="2.5" width="26" height="26" rx="13" stroke="white" shape-rendering="crispEdges"/>
            </g>
            <defs>
            <filter id="filter0_d_14_1274" x="0" y="0" width="35" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="3" dy="2"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.64 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14_1274"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14_1274" result="shape"/>
            </filter>
            </defs>
          </svg>
          <p>Переключиться на вид с камеры</p>
        </button>


        <div>
          <slot class="map invisible" name="map"></slot>
          <slot class="video" name="video"></slot>
        </div>
      `
    }
  }
  
if (!customElements.get('bpla-view')) {
    customElements.define('bpla-view',View);
}
  