'use strict';
const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./students');
const { Op } = Sequelize;

const Test = db.define('test', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },

  grade: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

});

Test.passing = function() {
  return Test.findAll({
    where: {
      grade: {
        [Op.gt]: 70
      }
    }
  });
};

Test.findBySubject = function(subj) {
  return Test.findAll({
    where: {
      subject: subj
    }
  })
};

Test.belongsTo(Student);

module.exports = Test;
