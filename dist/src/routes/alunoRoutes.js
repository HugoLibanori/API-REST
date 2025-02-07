"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AlunoController_1 = __importDefault(require("../controllers/AlunoController"));
const loginRequired_1 = __importDefault(require("../middlewares/loginRequired"));
const router = (0, express_1.Router)();
router.get("/", AlunoController_1.default.index);
router.post("/", loginRequired_1.default, AlunoController_1.default.create);
router.put("/:id", loginRequired_1.default, AlunoController_1.default.update);
router.get("/:id", AlunoController_1.default.show);
router.delete("/:id", loginRequired_1.default, AlunoController_1.default.delete);
exports.default = router;
