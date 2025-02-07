import { Sequelize } from "sequelize";
import { initAluno } from "../models/Aluno";
import { initUser } from "../models/User";
import { initFoto } from "../models/Foto";
import databaseConfig from "../config/database";

const models = [initAluno, initUser, initFoto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model(connection));

Object.values(connection.models).forEach((model: any) => {
  if (model.associate) {
    model.associate(connection.models);
  }
});
