import { Router } from "express";

import fotoController from "../controllers/FotoController";

import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.post("/", loginRequired as any, fotoController.store as any);

export default router;
