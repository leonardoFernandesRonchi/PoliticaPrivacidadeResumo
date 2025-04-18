const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Politica = sequelize.define('Politica', {
  texto: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'politicas'
});

module.exports = Politica;
