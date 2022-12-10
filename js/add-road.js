class AddRoad extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = this.render();
    }
  
    static get observedAttributes() { return ['type']; }
  
    connectedCallback() {
      this.shadowRoot.querySelector("button").addEventListener("click", ()=>this.handlerClick())
    }
    handlerClick = () =>{
      window.location.href = 'road.html';
    }
    render(){
      return `${this.css()}${this.html()} `;
    }
    css(){
      return /*css*/`<style> 
        :host{
          width: 80%;
        }
        .modal{
          color:black
        }
        .modal-title{
          color:black;
        }
        .header-editable{
            margin-left:10px;
            border:none;
            cursor:pointer;
        }

        .button-add {
          display: flex;
          justify-content: center;
          align-items: center;

          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 16px;
          margin:20px 0;

          background: transparent;
          border:none;
          transition: all 0.4s linear;
          cursor: pointer;
          text-decoration:none;
        }
        .button-add svg path{
          transition: all 0.2s linear;
        }
   
        .button-add:hover svg path{
          fill: var(--grey)
        }
        .button-add:active svg path{
          fill: var(--light-blue);
        }
       .svg-container{
          display:flex;
          justify-content: center;
          align-items: center;
          width:50px;
          height:50px;

          background: rgba(255, 255, 255, 0.07);
          border: 1px solid #FFFFFF;
          box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.64);
          border-radius: 25px;
          margin-right:20px;
        }
        .text{
            color: white;
            margin:0;
        }
        
 
    </style>`
    }
    html(){
        return /*html*/`
          <button class="btn btn-primary button-add"  type="submit" class="road-new">
            <div class="svg-container" > 
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.76 10.096V2.704H28.824V10.096H26.76ZM23.992 7.376V5.424H31.608V7.376H23.992Z" fill="white"/>
                <path d="M31 17.9228C31 18.3003 30.925 18.674 30.7796 19.0217C30.6341 19.3694 30.4211 19.6841 30.1532 19.947C29.8852 20.21 29.5678 20.4159 29.2198 20.5526C28.8717 20.6893 28.5001 20.7539 28.1268 20.7428L21.4863 20.5458L16.6453 30.668C16.2571 31.4814 15.44 32 14.5458 32C14.3621 32.0001 14.1805 31.9609 14.013 31.8848C13.8455 31.8087 13.6959 31.6975 13.574 31.5586C13.4521 31.4197 13.3608 31.2563 13.306 31.079C13.2513 30.9018 13.2343 30.7148 13.2563 30.5305L14.4659 20.3375L9.18903 20.1816L8.50227 22.0819C8.37506 22.4337 8.14404 22.7374 7.84047 22.9521C7.5369 23.1668 7.17544 23.282 6.80499 23.2822C6.63904 23.2822 6.47472 23.2491 6.32142 23.1848C6.16812 23.1206 6.02884 23.0264 5.91156 22.9077C5.79428 22.789 5.7013 22.6481 5.63792 22.493C5.57454 22.3379 5.54201 22.1717 5.54219 22.0039V19.9123L4.40694 19.6729C4.00932 19.5891 3.65237 19.3695 3.39613 19.0509C3.13989 18.7322 3 18.3341 3 17.9235C3 17.5128 3.13989 17.1147 3.39613 16.7961C3.65237 16.4775 4.00932 16.2578 4.40694 16.1741L5.54219 15.936V13.8416C5.54185 13.5306 5.65392 13.2302 5.85732 12.9969C6.06071 12.7636 6.34141 12.6134 6.64662 12.5747L6.80499 12.5648C7.17504 12.5651 7.53607 12.6803 7.83934 12.8947C8.1426 13.1091 8.37351 13.4124 8.50087 13.7637L9.19044 15.6625L14.4477 15.5067L13.2563 5.46809C13.2537 5.44217 13.2518 5.41618 13.2507 5.39015L13.2479 5.31221C13.2479 4.58809 13.8296 4 14.5458 4C15.3657 4 16.1197 4.43504 16.5402 5.13366L16.6453 5.33205L21.4148 15.3012L28.1282 15.1028C28.8679 15.081 29.5859 15.3573 30.1242 15.8707C30.6624 16.3841 30.977 17.0927 30.9986 17.8406V17.9228H31Z" fill="white"/>
              </svg>
            </div>
            <p class="text">Добавить новый маршрут</p>
          </button>
        `
    }
  }
  
if (!customElements.get('bpla-add-road')) {
    customElements.define('bpla-add-road',AddRoad);
}
