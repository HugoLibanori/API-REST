import { Router } from "express";
import tokenController from "../controllers/TokenController";

const router = Router();

router.post("/", tokenController.create as any);

export default router;
