import express, { Express } from "express"
import dotenv from "dotenv"
import encodeRouter from './routes/encode.route'

dotenv.config()

const app: Express = express()

app.use(express.json())

app.use('/encode', encodeRouter)

export const server = app