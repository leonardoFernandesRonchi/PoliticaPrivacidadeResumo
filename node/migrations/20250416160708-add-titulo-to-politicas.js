// migrations/XXXXXXXXXXXXXX-add-titulo-to-politicas.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('politicas', 'titulo', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Sem título' // Valor padrão para registros existentes
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('politicas', 'titulo');
  }
};