
'use strict';
var crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define('Bookings', {
    SlotId: DataTypes.INTEGER,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Gender: DataTypes.INTEGER,
    Age: DataTypes.INTEGER,
    CreatedAt: "DATETIME",
    CreatedBy: DataTypes.INTEGER,
    ModifiedAt: "DATETIME",
    ModifiedBy: DataTypes.INTEGER,
    IsActive: DataTypes.TINYINT 
  }, {
    tableName: 'tblbookings',
    timestamps: false,


  });
  Bookings.associate = function (models) {
    Bookings.belongsTo(models.Slots, { foreignKey: 'SlotId', });
  };
  return Bookings;
};