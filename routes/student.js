const router = require('express').Router();
const Student = require('../db/models/students');

router.get("/student", function(req, res, next) {
  console.log(req, res);
  res.json("hello");
});

module.exports = router;
