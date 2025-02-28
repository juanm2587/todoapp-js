
export {Todo}from '../models/todo.model';//importamos el modelo de los todos
import { createTodoHtml } from './create-todo-html';

let element;//variable global para el elemento html
//para renderizar los elementos html inserto el elementId y los todos en un arreglo vacio.
/**
 * 
 * @param {String} elementId 
 * @param {Todo} todo 
 */
export const renderTodos = (elementId,todos=[]) => {
  //elemento html para renderizar
  
  if (!element)
    element = document.querySelector(elementId);
  if (!element) throw new Error(`Element ${elementId} not found`);
  element.innerHTML = '';
  //recorremos los todos y creamos el html para cada uno

  
  todos.forEach(todo => {
    element.append(createTodoHtml(todo));
  });
}



