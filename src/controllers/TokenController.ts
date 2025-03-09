import "dotenv/config";
import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

class TokenControler {
  async create(req: Request, res: Response): Promise<void> {
    const { email = "", password = "" } = req.body;

    const tokenSecret = process.env.TOKEN_SECRET;
    const tokenExpiration = process.env.TOKEN_EXPIRATION;

    if (!tokenSecret || !tokenExpiration) {
      res.status(500).json({
        Errors: [
          "Erro no servidor: TOKEN_SECRET ou TOKEN_EXPIRATION não definidas",
        ],
      });
      return;
    }

    if (!email || !password) {
      res.status(401).json({ Errors: ["E-mail ou senha não informados!"] });
      return;
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ Errors: ["Usuário inexistente!"] });
      return;
    }

    if (!(await user.passwordIsValid(password))) {
      res.status(401).json({ Errors: ["Senha inválida!"] });
      return;
    }

    const { id } = user;

    const token = jwt.sign({ id, email }, tokenSecret, {
      expiresIn: Number(tokenExpiration),
    });
    res.json({ token, user: { nome: user.nome, id, email } });
    return;
  }
}

export default new TokenControler();
