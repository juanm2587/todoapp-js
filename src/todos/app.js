import html from './app.html?raw';//importamos el archivo html y lo guardamos en la variable html. Usamanos el modificador ?raw para que el archivo html se importe como texto plano
import todoStore, { Filters } from '../store/todo.store';//importamos el store de los todos
import { renderTodos } from './use-cases';
import { Todo } from './models/todo.model';

//------------------Referencias a clases css------------------
const ElementIDs = {
  ClearCompletedButton:'.clear-completed',//apunta al boton de borrar todos los todos completados
  TodoList: '.todo-list',//apunta al identificar donde quiero insertar los todos
  NewTodoInput: '#new-todo-input',//apunta al input donde se ingresan los nuevos todos
  TodoFilters:'.filtro',//apunta al filtro de los todos
}



/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) => {
  //renderizar componente
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    //console.log(todos);//llamo a los todos por consola
    renderTodos(ElementIDs.TodoList, todos); //aca pongo donde tengo que renderizar
  };

  //Cuando la funcion App() se llama.
  //Esta es la funcion sincrona que crea el elemento en el html y esto aparece en el DOM
  (() => {
    const app = document.createElement("div"); // Crea un nuevo elemento <div>
    //todo el contenido del archivo html se guarda en la variable html
    app.innerHTML = html; // Establece el contenido HTML del <div> a 'Hola Mundo'
    document.querySelector(elementId).append(app); // Encuentra el elemento en el DOM con el id especificado y le añade el <div> creado
    displayTodos();
  })();

  //------------------Referencias html------------------
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput); //referencia al input donde se ingresan los nuevos todos
  const todoListUL = document.querySelector(ElementIDs.TodoList); //referencia al identificador donde se insertan los todos
  const clearCompletedButton = document.querySelector(
    ElementIDs.ClearCompletedButton
  ); //referencia al boton de borrar todos los todos completados
  const filtersLIs=document.querySelectorAll(ElementIDs.TodoFilters);//referencia a los filtros de los todos

  //------------------Listeners------------------
  //keyup escucha cuando se suelta una tecla
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return; //si la tecla no es enter, no hagas nada
    if (event.target.value.trim().length === 0) return; //si el valor del input esta vacio, no hagas nada
    todoStore.addTodo(event.target.value); //agrega un nuevo todo
    displayTodos(); //renderiza los todos
    //validacion de la funcion addTodo
    event.target.value = ""; //limpia el input
  });
  //ahora escuchamos cada ves que se haga clik en el elemento "todoListUL"
  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]"); //busca el elemento mas cercano que tenga el atributo data-id(seria el elemento padre)
    todoStore.toggleTodo(element.getAttribute("data-id")); //muestra el id del elemento
    displayTodos();
  });

  //Eliminar un Todo
  todoListUL.addEventListener("click", (event) => {
    const isDestroyElement = event.target.className === "destroy"; //si el elemento tiene la clase destroy
    const element = event.target.closest("[data-id]"); //busca el elemento mas cercano que tenga el atributo data-id(seria el elemento padre)
    if (!element || !isDestroyElement) return; //si no hay elemento o no tiene la clase destroy, no hagas nada
    todoStore.deleteTodo(element.getAttribute("data-id")); //elimina el todo
    displayTodos(); //renderiza los todos
  });
  //eliminar todos los todos completados
  clearCompletedButton.addEventListener("click", () => {
    todoStore.deleteCompleted(); //elimina los todos completados
    displayTodos(); //renderiza los todos
  });
  //filtrar los todos
  filtersLIs.forEach((element) => {
    element.addEventListener('click', (element) => {
      filtersLIs.forEach(el=>el.classList.remove('selected'));
      element.target.classList.add('selected');
      switch (element.target.text) {//podemos usar los ID que estan en el html para cada filtro
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });

}