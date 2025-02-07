"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);
exports.default = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
            return cb(new multer_1.default.MulterError("LIMIT_UNEXPECTED_FILE", "Arquivo precisa ser PNG ou JPEG"));
        }
        cb(null, true);
    },
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, (0, path_1.resolve)(__dirname, "..", "..", "..", "uploads", "images"));
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${aleatorio()}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
};
