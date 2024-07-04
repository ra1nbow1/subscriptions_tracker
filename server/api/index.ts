import express from 'express'
import userRoutes from './routes/user.routes'
import dotenv from 'dotenv'
import { connectToDatabase } from './db-connection'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
connectToDatabase()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/', userRoutes())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

const port = 5555

app.listen(port, () => {
	console.log(`Бэкенд запущен на ${port} порту`)
})
