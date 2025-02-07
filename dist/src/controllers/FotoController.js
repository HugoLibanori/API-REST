"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const Foto_1 = __importDefault(require("../models/Foto"));
const multer_2 = __importDefault(require("../config/multer"));
const upload = (0, multer_1.default)(multer_2.default).single("file");
class FotoControler {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(400).json({ errors: [err.message] });
                }
                if (!req.file) {
                    return res.status(400).json({ errors: ["Arquivo não informado"] });
                }
                const { originalname, filename } = req.file;
                const { aluno_id } = req.body;
                try {
                    const foto = yield Foto_1.default.create({
                        originalname,
                        filename,
                        aluno_id,
                    });
                    return res.json(foto);
                }
                catch (e) {
                    console.log(e);
                    return res.status(500).json({ errors: ["Aluno não existe!"] });
                }
            }));
        });
    }
}
exports.default = new FotoControler();
