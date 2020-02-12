
'use strict';
var crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password : DataTypes.STRING,
    MobileNo : DataTypes.STRING,
    CreatedAt: "DATETIME",
    CreatedBy: DataTypes.INTEGER,
    ModifiedAt: "DATETIME",
    ModifiedBy: DataTypes.INTEGER,
    IsActive: DataTypes.TINYINT 
  }, {
    tableName: 'tblUser',
    timestamps: false,

  });
    User.associate = function (models) {
    
  };
  return User;
};