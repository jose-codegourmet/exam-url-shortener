import cors from "cors";
import dotenv from "dotenv";
import express, { type Express } from "express";
import encodeRouter from "./routes/encode.route";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/hello", (_req, res) => {
	res.json({ message: "hello world" });
});

app.use("/encode", encodeRouter);

export const server = app;
