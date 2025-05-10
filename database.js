import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from "dotenv";

dotenv.config();
const dbName = process.env.MONGO_DB_NAME;
const user= process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;
const cluster = process.env.MONGO_DB_CLUSTER;
const appName= process.env.MONGO_DB_APPNAME;

const connectionUrl = `mongodb+srv://
${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=${appName}`

const connect = async () => {
  try {
    console.log("NODE_ENV: -" + process.env.NODE_ENV +"-", typeof process.env.NODE_ENV)
    if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV.toString() === 'test') {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri(), {dbName: dbName});
      console.log('connected to in memory db');
    }
    else {
      await mongoose.connect(connectionUrl);
      console.log('- Connected to MongoDB server');
    }
  } catch (error) {
    console.log('- Connection error', error);
    throw(error);
  }
}
export default connect;