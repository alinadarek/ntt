const { DataTypes } = require('sequelize');

const SchModel = {
  name: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  doc: { type: DataTypes.STRING, allowNull: false },
  active: { type: DataTypes.BOOLEAN, allowNull: true, default: false },
};

module.exports = (sequelize) => sequelize.define('scheduler', SchModel);