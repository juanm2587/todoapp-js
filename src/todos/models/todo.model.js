//importamos uuid para generar ids unicos
import { v4 as uuidv } from 'uuid';

//lo creamos como una clase para poder crear instancias de Todo
export class Todo{
/**
 * 
 * @param {String} description 
 */
  constructor(description) {
    this.id = uuidv();//pasamos un id unico a cada instancia de Todo con uuid()
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
  }
}