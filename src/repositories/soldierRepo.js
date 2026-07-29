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

export async function createRecord(welfareRecord) {
  try {
    const result = await Benefit_records.insertOne(welfareRecord);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateRecord(soldierId, obj) {
  try {
    const result = await Benefit_records.findOneAndUpdate(
      { soldierId: soldierId },
      obj,
    );
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getRecordBySoldierId(soldierId) {
  try {
    const id = new ObjectId(recordId);
    const result = await Benefit_records.findOne({ soldierId: soldierId });
    return result;
  } catch (error) {
    throw error;
  }
}
