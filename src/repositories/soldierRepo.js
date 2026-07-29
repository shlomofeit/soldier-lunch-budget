import mongoose from "mongoose";
import Benefit_records from "../db/soldierDb.js";

export async function createConnectionMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n\n\nconnect to ${process.env.MONGO_URI}...\n\n\n`);
  } catch (error) {
    console.error(error);
  }
}
await createConnectionMongo();

// לבדוק מה מחזיר מונגו כשאין תוצאה לחיפוש של אחד.
export async function createRecord(welfareRecord) {
  try {
    const checkDup = await getRecordBySoldierId(welfareRecord.soldierId);
    if (checkDup) {
      return null;
    }

    const [result] = await Benefit_records.insertOne(welfareRecord);
    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export async function getRecordBySoldierId(soldierId) {
  try {
    const id = new ObjectId(recordId);
    const [rows] = await Benefit_records.findOne({ soldierId: soldierId });
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function updateSoldier(params) {}
