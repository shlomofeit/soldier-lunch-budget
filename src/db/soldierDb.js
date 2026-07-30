import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

export async function mongoConnection() {
  try {
    await client.connect();
    const db = client.db("soldierBenefits");
    console.log("MongoDB successfully connected...");
    return db;
  } catch (error) {
    error = new Error("connection to mongoDB atlas faild");
    error.status = 502;
    throw error;
  }
}

await mongoConnection();
