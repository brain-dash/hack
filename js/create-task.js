class CreateTask extends HTMLElement {
    constructor(){
      super();
      this.innerHTML = this.render();
      this.taskObject = {};
    }
  
    connectedCallback() {
      this.querySelector("#createTaskFormBpla").addEventListener('submit', (e)=>this.handlerSubmit1(e));
      this.querySelector("#createTaskForm").addEventListener('submit', (e)=>this.handlerSubmit(e));
      this.querySelector("#createTaskFormSumbit").addEventListener('submit', (e)=>this.handlerSubmit(e));
    }

    render(){
      return `${this.css()}${this.html()} `;
    }

    handlerSubmit1 = (e) =>{
      e.preventDefault();
      const formData = new FormData(e.target);
      let formProps = Object.fromEntries(formData);
      Object.assign(this.taskObject,formProps)
      console.log(this.taskObject);

    }
    handlerSubmit = (e) =>{
      e.preventDefault();
      console.log(e.target);
      const formData = new FormData(e.target);
      let formProps = Object.fromEntries(formData);
      Object.assign(this.taskObject,formProps)
      this.querySelector("#createTaskLabel2").innerHTML =`Запустить ${this.taskObject?.bpla} по маршруту ${this.taskObject?.road} ?`
      console.log(this.taskObject);
    }
    handlerSubmit3 = (e) =>{
      e.preventDefault();
      window.location.href = 'view.html'
    }
    css(){
      return /*css*/`<style> 
        :host{
 
        }
 
    </style>`
    }
    html(){
        return /*html*/`
        <form id="createTaskFormBpla" >
          <div class="modal-body">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Список БПЛА
              </button>
              <ul class="dropdown-menu">
                <li>
                  <div class="form-check dropdown-item">
                    <input class="form-check-input" type="radio" name="bpla" id="bpla1" value="БПЛА1">
                    <label class="form-check-label" for="bpla1">
                      БПЛА 1
                    </label>
                  </div>
                </li>
                <li> 
                  <div class="form-check dropdown-item">
                    <input class="form-check-input" type="radio" name="bpla" id="bpla2" value="БПЛА2">
                    <label class="form-check-label" for="bpla2">
                    БПЛА 2
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <bpla-add-bpla></bpla-add-bpla>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTask"   type="submit">Подтвердить БПЛА</button>
        </form>
        
        <!-- Modal -->
        <div class="modal fade " id="createTask" aria-hidden="true" aria-labelledby="createTaskLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5053 5.52636L15.7314 0.527234C15.5735 0.360193 15.3856 0.22759 15.1784 0.137093C14.9713 0.0465958 14.7491 0 14.5246 0C14.3002 0 14.0779 0.0465958 13.8708 0.137093C13.6636 0.22759 13.4757 0.360193 13.3178 0.527234L0.501954 13.9477C0.342715 14.1132 0.216368 14.3101 0.130213 14.527C0.0440572 14.7439 -0.000199146 14.9765 6.73631e-07 15.2115V20.2106C6.73631e-07 20.6852 0.180032 21.1403 0.50049 21.4759C0.820948 21.8115 1.25558 22 1.70878 22H6.48268C6.70702 22.0002 6.92918 21.9539 7.13632 21.8636C7.34346 21.7734 7.53147 21.6411 7.6895 21.4744L20.5053 8.05389C20.8223 7.71701 21 7.26306 21 6.79012C21 6.31719 20.8223 5.86324 20.5053 5.52636ZM2.06121 14.8424L11.1071 5.36979L12.8906 7.23747L3.84475 16.7101L2.06121 14.8424ZM1.70878 17.0009L4.7739 20.2106H1.70878V17.0009ZM6.83511 19.8415L5.05158 17.9739L14.0974 8.50124L15.881 10.3689L6.83511 19.8415ZM17.0878 9.10516L12.3139 4.10603L14.5246 1.791L19.2985 6.79012L17.0878 9.10516Z" fill="black"/>
              </svg>
              <h1 class="modal-title form-control " id="bpla-name"  id="createTaskLabel"> Выбор маршрута</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>  
              <form id="createTaskForm" >
                <div class="modal-body">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                     Маршруты
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <div class="form-check dropdown-item">
                          <input class="form-check-input" type="radio" name="road" id="road1" value="Маршрут1">
                          <label class="form-check-label" for="road1">
                            Маршрут 1
                          </label>
                        </div>
                      </li>
                      <li> 
                        <div class="form-check dropdown-item disabled">
                          <input class="form-check-input" type="radio" name="bpla" id="road2" value="Маршрут2">
                          <label class="form-check-label" for="road2">
                          Маршрут 2
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-primary" data-bs-target="#createTask2" data-bs-toggle="modal"  type="submit">Подтвердить маршрут</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal fade" id="createTask2" aria-hidden="true" aria-labelledby="createTaskLabel2" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="createTaskLabel2">Запустить ${this.tasks?.bpla} по маршруту ${this.tasks?.road}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Картинка с маршрутом
              </div>
              <div class="modal-footer">
                <form id="createTaskSubmit" >
                  <button class="btn btn-primary" data-bs-dismiss="modal" type="submit">Подтвердить задание</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      `
    }
  }
  
if (!customElements.get('bpla-create-task')) {
    customElements.define('bpla-create-task',CreateTask);
}
