const router = require('express').Router();
const Student = require('../db/models/students');

router.get("/student", function(req, res, next) {
  Student.findAll().then(students => res.json(students));
});

router.get("/student/:id", function(req, res, next) {
  let targetId = req.params.id;
  Student.findById(targetId).then(student => res.json(student));
});

module.exports = router;
