import { Todo } from "../models/todo.model";

/*podemos aplicar destructuring en la funcion en estas lineas
  <input class="toggle" type="checkbox" ${todo.done? 'checked':''}>
  <label>${todo.description}</label>
  ------------------------
  liElement.setAttribute('data-id', todo.id);//agregamos el atributo 
const {done, description} = todo; y quedaria asi
  <input class="toggle" type="checkbox" ${done? 'checked':''}>
  <label>${description}</label>
  ------------------------
  liElement.setAttribute('data-id', id);//agregamos el atributo 
*/
/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHtml = (todo) => {
  if (!todo) throw new Error('A TODO object is required');
  const html = `
    <div class="view">
        <input class="toggle" type="checkbox" ${todo.done? 'checked':''}>
        <label>${todo.description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">`;
  //creamos el html para el TODO
  const liElement = document.createElement('li');//creamos un elemento li
  liElement.innerHTML = html;//agregamos el html al elemento li
  liElement.setAttribute('data-id', todo.id);//agregamos el atributo data-id al elemento li
  if(todo.done)
    liElement.classList.add('data-completed');//agregamos el atributo data-completed al elemento li
  return liElement;//retornamos el elemento li
}
