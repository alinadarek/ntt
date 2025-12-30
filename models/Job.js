const { DataTypes } = require('sequelize');

const JobModel = {
  name: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  doc: { type: DataTypes.STRING, allowNull: false },
  sch: { type: DataTypes.STRING, allowNull: false },
  lib: { type: DataTypes.STRING, allowNull: false },
  fn: { type: DataTypes.STRING, allowNull: false },
  delay: { type: DataTypes.SMALLINT, allowNull: true },
  repeat_every: { type: DataTypes.SMALLINT, allowNull: true },
  repeat_limit: { type: DataTypes.SMALLINT, allowNull: true },
  cron: { type: DataTypes.STRING, allowNull: true },
};

module.exports = (sequelize) => sequelize.define('job', JobModel);