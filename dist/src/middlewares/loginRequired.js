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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
        return res.status(500).json({
            Errors: ["Erro no servidor: TOKEN_SECRET não foi definido!"],
        });
    }
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ Errors: ["Login obrigatório!"] });
    }
    const [, token] = authorization.split(" ");
    try {
        const dados = jsonwebtoken_1.default.verify(token, tokenSecret);
        const { id, email } = dados;
        const user = yield User_1.default.findOne({ where: { id, email } });
        if (!user) {
            return res.status(401).json({ Errors: ["Usuário inválido!"] });
        }
        req.userId = id;
        req.userEmail = email;
        return next();
    }
    catch (e) {
        console.error(e);
        return res.status(401).json({ Errors: ["Token expirado ou inválido!"] });
    }
});
