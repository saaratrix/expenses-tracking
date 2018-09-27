var express = require("express");
var router = express.Router();

var Category = require("./../models/Category");
var CategoryHandler = require("./../handlers/categoryHandler");
var _categoryHandler = new CategoryHandler();



router.get("/get", function(req, res, next) {
  _categoryHandler.getAll().then((categories) => {
    res.json(categories);
  });
});

router.get("/get/:id", function(req, res, next) {
  const id = parseInt(req.params.id, 10);
  let error = "";
  
  // It would be better to have a proper SQL that doesn't fetch all... but... whatever for this project.
  _categoryHandler.getAll().then(categories => {
    const category = categories.find(category => {
      return category.id === id;
    });

    if (!category) {
      error = "no category with that id found.";
    }

    res.json({
      category: category,
      error: error
    });
  });
});

router.post("/put", function(req, res, next) {

  let category = getCategoryFromBody(req.body);
  let error = "";

    if (_categoryHandler.isEntityValid(category, false)) {
      _categoryHandler.add(category).then(( success) => {
        if (!success) {
          category = null;
          error = "Failed to add the category to database.";
        }

        res.json({
          category: category,
          error: error
        });
      });
    }
    else {
      category = null;
      error = "Invalid category.";

      res.json({
        category: category,
        error: error
      });
    }
});

/**
   * Parse the request.body and return a new phrase.
   * @param body
   * @return {Category}
   */
function getCategoryFromBody ( body) {
  const id = typeof body.id !== "undefined" ? parseInt(body.id, 10) : -1;
  const name = body.name || "";
  const colour = body.colour || "";

  return new Category(id, name, colour);
}

module.exports = router;
