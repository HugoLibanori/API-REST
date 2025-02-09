import dotenv from "dotenv";
import { resolve } from "path";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";

dotenv.config();

import "./src/database";

import express, { Application } from "express";
import homeRoutes from "./src/routes/homeRoutes";
import userRoutes from "./src/routes/userRoutes";
import tokenRoutes from "./src/routes/tokenRoutes";
import alunoRoutes from "./src/routes/alunoRoutes";
import fotoRoutes from "./src/routes/fotoRoutes";

const whiteList = [
  "http://localhost:3000",
  "http://18.228.219.208",
  "http://localhost:5173",
  "http://189.4.225.20",
];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    cb: (_err: Error | null, _allow?: boolean) => void
  ) => {
    if (whiteList.indexOf(origin || "") !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
};

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.middleware();
    this.routes();
  }

  private middleware() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      "/images/",
      express.static(resolve(__dirname, "..", "uploads", "images"))
    );
  }

  private routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/tokens", tokenRoutes);
    this.app.use("/alunos", alunoRoutes);
    this.app.use("/fotos", fotoRoutes);
  }
}

export default new App().app;
