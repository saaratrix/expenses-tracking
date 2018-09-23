/**
 * Created on 22.9.2018.
 */
"use strict";

var Category = require("./../models/category");
var query = require("./../database/mysql-connection");

class CategoryHandler {

  getAll () {
    return query("select * from categories", []).then(rows => {
      var result = [];

      for (let i = 0; i < rows.length; i++) {
        var row = rows[i];
        result.push(new Category(row.id, row.name, row.colour));
      }

      return result;
    });
  }

  add (entity) {
    const sql = `insert into categories(name, colour)
                  values (?, ?);`;

    return query(sql, [ entity.description, entity.price, entity.date, entity.forCompany, entity.category.id ]).then(result => {
      if (!result.error) {
        entity.id = result.insertId;
      }
    });
  }

  isEntityValid(entity) {
    if (!entity.name || entity.name.length === 0) {
      return false;
    }
    // #fff  = at least 4.  Or longer than 7 #123456
    if (!entity.colour || entity.colour.length > 4 || entity.colour.length > 7) {
      return false;
    }

    return true;
  }
}

module.exports = CategoryHandler;