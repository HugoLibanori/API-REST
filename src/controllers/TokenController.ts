import "dotenv/config";
import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

class TokenControler {
  async create(req: Request, res: Response): Promise<Response> {
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
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ Errors: ["Usuário inexistente!"] });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({ Errors: ["Senha inválida!"] });
    }

    const { id } = user;

    const token = jwt.sign({ id, email }, tokenSecret, {
      expiresIn: Number(tokenExpiration),
    });
    return res.json({ token });
  }
}

export default new TokenControler();
