import dotenv from "dotenv";
import { resolve } from "path";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import delay from "express-delay";

dotenv.config();

import "./src/database";
import express, { Application } from "express";

import homeRoutes from "./src/routes/homeRoutes";
import userRoutes from "./src/routes/userRoutes";
import tokenRoutes from "./src/routes/tokenRoutes";
import alunoRoutes from "./src/routes/alunoRoutes";
import fotoRoutes from "./src/routes/fotoRoutes";

const whiteList: string[] = [];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    cb: (_err: Error | null, _allow?: boolean) => void
  ) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
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
    this.app.use(delay(2000));
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
