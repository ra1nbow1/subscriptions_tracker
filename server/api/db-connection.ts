import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectToDatabase = async (): Promise<void> => {
	await mongoose.connect(process.env.MONGO_URI as string)
	console.log('Backend connected to database')
}

export { connectToDatabase }
