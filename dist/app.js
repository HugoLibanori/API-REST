"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
require("./src/database");
const express_1 = __importDefault(require("express"));
const homeRoutes_1 = __importDefault(require("./src/routes/homeRoutes"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const tokenRoutes_1 = __importDefault(require("./src/routes/tokenRoutes"));
const alunoRoutes_1 = __importDefault(require("./src/routes/alunoRoutes"));
const fotoRoutes_1 = __importDefault(require("./src/routes/fotoRoutes"));
const whiteList = ["http://localhost:3000", "http://18.228.219.208"];
const corsOptions = {
    origin: (origin, cb) => {
        if (whiteList.indexOf(origin || "") !== -1 || !origin) {
            cb(null, true);
        }
        else {
            cb(new Error("Not allowed by CORS"));
        }
    },
};
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use("/images/", express_1.default.static((0, path_1.resolve)(__dirname, "..", "uploads", "images")));
    }
    routes() {
        this.app.use("/", homeRoutes_1.default);
        this.app.use("/users", userRoutes_1.default);
        this.app.use("/tokens", tokenRoutes_1.default);
        this.app.use("/alunos", alunoRoutes_1.default);
        this.app.use("/fotos", fotoRoutes_1.default);
    }
}
exports.default = new App().app;
