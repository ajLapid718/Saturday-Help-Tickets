const router = require('express').Router();
const Student = require('../db/models/students');

router.get("/student", function(req, res, next) {
  Student.findAll().then(function(students) {
    return res.json(students);
  }).catch(err => console.log(err));
})

module.exports = router;
