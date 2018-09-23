/**
 * Created on 22.9.2018.
 */
"use strict";
class Expense {
  /**
   *
   * @param {number} id
   * @param description
   * @param {number} price
   * @param {string} date
   * @param {boolean} forCompany
   * @param {Category} category
   */
  constructor (id, description, price, date, forCompany, category) {
    this.id = id;
    this.description = description;
    this.price = price;
    this.date = date;
    this.forCompany = forCompany;
    this.category = category;
  }
}

module.exports = Expense;