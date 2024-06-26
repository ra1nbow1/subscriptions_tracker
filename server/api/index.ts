import express from 'express'
import userRoutes from './routes/user.routes'
import dotenv from 'dotenv';
import { connectToDatabase } from './db-connection';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser"


dotenv.config()
connectToDatabase()
const app = express()

app.use(express.json())
app.use('/', userRoutes())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.API_PORT

app.listen(port, () => {
    console.log(`Бэкенд запущен на ${port} порту`);
})
