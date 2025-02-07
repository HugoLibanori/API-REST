import { Router } from "express";
import alunoController from "../controllers/AlunoController";

import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.get("/", alunoController.index as any);
router.post("/", loginRequired as any, alunoController.create as any);
router.put("/:id", loginRequired as any, alunoController.update as any);
router.get("/:id", alunoController.show as any);
router.delete("/:id", loginRequired as any, alunoController.delete as any);

export default router;
