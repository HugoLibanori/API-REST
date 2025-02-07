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
const User_1 = __importDefault(require("../models/User"));
class UserControler {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoLuno = yield User_1.default.create(req.body);
                const { id, nome, email } = novoLuno;
                return res.json({ id, nome, email });
            }
            catch (e) {
                return res
                    .status(400)
                    .json({ Errors: e.errors.map((e) => e.message) });
            }
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.findAll({ attributes: ["id", "nome", "email"] });
                return res.json(users);
            }
            catch (e) {
                return res
                    .status(400)
                    .json({ Errors: e.errors.map((e) => e.message) });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findByPk(req.userId);
                if (!user) {
                    return res.status(400).json({ Errors: ["Usuário não existe!"] });
                }
                const novosDados = yield user.update(req.body);
                const { id, nome, email } = novosDados;
                return res.json({ id, nome, email });
            }
            catch (e) {
                return res
                    .status(400)
                    .json({ Errors: e.errors.map((e) => e.message) });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findByPk(req.userId);
                if (!user) {
                    return res.status(400).json({ Errors: ["Usuário não existe!"] });
                }
                const { id, nome, email } = user;
                yield user.destroy();
                return res.json({ id, nome, email });
            }
            catch (e) {
                return res
                    .status(400)
                    .json({ Errors: e.errors.map((e) => e.message) });
            }
        });
    }
}
exports.default = new UserControler();
