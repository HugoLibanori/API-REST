import { Router } from "express";
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.get("/", userController.index as any);

router.post("/", userController.create as any);
router.put("/", loginRequired as any, userController.update as any);
router.delete("/", loginRequired as any, userController.delete as any);

export default router;
