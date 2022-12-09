class TableBpla extends HTMLElement {
    constructor(){
      super();
      this.innerHTML = this.render();
      this.nameEl = this.querySelector(".table-bpla-el-name");
      this.headerEl = this.querySelector(".header-editable");
      this.moreEl = this.querySelector(".more");
    }
  
    static get observedAttributes() { return ['name','status']; }
  
    connectedCallback() {
      this.querySelector(".more").dataset.bsId=this.getAttribute("name");

      //Открытие модального окна с нужным БПЛА
      const exampleModal = document.getElementById('editBPLA');
      exampleModal.addEventListener('show.bs.modal', event => {
        console.error("TODO: Сделать так, чтобы событие вызывалась только для одного модального окна")
        
        const button = event.relatedTarget
        const bplaId = button.getAttribute('data-bs-id')
        const modalTitle = exampleModal.querySelector('.modal-title')
        modalTitle.value = bplaId;
      })


      this.querySelector(".table-bpla-el").addEventListener("click",(e) =>this.openView(e));
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "name") {
        this.nameEl.innerHTML = newValue;
        this.headerEl.value = newValue;
        this.querySelector(".more").dataset.bsId=newValue;
      }
      if (name === "status"){
        if(newValue === "1"){
          this.querySelector(".status-type").style.background = "#5EFFB1";
          this.querySelector(".status-type").style.boxShadow = "0 0 4px 0 #5EFFB1";
          this.querySelector(".status-text").innerHTML = "В пути";
        }
        if(newValue === "2"){
          this.querySelector(".status-type").style.background = "#FFDB5E";
          this.querySelector(".status-type").style.boxShadow = "0 0 4px 0 #FFDB5E";
          this.querySelector(".status-text").innerHTML = "Ожидает команды";
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

      // else
      //   e.preventDefault
    }
    render(){
      return `${this.css()}${this.html()} `;
    }
    css(){
      return /*css*/`<style> 

        .table-bpla-el-name{

        }
        bpla-table-bpla{
          width:100%;
        }
        bpla-table-bpla:hover, bpla-table-bpla:active{
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
        .status-text{

        }
    </style>`
    }
    html(){
        return /*html*/`
          <div class="table-bpla-el">
            <button type="button" class="more" data-bs-toggle="modal" data-bs-target="#editBPLA" >
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
            <!-- Modal -->
            <div class="modal fade " id="editBPLA" aria-hidden="true" aria-labelledby="editBPLALabel" tabindex="-1">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.5053 5.52636L15.7314 0.527234C15.5735 0.360193 15.3856 0.22759 15.1784 0.137093C14.9713 0.0465958 14.7491 0 14.5246 0C14.3002 0 14.0779 0.0465958 13.8708 0.137093C13.6636 0.22759 13.4757 0.360193 13.3178 0.527234L0.501954 13.9477C0.342715 14.1132 0.216368 14.3101 0.130213 14.527C0.0440572 14.7439 -0.000199146 14.9765 6.73631e-07 15.2115V20.2106C6.73631e-07 20.6852 0.180032 21.1403 0.50049 21.4759C0.820948 21.8115 1.25558 22 1.70878 22H6.48268C6.70702 22.0002 6.92918 21.9539 7.13632 21.8636C7.34346 21.7734 7.53147 21.6411 7.6895 21.4744L20.5053 8.05389C20.8223 7.71701 21 7.26306 21 6.79012C21 6.31719 20.8223 5.86324 20.5053 5.52636ZM2.06121 14.8424L11.1071 5.36979L12.8906 7.23747L3.84475 16.7101L2.06121 14.8424ZM1.70878 17.0009L4.7739 20.2106H1.70878V17.0009ZM6.83511 19.8415L5.05158 17.9739L14.0974 8.50124L15.881 10.3689L6.83511 19.8415ZM17.0878 9.10516L12.3139 4.10603L14.5246 1.791L19.2985 6.79012L17.0878 9.10516Z" fill="black"/>
                    </svg>
                    <input type="text" class="modal-title form-control header-editable" id="bpla-name" value=${this.name} id="editBPLALabel">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick = "console.log(this.headerEl.value)"></button>
                  </div>  
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label for="bpla-mass" class="col-form-label">Масса:</label>
                        <input type="text" class="form-control" id="bpla-mass">
                      </div>
                      <div class="mb-3">
                        <label for="bpla-angle" class="col-form-label">Угол крена:</label>
                        <input type="text" class="form-control" id="bpla-angle">
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-primary" data-bs-target="#editBPLA2" data-bs-toggle="modal">Добавить</button>
                  </div>
                </div>
              </div>
            </div>
        `
    }
  }
  
if (!customElements.get('bpla-table-bpla')) {
    customElements.define('bpla-table-bpla',TableBpla);
}
