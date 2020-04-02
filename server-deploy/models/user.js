'use strict';

const { generatePassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'full_name is required' },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'email is required' },
        checkUnique(data) {
          return User.findOne({ where: { email: data } })
            .then(user => {
              if (user) {
                throw new Error('Email already used')
              }
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'password is required' },
        len: { args: [6], msg: 'minimum character is 6' }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        let pass = user.password
        let newPass = generatePassword(pass)
        user.password = newPass
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};