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

router.put("/student/:id", function(req, res, next) {
  let targetId = req.params.id;
  let infoToUpdate = req.body;

  Student.update(infoToUpdate, {
    where: {id: targetId},
    returning: true,
    plain: true
  }).spread((numRows, affectedRows) => {
    res.status(201).send(affectedRows);
  });

  // Find by student id
  // Use instance method update throw in the req.body
  // res send 201 and yeah;

});

router.delete("/student/:id", function(req, res, next) {
  let targetId = req.params.id;

  Student.destroy({
    where: {
      id: targetId
  }
}).then(destroyedStudent => res.status(204).send("Success"));

})

module.exports = router;
