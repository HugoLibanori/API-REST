"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Aluno_1 = require("../models/Aluno");
const User_1 = require("../models/User");
const Foto_1 = require("../models/Foto");
const database_1 = __importDefault(require("../config/database"));
const models = [Aluno_1.initAluno, User_1.initUser, Foto_1.initFoto];
const connection = new sequelize_1.Sequelize(database_1.default);
models.forEach((model) => model(connection));
Object.values(connection.models).forEach((model) => {
    if (model.associate) {
        model.associate(connection.models);
    }
});
