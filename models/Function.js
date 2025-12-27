const { DataTypes } = require('sequelize');

const FnModel = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  lib: { type: DataTypes.STRING, allowNull: false, references: {model: "libraries", key: "name"} },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  doc: { type: DataTypes.STRING, allowNull: false },
  args: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.STRING, allowNull: false },
};

module.exports = (sequelize) => sequelize.define('function', FnModel);