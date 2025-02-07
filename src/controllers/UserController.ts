import { Request, Response } from "express";
import User from "../models/User";

class UserControler {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const novoLuno = await User.create(req.body);
      const { id, nome, email } = novoLuno;
      return res.json({ id, nome, email });
    } catch (e: any) {
      return res
        .status(400)
        .json({ Errors: e.errors.map((e: any) => e.message) });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.findAll({ attributes: ["id", "nome", "email"] });

      return res.json(users);
    } catch (e: any) {
      return res
        .status(400)
        .json({ Errors: e.errors.map((e: any) => e.message) });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ Errors: ["Usuário não existe!"] });
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e: any) {
      return res
        .status(400)
        .json({ Errors: e.errors.map((e: any) => e.message) });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ Errors: ["Usuário não existe!"] });
      }

      const { id, nome, email } = user;

      await user.destroy();
      return res.json({ id, nome, email });
    } catch (e: any) {
      return res
        .status(400)
        .json({ Errors: e.errors.map((e: any) => e.message) });
    }
  }
}

export default new UserControler();
