import { Request, Response } from "express";
import User from "../models/User";

class UserControler {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const novoLuno = await User.create(req.body);
      const { id, nome, email } = novoLuno;
      res.json({ id, nome, email });
      return;
    } catch (e: any) {
      res.status(400).json({ Errors: e.errors.map((e: any) => e.message) });
    }
    return;
  }

  async index(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.findAll({ attributes: ["id", "nome", "email"] });

      res.json(users);
      return;
    } catch (e: any) {
      res.status(400).json({ Errors: e.errors.map((e: any) => e.message) });
    }
    return;
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        res.status(400).json({ Errors: ["Usuário não existe!"] });
        return;
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      res.json({ id, nome, email });
      return;
    } catch (e: any) {
      res.status(400).json({ Errors: e.errors.map((e: any) => e.message) });
      return;
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        res.status(400).json({ Errors: ["Usuário não existe!"] });
        return;
      }

      const { id, nome, email } = user;

      await user.destroy();
      res.json({ id, nome, email });
      return;
    } catch (e: any) {
      res.status(400).json({ Errors: e.errors.map((e: any) => e.message) });
      return;
    }
  }
}

export default new UserControler();
