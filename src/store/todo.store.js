import { Todo } from '../todos/models/todo.model'

export const Filters = {
  All: 'all',
  Completed: 'Completed',
  Pending: 'Pending'
}

const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del espacio'),
    new Todo('Piedra del tiempo'),
    new Todo('Piedra del poder'),
    new Todo('Piedra del realidad'),
  ],
  filter:Filters.All,
}

const initStore = () => {
  loadStore();//abrimos el localStorage
  console.log('initStore');
}

//cargar localStorage
const loadStore = () => {
  if (!localStorage.getItem("state")) return;
  const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem("state")); 
  state.todos = todos;
  state.filter = filter;
  
}
//aplicacion de localStore
const saveStateToLocalStorage = () => {
  localStorage.setItem("state", JSON.stringify(state));
}

const getTodos = (filter=Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter(todo => todo.done);
    case Filters.Pending:
      return state.todos.filter(todo => !todo.done);
    default:
      throw new Error(`Option ${filter} is not valid`);
  }
}

/**
   * @param {String} description
   */
const addTodo = (description ) => {
  if (!description) throw new Error('Description is required');
  state.todos.push(new Todo(description));
  saveStateToLocalStorage();
}
/**
 * 
 * @param {String} todoId Todo identifier
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map(todo => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });
  saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter(todo => todo.id !== todoId);
  saveStateToLocalStorage();
}

const deleteCompleted = () => {
  state.todos = state.todos.filter(todo => !todo.done);
  saveStateToLocalStorage();
}
/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
  saveStateToLocalStorage();
}

const getCurrentFilter = () => {
  return state.filter;
}


//si no exportamos los metodos u objetos , estos terminan siendo privados en el modulo(este archivos)
export default {
  initStore,
  getTodos,
  loadStore,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
  addTodo,
};
