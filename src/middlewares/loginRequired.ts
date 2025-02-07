import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (
  req: Request & { userId?: number; userEmail?: string },
  res: Response,
  next: NextFunction
) => {
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
    const dados = jwt.verify(token, tokenSecret);
    const { id, email } = dados as { id: number; email: string };

    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      return res.status(401).json({ Errors: ["Usuário inválido!"] });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e: any) {
    console.error(e);
    return res.status(401).json({ Errors: ["Token expirado ou inválido!"] });
  }
};
