import { Request, Response } from "express";
import Aluno from "../models/Aluno";
import Foto from "../models/Foto";

class AlunoControler {
  async index(req: Request, res: Response): Promise<Response> {
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
    return res.json(alunos);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const aluno = await Aluno.create(req.body);
      return res.json(aluno);
    } catch (e: any) {
      return res
        .status(400)
        .json({ Errors: e.errors.map((e: any) => e.message) });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ Errors: ["Id nao informado"] });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ Errors: ["Aluno não existe!"] });
      }

      const novoAluno = await aluno.update(req.body);
      return res.json(novoAluno);
    } catch (e: any) {
      return res
        .status(400)
        .json({ Errors: e.errors.map((e: any) => e.message) });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ Errors: ["Id nao informado"] });
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
        return res.status(400).json({ Errors: ["Aluno não existe!"] });
      }
      return res.json(aluno);
    } catch (e: any) {
      return res
        .status(400)
        .json({ Errors: e.errors.map((e: any) => e.message) });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ Errors: ["Id nao informado"] });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ Errors: ["Aluno não existe!"] });
      }

      await aluno.destroy();
      return res.json({ message: ["✅ Aluno deletado com sucesso!"] });
    } catch (e: any) {
      return res
        .status(400)
        .json({ Errors: e.errors.map((e: any) => e.message) });
    }
  }
}

export default new AlunoControler();
