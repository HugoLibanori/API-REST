"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FotoController_1 = __importDefault(require("../controllers/FotoController"));
const loginRequired_1 = __importDefault(require("../middlewares/loginRequired"));
const router = (0, express_1.Router)();
router.post("/", loginRequired_1.default, FotoController_1.default.store);
exports.default = router;
