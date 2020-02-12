
'use strict';
var crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const Slots = sequelize.define('Slots', {
    Name: DataTypes.STRING,
    Description: DataTypes.STRING,
    Status: DataTypes.INTEGER,
    CreatedAt: "DATETIME",
    CreatedBy: DataTypes.INTEGER,
    ModifiedAt: "DATETIME",
    ModifiedBy: DataTypes.INTEGER,
    IsActive: DataTypes.TINYINT
  }, {
    tableName: 'tblslots',
    timestamps: false
  });
  Slots.associate = function (models) {
  };
  return Slots;
}; 