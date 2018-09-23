/**
 * Created on 22.9.2018.
 */
"use strict";

class Category {
  /**
   *
   * @param {number} id
   * @param {string} name
   * @param {string} colour
   */
  constructor (id, name, colour) {
    this.id = id;
    this.name = name;
    this.colour = colour;
  }
}

module.exports = Category;