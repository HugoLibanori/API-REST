import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (
  req: Request & { userId?: number; userEmail?: string },
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tokenSecret = process.env.TOKEN_SECRET;
  if (!tokenSecret) {
    res.status(500).json({
      Errors: ["Erro no servidor: TOKEN_SECRET não foi definido!"],
    });
    return;
  }

  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ Errors: ["Login obrigatório!"] });
    return;
  }

  const [, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, tokenSecret);
    const { id, email } = dados as { id: number; email: string };

    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      res.status(401).json({ Errors: ["Usuário inválido!"] });
      return;
    }

    req.userId = id;
    req.userEmail = email;
    next();
  } catch (e: any) {
    console.error(e);
    res.status(401).json({ Errors: ["Token expirado ou inválido!"] });
  }
};
