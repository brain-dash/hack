class TableRoad extends HTMLElement {
    constructor(){
      super();
      this.innerHTML = this.render();
      this.nameEl = this.querySelector(".table-bpla-el-name");
      this.headerEl = this.querySelector(".header-editable");
      this.moreEl = this.querySelector(".more");
    }
  
    static get observedAttributes() { return ['name','status']; }
  
    connectedCallback() {
      this.querySelector("#editRoadSubmit").addEventListener('submit', (e)=>this.handlerSubmit(e));
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "name") {
        this.nameEl.innerHTML = newValue;
        this.headerEl.value = newValue;
        this.querySelector(".more").dataset.bsId=newValue;
      }
    
    }
    handlerSubmit = (e) =>{
      e.preventDefault();
      window.location.href = 'road.html';
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

        }
    </style>`
    }
    html(){
        return /*html*/`
          <div class="table-bpla-el">
            <button type="button" class="more" data-bs-toggle="modal" data-bs-target="#editRoad" >
              <svg width="5" height="20" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.5" cy="3" r="2.5" fill="white"/>
                <circle cx="2.5" cy="10" r="2.5" fill="white"/>
                <circle cx="2.5" cy="17" r="2.5" fill="white"/>
              </svg>
            </button>
            
            <form id="editRoadSubmit" >
              <button class="btn btn-primary"  type="submit">
                <p class="table-bpla-el-name"></p>
              </button>
            </form>
          </div>
           
        `
    }
  }
  
if (!customElements.get('bpla-table-road')) {
    customElements.define('bpla-table-road',TableRoad);
}
