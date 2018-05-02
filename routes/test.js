const router = require('express').Router();
const Test = require('../db/models/tests');
const Student = require('../db/models/students');


router.get("/test", function(req, res, next) {
  Test.findAll().then(tests => res.json(tests));
});

router.get("/test/passing", function(req, res, next) {
  Test.passing().then(tests => res.send(tests));
});

router.get("/test/:id", function(req, res, next) {
  let targetId = req.params.id;
  Test.findById(targetId).then(test => res.json(test));
});

router.get("/test/subject/:subject", function(req, res, next) {
  Test.findBySubject(req.params.subject).then(tests => res.json(tests));
});

router.post("/test/student/:studentId", function(req, res, next) {
  let targetId = req.params.studentId;
  let newInfo = req.body;

  Test.create(newInfo).then(newTest => {
    newTest.studentId = Number(targetId);
    res.status(201).json(newTest);
  });
});

router.delete("/test/:id", function(req, res, next) {
  Test.destroy({
    where: {
      id: req.params.id
    }
  }).then(destroyedTest => res.status(204).json(destroyedTest));
});


module.exports = router;
