import { Router } from "express";

import fotoController from "../controllers/FotoController";

import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.post("/", loginRequired, fotoController.store);

export default router;
