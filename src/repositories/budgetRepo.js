import { supa } from "../db/benefitDb.js";

//con
await supa();

export default {
  insertAllocation: async (obj) => {
    const { data, error } = await supabase
      .from("allocations")
      .insert(obj)
      .select();
    if (!error) return data;
    return false;
  },
};
