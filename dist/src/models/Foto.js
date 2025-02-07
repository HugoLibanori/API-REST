"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFoto = initFoto;
const sequelize_1 = require("sequelize");
const appConfig_1 = __importDefault(require("../config/appConfig"));
class Foto extends sequelize_1.Model {
    static associate(models) {
        Foto.belongsTo(models.Aluno, { foreignKey: "aluno_id" });
    }
}
exports.default = Foto;
function initFoto(sequelize) {
    Foto.init({
        originalname: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "",
            validate: {
                notEmpty: {
                    msg: "O campo não pode ficar vazio.",
                },
            },
        },
        filename: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "",
            validate: {
                notEmpty: {
                    msg: "O campo não pode ficar vazio.",
                },
            },
        },
        url: {
            type: sequelize_1.DataTypes.VIRTUAL,
            get() {
                return `${appConfig_1.default.url}/images/${this.getDataValue("filename")}`;
            },
        },
    }, {
        sequelize,
        modelName: "Foto",
    });
    return Foto;
}
