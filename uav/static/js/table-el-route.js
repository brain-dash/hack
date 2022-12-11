class Tableroute extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = this.render();
        this.nameEl = this.shadowRoot.querySelector(".table-bpla-el-name");
        this.hiddenEl = this.shadowRoot.querySelector(".hiddenRoad");
        this.moreEl = this.shadowRoot.querySelector(".more");
        console.log(this.hiddenEl)
    }

    static get observedAttributes() { return ['name', 'status']; }

    connectedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "name") {
            this.nameEl.innerHTML = newValue;
            this.hiddenEl.value = newValue;
            console.log(this.hiddenEl)
            this.querySelector(".more").dataset.bsId = newValue;
        }

    }

    render() {
        return `${this.css()}${this.html()} `;
    }
    css() {
        return /*css*/ `<style> 

        .table-bpla-el-name{

        }
        bpla-table-route{
          width:100%;
          display:flex
        }
        bpla-table-bpla:hover, bpla-table-bpla:active{
          background:grey;
        }
        .table-bpla-el-container{
          width: 100%;
          height:100%;
          display:flex;
          justify-content: space-between;
          align-items: center;
          padding:0 10px;
          color:white;
        }
        .table-bpla-el-container:hover{
          background:grey;
        }
        .table-bpla-el-container:active{
          background:var(--dark-blue)
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
        }
        .more{
          background:transparent;
          border:none;
          display:flex;
          align-items: center;
        }

        }
    </style>`
    }
    html() {
        return /*html*/ `
        <link rel="stylesheet" href="static/css/bootstrap.min.css">
            <form class="table-bpla-el" id="editrouteSubmit"  action="/route" method="post">
              <button type="submit" class="table-bpla-el-container" >
                <div class="more"  >
                  <svg width="5" height="20" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2.5" cy="3" r="2.5" fill="white"/>
                    <circle cx="2.5" cy="10" r="2.5" fill="white"/>
                    <circle cx="2.5" cy="17" r="2.5" fill="white"/>
                  </svg>
                </div>
                <p class="table-bpla-el-name"></p>
              </button>
              <input type="hidden" class="hiddenRoad"  id="hiddenRoadName" name="name">
            </form>
           
        `
    }
}

if (!customElements.get('bpla-table-route')) {
    customElements.define('bpla-table-route', Tableroute);
}