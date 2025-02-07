// src/types/express.d.ts
import { LoginRequestBody } from "./request"; // Importando o tipo do corpo da requisição

declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
    userEmail?: string;
    body: LoginRequestBody; // Agora o body é tipado como LoginRequestBody
  }
}
