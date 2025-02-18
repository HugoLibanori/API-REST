import { Request, Response } from "express";
import Aluno from "../models/Aluno";
import Foto from "../models/Foto";

class AlunoControler {
  async index(req: Request, res: Response): Promise<void> {
    const alunos = await Aluno.findAll({
      attributes: [
        "id",
        "nome",
        "sobrenome",
        "email",
        "idade",
        "peso",
        "altura",
      ],
      order: [
        ["id", "DESC"],
        [Foto, "id", "DESC"],
      ],
      include: {
        model: Foto,
        attributes: ["url", "filename"],
      },
    });
    res.json(alunos);
    return;
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const aluno = await Aluno.create(req.body);
      res.json(aluno);
      return;
    } catch (e: any) {
      res.status(400).json({ Errors: e.errors.map((e: any) => e.message) });
      return;
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ Errors: ["Id nao informado"] });
        return;
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        res.status(400).json({ Errors: ["Aluno não existe!"] });
        return;
      }

      const novoAluno = await aluno.update(req.body);
      res.json(novoAluno);
      return;
    } catch (e: any) {
      res.status(400).json({ Errors: e.errors.map((e: any) => e.message) });
      return;
    }
  }

  async show(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ Errors: ["Id nao informado"] });
        return;
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: [
          "id",
          "nome",
          "sobrenome",
          "email",
          "idade",
          "peso",
          "altura",
        ],
        order: [
          ["id", "DESC"],
          [Foto, "id", "DESC"],
        ],
        include: {
          model: Foto,
          attributes: ["url", "filename"],
        },
      });

      if (!aluno) {
        res.status(400).json({ Errors: ["Aluno não existe!"] });
        return;
      }
      res.json(aluno);
      return;
    } catch (e: any) {
      res.status(400).json({ Errors: e.errors.map((e: any) => e.message) });
      return;
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ Errors: ["Id nao informado"] });
        return;
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        res.status(400).json({ Errors: ["Aluno não existe!"] });
        return;
      }

      await aluno.destroy();
      res.json({ message: ["✅ Aluno deletado com sucesso!"] });
      return;
    } catch (e: any) {
      res.status(400).json({ Errors: e.errors.map((e: any) => e.message) });
      return;
    }
  }
}

export default new AlunoControler();
