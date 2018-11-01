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
  getAllSorted () {
    return query(`select distinct e.id, e.description, e.price, e.date, e.forCompany, c.id as categoryId, c.name as categoryName, c.colour as categoryColour 
                  from expenses as e 
                  inner join categories as c 
                  on c.id = e.categoryId
                  order by e.date;`, [])
    .then((rows) => {
      let expenses = [];

      let allExpenses = [];
      let categories = {};

      for ( let i = 0; i < rows.length; i++) {
        var row = rows[i];
        const date = row.date.toISOString().substring(0, 10);

        let category = categories[row.categoryId];

        if (!category) {
          category = new Category(row.categoryId, row.categoryName, row.categoryColour);
          categories[row.categoryId] = category;
        }

        var expense = new Expense(row.id, row.description, row.price, date, row.forCompany, category);

        allExpenses.push(expense);
      }

      // Sort by year
      // { year: number, months: [] }
      // { month: number, expenses }

      let yearItems = [];
      for (let i = 0; i < allExpenses.length; i++) {
        const expense = allExpenses[i];
        const date = new Date(expense.date);

        const fullYear = date.getFullYear();
        const fullMonth = date.getMonth();

        let yearItem = yearItems.find(item => {
          return item.year === fullYear;
        });

        if (!yearItem) {
          yearItem = {
            year: fullYear,
            months: []
          };
          yearItems.push(yearItem);
        }

        let monthItem = yearItem.months.find(item => {
          return item.month === fullMonth;
        });

        if (!monthItem) {
          monthItem = {
            month: fullMonth,
            expenses: []
          };
          yearItem.months.push(monthItem);
        }

        monthItem.expenses.push(expense);
      }

      for (let i = 0; i < yearItems.length; i++) {
        yearItems[i].months.sort((a, b) => {
          return a.month - b.month;
        });
      }

      yearItems.sort((a, b) => {
        return a.year - b.year;
      });

      return yearItems;
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