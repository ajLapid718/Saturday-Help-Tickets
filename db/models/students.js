'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {

  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  fullName: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
    }
  }

});

Student.addHook('beforeSave', (student, options) => {
  student.firstName = student.firstName[0].toUpperCase() + student.firstName.slice(1);
  student.lastName = student.lastName[0].toUpperCase() + student.lastName.slice(1);
});

Student.prototype.initials = function() {
  let firstInitial = this.firstName[0];
  let secondInitial = this.lastName[0];
  return firstInitial + " " + secondInitial;
};

module.exports = Student;
