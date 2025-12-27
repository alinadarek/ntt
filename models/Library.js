const { DataTypes } = require('sequelize');

const LibModel = {
  name: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  doc: { type: DataTypes.STRING, allowNull: false }
};

module.exports = (sequelize) => sequelize.define('library', LibModel);