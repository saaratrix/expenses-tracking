var express = require("express");
var router = express.Router();

var Expense = require("./../models/expense");
var Category = require("./../models/category");

var ExpenseHandler = require("./../handlers/expenseHandler");
var _expenseHandler = new ExpenseHandler();

router.get("/get", function(req, res, next) {
  _expenseHandler.getAll().then((expenses) => {
    res.json(expenses);
  });
});

router.post("/put", function(req, res, next) {

  let expense = getExpenseFromBody(req.body);
  let error = "";

    if (_expenseHandler.isEntityValid(expense, false)) {
      _expenseHandler.add(expense).then((success) => {
        if (!success) {
          expense = null;
          error = "Failed to add the expense to database.";
        }

        res.json({
          expense: expense,
          error: error
        });
      });
    }
    else {
      expense = null;
      error = "Invalid expense.";

      res.json({
        expense: expense,
        error: error
      });
    }
});

/**
   * Parse the request.body and return a new phrase.
   * @param body
   * @return {Category}
   */
function getExpenseFromBody (body) {
  const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
  const description = body.description || "";
  const price = typeof body.price !== "undefined" ? parseFloat(body.price) : 0;
  const date = body.date || new Date().toISOString().substring(0, 10);
  const forCompany = !!body.forCompany;
  const categoryId = typeof body.categoryId !== "undefined" ? parseInt(body.categoryId, 10) : -1;
  const categoryName = body.categoryName || "";
  const categoryColour = body.categoryColour || "";

  var category = new Category(categoryId, categoryName, categoryColour);

  return new Expense(id, description, price, date, forCompany, category);
}

module.exports = router;
