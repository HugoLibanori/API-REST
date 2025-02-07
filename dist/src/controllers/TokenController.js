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
require("dotenv/config");
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenControler {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email = "", password = "" } = req.body;
            const tokenSecret = process.env.TOKEN_SECRET;
            const tokenExpiration = process.env.TOKEN_EXPIRATION;
            if (!tokenSecret || !tokenExpiration) {
                return res.status(500).json({
                    Errors: [
                        "Erro no servidor: TOKEN_SECRET ou TOKEN_EXPIRATION não definidas",
                    ],
                });
            }
            if (!email || !password) {
                return res
                    .status(401)
                    .json({ Errors: ["E-mail ou senha não informados!"] });
            }
            const user = yield User_1.default.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ Errors: ["Usuário inexistente!"] });
            }
            if (!(yield user.passwordIsValid(password))) {
                return res.status(401).json({ Errors: ["Senha inválida!"] });
            }
            const { id } = user;
            const token = jsonwebtoken_1.default.sign({ id, email }, tokenSecret, {
                expiresIn: Number(tokenExpiration),
            });
            return res.json({ token });
        });
    }
}
exports.default = new TokenControler();
