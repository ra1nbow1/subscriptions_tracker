import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectToDatabase = async (): Promise<void> => {

  await mongoose.connect(process.env.MONGO_URI as string)
  console.log('Бэкенд подключен к базе данных');
};

export { connectToDatabase };
