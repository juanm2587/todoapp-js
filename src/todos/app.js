import html from './app.html?raw';//importamos el archivo html y lo guardamos en la variable html. Usamanos el modificador ?raw para que el archivo html se importe como texto plano

/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) => {

  //Cuando la funcion App() se llama
  (() => {
    const app = document.createElement('div'); // Crea un nuevo elemento <div>
    //todo el contenido del archivo html se guarda en la variable html
    app.innerHTML = html; // Establece el contenido HTML del <div> a 'Hola Mundo'
    document.querySelector(elementId).append(app); // Encuentra el elemento en el DOM con el id especificado y le añade el <div> creado
  })();
}