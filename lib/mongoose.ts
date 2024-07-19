// lib/mongoose.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', false);

  if (!process.env.MONGO_URL) {
    console.log('MONGODB_URL is not defined');
    return;
  }

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};
