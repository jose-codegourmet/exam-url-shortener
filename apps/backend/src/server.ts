import cors from "cors";
import dotenv from "dotenv";
import express, { type ErrorRequestHandler, type Express } from "express";
import authRouter from "./routes/auth.route";
import encodeRouter from "./routes/encode.route";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/hello", (_req, res) => {
	res.json({ message: "hello world" });
});

app.use("/", authRouter);
app.use("/encode", encodeRouter);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
	console.error(error);
	res.status(500).json({ error: "Internal server error" });
};

app.use(errorHandler);

export const server = app;
