"use strict";
var Category = require("./../models/category");
var Expense = require("./../models/expense");

var query = require("./../database/mysql-connection");

class ExpenseHandler {

  constructor () {

  }

  /**
   *
   * @return {Promise<MySQLResults|MySQLError>}
   */
  getAll () {
    return query(`select distinct e.id, e.description, e.price, e.date, e.forCompany, c.id as categoryId, c.name as categoryName, c.colour as categoryColour 
                  from expenses as e 
                  inner join categories as c 
                  on c.id = e.categoryId
                  order by e.date;`, [])
    .then((rows) => {
      let expenses = [];

      for ( let i = 0; i < rows.length; i++) {
        var row = rows[i];
        const date = row.date.toISOString().substring(0, 10);

        var category = new Category(row.categoryId, row.categoryName, row.categoryColour);
        var expense = new Expense(row.id, row.description, row.price, date, row.forCompany, category);

        expenses.push(expense);
      }

      return expenses;
    });
  }

  add (entity) {
    const sql = `insert into expenses(description, price, date, forCompany, categoryId)
                  values (?, ?, ?, ?, ?);`;

    return query(sql, [ entity.description, entity.price, entity.date, entity.forCompany, entity.category.id ]).then(result => {
      if (!result.error) {
        entity.id = result.insertId;
      }
    });
  }

  isEntityValid(entity) {
    return true;
  }
}

module.exports = ExpenseHandler;