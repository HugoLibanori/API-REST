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
const Aluno_1 = __importDefault(require("../models/Aluno"));
const Foto_1 = __importDefault(require("../models/Foto"));
class AlunoControler {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const alunos = yield Aluno_1.default.findAll({
                attributes: [
                    "id",
                    "nome",
                    "sobrenome",
                    "email",
                    "idade",
                    "peso",
                    "altura",
                ],
                order: [
                    ["id", "DESC"],
                    [Foto_1.default, "id", "DESC"],
                ],
                include: {
                    model: Foto_1.default,
                    attributes: ["url", "filename"],
                },
            });
            return res.json(alunos);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aluno = yield Aluno_1.default.create(req.body);
                return res.json(aluno);
            }
            catch (e) {
                return res
                    .status(400)
                    .json({ Errors: e.errors.map((e) => e.message) });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ Errors: ["Id nao informado"] });
                }
                const aluno = yield Aluno_1.default.findByPk(id);
                if (!aluno) {
                    return res.status(400).json({ Errors: ["Aluno não existe!"] });
                }
                const novoAluno = yield aluno.update(req.body);
                return res.json(novoAluno);
            }
            catch (e) {
                return res
                    .status(400)
                    .json({ Errors: e.errors.map((e) => e.message) });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ Errors: ["Id nao informado"] });
                }
                const aluno = yield Aluno_1.default.findByPk(id, {
                    attributes: [
                        "id",
                        "nome",
                        "sobrenome",
                        "email",
                        "idade",
                        "peso",
                        "altura",
                    ],
                    order: [
                        ["id", "DESC"],
                        [Foto_1.default, "id", "DESC"],
                    ],
                    include: {
                        model: Foto_1.default,
                        attributes: ["url", "filename"],
                    },
                });
                if (!aluno) {
                    return res.status(400).json({ Errors: ["Aluno não existe!"] });
                }
                return res.json(aluno);
            }
            catch (e) {
                return res
                    .status(400)
                    .json({ Errors: e.errors.map((e) => e.message) });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ Errors: ["Id nao informado"] });
                }
                const aluno = yield Aluno_1.default.findByPk(id);
                if (!aluno) {
                    return res.status(400).json({ Errors: ["Aluno não existe!"] });
                }
                yield aluno.destroy();
                return res.json({ message: ["✅ Aluno deletado com sucesso!"] });
            }
            catch (e) {
                return res
                    .status(400)
                    .json({ Errors: e.errors.map((e) => e.message) });
            }
        });
    }
}
exports.default = new AlunoControler();
