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
    const error = new Error("connection to mongoDB atlas faild");
    error.status = 502;
    throw error;
  }
}

// const BenefitPreriod = {
//   startDate: String,
//   endDate: String,
//   decisionReason: String,
//   budgetApproved: Boolean,
//   benefitType: String, //enum
//   details: Object,
// };

// const giftcard = {
//   cardProvider: String,
//   monthlyValue: Number,
//   validMerchants: String, //String[] לבדוק מה זה אומר
// };

// const diningHall = {
//   baseId: Number || ObjectId,
//   kosherLevel: String,
//   mealTimes: String, //גם פה לבדוק String[]
// };
