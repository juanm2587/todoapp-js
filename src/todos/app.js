import html from './app.html?raw';//importamos el archivo html y lo guardamos en la variable html. Usamanos el modificador ?raw para que el archivo html se importe como texto plano
import todoStore from '../store/todo.store';//importamos el store de los todos
import { renderTodos } from './use-cases';
import { Todo } from './models/todo.model';


const ElementIDs = {
  TodoList: '.todo-list',//apunta al identificar donde quiero insertar los todos
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
    renderTodos(ElementIDs.TodoList, todos);//aca pongo donde tengo que renderizar
  }



  //Cuando la funcion App() se llama
  (() => {
    const app = document.createElement('div'); // Crea un nuevo elemento <div>
    //todo el contenido del archivo html se guarda en la variable html
    app.innerHTML = html; // Establece el contenido HTML del <div> a 'Hola Mundo'
    document.querySelector(elementId).append(app); // Encuentra el elemento en el DOM con el id especificado y le añade el <div> creado
    displayTodos();
  })();
}