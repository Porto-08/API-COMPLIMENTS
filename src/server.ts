import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
import 'express-async-errors'
import "./database";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

// middleware para a captura de erro
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // verificando see o erro foi tratado pela nossa aplicação ou não
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);
app.listen(3333, () => console.log("Server is Running"));
