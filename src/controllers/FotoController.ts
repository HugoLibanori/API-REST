import { Request, Response } from "express";
import multer from "multer";

import Foto from "../models/Foto";

import multerConfig from "../config/multer";
const upload = multer(multerConfig).single("file");

class FotoControler {
  async store(req: Request, res: Response): Promise<void> {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ errors: [err.message] });
      }

      if (!req.file) {
        return res.status(400).json({ errors: ["Arquivo não informado"] });
      }

      const { originalname, filename } = req.file;

      const { aluno_id } = req.body;

      try {
        const foto = await Foto.create({
          originalname,
          filename,
          aluno_id,
        });

        return res.json(foto);
      } catch (e: any) {
        console.log(e);
        return res.status(500).json({ errors: ["Aluno não existe!"] });
      }
    });
  }
}

export default new FotoControler();
