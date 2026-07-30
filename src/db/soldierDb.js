import { MongoClient } from "mongodb";
// import dotenv from "dotenv";

// dotenv.config();

const client = new MongoClient(
  "mongodb://shlomo:5z8EhFXnW57aiD_@ac-mdjfqmc-shard-00-00.xlk3qfb.mongodb.net:27017,ac-mdjfqmc-shard-00-01.xlk3qfb.mongodb.net:27017,ac-mdjfqmc-shard-00-02.xlk3qfb.mongodb.net:27017/?ssl=true&replicaSet=atlas-wc5twk-shard-0&authSource=admin&appName=benefitsDB",
); //process.env.MONGODB_URI);

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
