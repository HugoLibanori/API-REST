import { Request, Response } from "express";

class HomeControler {
  async index(req: Request, res: Response): Promise<void> {
    res.json("Index");
    return;
  }
}

export default new HomeControler();
