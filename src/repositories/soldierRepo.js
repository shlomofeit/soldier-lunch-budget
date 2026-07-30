import { mongoConnection } from "../db/soldierDb.js";

const db = await mongoConnection();
const collection = await db.collection("benefits");

export default {
  createRecord: async (obj) => {
    const result = await collection.insertOne(obj);
    return result.insertedId.toString();
  },

  findRecord: async (obj) => {
    const result = await collection.findOne(obj);
    return result || null;
  },
};

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
