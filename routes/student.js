const router = require('express').Router();
const Student = require('../db/models/students');

router.get("/student", function(req, res, next) {
  Student.findAll().then(students => res.json(students));
});

router.get("/student/:id", function(req, res, next) {
  let targetId = req.params.id;

  Student.findById(targetId).then(function(student) {
    if (!student) {
      res.status(404).send("Not Found");
    }
    else {
      res.json(student);
    }
  });

});

router.post("/student", function(req, res, next) {
  Student.create(req.body).then(savedStudent => res.json(savedStudent)).catch(err => console.log(err));
});

module.exports = router;
