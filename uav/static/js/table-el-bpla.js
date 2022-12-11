class TableBpla extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = this.render();
      this.nameEl = this.shadowRoot.querySelector(".table-bpla-el-name");
      this.headerEl = this.shadowRoot.querySelector(".header-editable");
      this.hiddenEl = this.shadowRoot.querySelector("#hiddenname");
      this.moreEl = this.shadowRoot.querySelector(".more");
    }
  
    static get observedAttributes() { return ['name','status']; }
  
    connectedCallback() {
      this.shadowRoot.querySelector(".more").dataset.bsId=this.getAttribute("name");

      this.modal = this.shadowRoot.querySelector(".modal");
      this.openModalBtn = this.shadowRoot.getElementById("openBplaModal");
      this.submitModalBtn = this.shadowRoot.querySelector(".btn-modal-close");
      this.span = this.shadowRoot.querySelector(".no-cross");

      this.openModalBtn.addEventListener('click',()=>this.getChars());
      this.span.addEventListener('click', ()=>this.closeModal())
      this.submitModalBtn.addEventListener('click', ()=>{
        this.closeModal();
        let xhr = new XMLHttpRequest(); 
        let url = new URL('/api/getCharacteristics');
        url.searchParams.set('name', this.getAttribute("name"));
        
        xhr.open('GET', URL);
        xhr.send([body]);
        xhr.onload = () => {
        console.log(`Загружено: ${xhr.status} ${xhr.response}`);
          this.shadowRoot.querySelector("#bpla-gforce").value = xhr.responce.maximum_gforce;
          this.shadowRoot.querySelector("#bpla-velocity").value = xhr.responce.velocity;
          
        };
      })

      //When the user clicks anywhere outside of the modal, close it
      window.addEventListener('click', (e) =>{
        if (e.path[0] == this.modal) {
          this.closeModal();
        }
      })

    }
    getChars = async () =>{
      this.modal.style.display = "block";
     
      let token = this.token


      const body = {
        'name' : this.getAttribute("name")
      } 
      //body = JSON.stringify(body)

      let xhr = new XMLHttpRequest(); 
      let url = new URL('http://127.0.0.1:8000/api/getCharacteristics');
      url.searchParams.set('name', this.getAttribute("name"));
      

      
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
      xhr.send(JSON.stringify(body));
      xhr.responseType = 'json'
      xhr.onload = () => {
       console.log(xhr.response);
       this.shadowRoot.querySelector("#bpla-gforce").value = xhr.response.maximum_gforce;
       this.shadowRoot.querySelector("#bpla-velocity").value = xhr.response.velocity;
       
      };
    }
    closeModal =() =>{
      this.modal.style.display = "none";
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "name") {
        this.nameEl.innerHTML = newValue;
        this.headerEl.value = newValue;
        this.hiddenEl.value = newValue;
        this.shadowRoot.querySelector(".more").dataset.bsId=newValue;
      }
      if (name === "status"){
        if(newValue === "0"){
          this.shadowRoot.querySelector(".status-type").style.background = "#5EFFB1";
          this.shadowRoot.querySelector(".status-type").style.boxShadow = "0 0 4px 0 #5EFFB1";
          this.shadowRoot.querySelector(".status-text").innerHTML = "В пути";
        }
        if(newValue === "1"){
          this.shadowRoot.querySelector(".status-type").style.background = "#FFDB5E";
          this.shadowRoot.querySelector(".status-type").style.boxShadow = "0 0 4px 0 #FFDB5E";
          this.shadowRoot.querySelector(".status-text").innerHTML = "Ожидает команды";
        }
        else{
          this.shadowRoot.querySelector(".status-type").style.background = "#5EFFB1";
          this.shadowRoot.querySelector(".status-type").style.boxShadow = "0 0 4px 0 #5EFFB1";
          this.shadowRoot.querySelector(".status-text").innerHTML = "В пути";
        }
      }
    }
    
    /**
     * Переход на новую вкладку, если это не нажатие на кнопку с открытием модального окна
     * @param {event} e 
     */
    openView = (e) => {
      if (!e.path.find(element => element == this.moreEl))
        console.log(e.path.find(element => element == this.moreEl))
    }
    render(){
      return `${this.css()}${this.html()} `;
    }
    css(){
      return /*css*/`<style> 

        :host{
          width:100%;
        }
        :host:hover, :host:active{
          background:grey;
        }
        .table-bpla-el{
          display:flex;
          justify-content: flex-start;
          align-items: center;
          height:2rem;
          width: 100%;
          cursor:pointer;
        }
        .table-bpla-el-name{
          margin:0;
          flex-grow:1;
        }
        .more{
          background:transparent;
          border:none;
          padding-right:20px;
        }
        .status{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100px;
          margin-right:10px
        }
        .status-type{
          width:10px;
          height:10px;
          border-radius:10px;
          background:red;
          margin:10px;
          flex-shrink:0;
        }
        
        /************* */
        /* The Modal (background) */
    .modal {
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      color:black;

    }

    /* Modal Content */
    .modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80% !important;
      animation-name: animatetop;
      animation-duration: 0.4s
    }

    /* The Close Button */
    .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
    
    
.modal-content{
  background-color: #565656!important;;
  color:white!important;;
  box-shadow: 0 0 6px 1px black!important;;
}
.form-control{
  background-color: transparent!important;;
  color:white!important;
}
.form-control:focus {
  color: #212529!important;;
  background-color: #fff!important;;
  border-color: #86b7fe!important;;
  outline: 0!important;;
  box-shadow: none!important;
}
.button-add {
  justify-content: center;
  align-items: center;
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
  color: white;
}
.button-add svg path{
  transition: all 0.2s linear;
}
.button-add p{
  border-bottom:0px solid;
  color: white;
}
p{
  margin: 0;
}

.button-add:hover p{
  border-bottom:1px solid;
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
.form-control::placeholder {
  color:#a9a9a9!important;;
}
.form-control:focus{
  color: white!important;;
  background-color: transparent!important;;
  box-shadow: none!important;;
  border-bottom: 1px white solid !important;
  border-radius: 0!important;;
}
.modal-header{
  border-bottom: 1px solid var(--light-blue)!important;
}
.modal-footer{
  border-top: 1px solid var(--light-blue) !important;

}
.no-cross{
  background:transparent;
  border:none;
}
    @keyframes animatetop {
      from {top: -300px; opacity: 0}
      to {top: 0; opacity: 1}
    }
    </style>`
    }
    html(){
        return /*html*/`
        <link rel="stylesheet" href="/static/css/bootstrap.min.css">
          <div class="table-bpla-el">
            <button type="button" class="more" data-bs-toggle="modal" data-bs-target="#editBPLA" id="openBplaModal" >
              <svg width="5" height="20" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.5" cy="3" r="2.5" fill="white"/>
                <circle cx="2.5" cy="10" r="2.5" fill="white"/>
                <circle cx="2.5" cy="17" r="2.5" fill="white"/>
              </svg>
            </button>
            <p class="table-bpla-el-name"></p>
            <div class="status">
              <div class="status-type"></div>
              <div class="status-text">В пути</div>
            </div>
          </div>

            <div id="myModal" class="modal">
              <form class="modal-content" action="/api/changeCharacteristics" method="post" >
                <div class="modal-header">
                  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5053 5.52636L15.7314 0.527234C15.5735 0.360193 15.3856 0.22759 15.1784 0.137093C14.9713 0.0465958 14.7491 0 14.5246 0C14.3002 0 14.0779 0.0465958 13.8708 0.137093C13.6636 0.22759 13.4757 0.360193 13.3178 0.527234L0.501954 13.9477C0.342715 14.1132 0.216368 14.3101 0.130213 14.527C0.0440572 14.7439 -0.000199146 14.9765 6.73631e-07 15.2115V20.2106C6.73631e-07 20.6852 0.180032 21.1403 0.50049 21.4759C0.820948 21.8115 1.25558 22 1.70878 22H6.48268C6.70702 22.0002 6.92918 21.9539 7.13632 21.8636C7.34346 21.7734 7.53147 21.6411 7.6895 21.4744L20.5053 8.05389C20.8223 7.71701 21 7.26306 21 6.79012C21 6.31719 20.8223 5.86324 20.5053 5.52636ZM2.06121 14.8424L11.1071 5.36979L12.8906 7.23747L3.84475 16.7101L2.06121 14.8424ZM1.70878 17.0009L4.7739 20.2106H1.70878V17.0009ZM6.83511 19.8415L5.05158 17.9739L14.0974 8.50124L15.881 10.3689L6.83511 19.8415ZM17.0878 9.10516L12.3139 4.10603L14.5246 1.791L19.2985 6.79012L17.0878 9.10516Z" fill="white"/>
                  </svg>
                  <input type="text" class="modal-title form-control header-editable" id="bpla-name" value=${this.name} id="editBPLALabel" name="change-name">
                  <button type="button" class="no-cross" data-bs-dismiss="modal" aria-label="Close" >
                  <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="1" y1="29.5858" x2="29.5858" y2="1" stroke="white" stroke-width="2" stroke-linecap="round"/>
                      <line x1="1" y1="-1" x2="41.4264" y2="-1" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 31 31)" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="bpla-mass" class="col-form-label">Скорость:</label>
                    <input type="text" class="form-control" id="bpla-velocity" name="bpla-velocity">
                  </div>
         
                  <div class="mb-3">
                    <label for="bpla-angle" class="col-form-label">G-force</label>
                    <input type="text" class="form-control" id="bpla-gforce" name="bpla-gforce">
                  </div>

                </div>
                <div class="modal-footer">
                  <input type="submit" class="btn btn-primary btn-modal-close"></button>
                </div>
                <input type="hidden"  id="hiddenname" name="name" >

              </form>
            </div>
        `
    }
  }
  
if (!customElements.get('bpla-table-bpla')) {
    customElements.define('bpla-table-bpla',TableBpla);
}
