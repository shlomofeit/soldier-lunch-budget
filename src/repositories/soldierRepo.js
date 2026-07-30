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
  updateRecord: async (soldierId, obj) => {
    const result = await collection.findOneAndUpdate({ soldierId }, obj);
    if (result.modifiedCount > 0) {
      return true;
    }
    return false;
  },
};
