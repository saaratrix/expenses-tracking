var express = require("express");
var router = express.Router();

router.get("/get", function(req, res, next) {
  res.json({
    expenses: [
      {
        id: 0,
        description: "muumin"
      }
    ]
  });
});

module.exports = router;
