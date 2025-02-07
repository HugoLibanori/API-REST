"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAluno = initAluno;
const sequelize_1 = require("sequelize");
class Aluno extends sequelize_1.Model {
    static associate(models) {
        Aluno.hasMany(models.Foto, { foreignKey: "aluno_id" });
    }
}
exports.default = Aluno;
function initAluno(sequelize) {
    Aluno.init({
        nome: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "",
            validate: {
                len: {
                    args: [3, 255],
                    msg: "O campo nome deve ter entre 3 e 255 caracteres",
                },
            },
        },
        sobrenome: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "",
            validate: {
                len: {
                    args: [3, 255],
                    msg: "O campo sobrenome deve ter entre 3 e 255 caracteres",
                },
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "",
            unique: { name: "email", msg: "E-mail já cadastrado!" },
            validate: {
                isEmail: {
                    msg: "E-mail inválido!",
                },
            },
        },
        idade: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: "",
            validate: {
                isInt: {
                    msg: "Idade precisa ser um número inteiro!",
                },
            },
        },
        peso: {
            type: sequelize_1.DataTypes.FLOAT,
            defaultValue: "",
            validate: {
                isFloat: {
                    msg: "Peso precisa ser um número!",
                },
            },
        },
        altura: {
            type: sequelize_1.DataTypes.FLOAT,
            defaultValue: "",
            validate: {
                isFloat: {
                    msg: "Altura precisa ser um número!",
                },
            },
        },
    }, {
        sequelize,
        modelName: "Aluno",
    });
}
