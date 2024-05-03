'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nível: {
        allowNull: false,
        type: Sequelize.STRING
      },
      duracao: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      professorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Professores',
          key: 'id'
        }
      },
      materiaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Materias',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cursos');
  }
};