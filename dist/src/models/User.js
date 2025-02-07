"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUser = initUser;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    passwordIsValid(password) {
        if (!this.password_hash) {
            return Promise.resolve(false);
        }
        return bcryptjs_1.default.compare(password, this.password_hash);
    }
}
exports.default = User;
function initUser(sequelize) {
    User.init({
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
        password_hash: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "",
        },
        password: {
            type: sequelize_1.DataTypes.VIRTUAL,
            defaultValue: "",
            validate: {
                len: {
                    args: [6, 50],
                    msg: "A senha deve ter entre 6 e 50 caracteres",
                },
            },
        },
    }, {
        sequelize,
    });
    User.addHook("beforeSave", (user) => __awaiter(this, void 0, void 0, function* () {
        if (user.password) {
            user.password_hash = yield bcryptjs_1.default.hash(user.password, 8);
        }
    }));
}
