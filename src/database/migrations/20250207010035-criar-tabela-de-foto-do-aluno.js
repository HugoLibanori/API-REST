"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("fotos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      originalname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      filename: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      aluno_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: "alunos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    return await queryInterface.dropTable("fotos");
  },
};
