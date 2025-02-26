import './style.css'
import { App } from './todos/app.js';
import todoStore from './store/todo.store.js';

todoStore.initStore();

App('#app'); // Llama a la funcion App() y le pasa el id del elemento en el que se va a renderizar la aplicacion
