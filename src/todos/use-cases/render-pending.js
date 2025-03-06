import todoStore,{Filters} from "../../store/todo.store";

let element;
/**
 * 
 * @param {String} elementId 
 */

export const renderPending = (elementId) => {

  if(!element)
    element = document.querySelector(elementId);//busca el elemento en el DOM  por el ID
  if(!element)
    throw new Error(`Element ${elementId} not found`);//si no encuentra el elemento, lanza un error
  element.innerHTML = todoStore.getTodos(Filters.Pending).length;//renderiza los todos pendientes
}

