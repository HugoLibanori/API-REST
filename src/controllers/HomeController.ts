import { Request, Response } from "express";

class HomeControler {
  async index(req: Request, res: Response): Promise<Response> {
    return res.json("Index");
  }
}

export default new HomeControler();
