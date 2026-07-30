import { supaConnection } from "../db/benefitDb.js";

const supa = await supaConnection();

export default {
  create: async (obj) => {
    const { data, error } = await supa
      .from("transactions")
      .insert(obj)
      .select("*");
    if (!error) {
      return data;
    }
    return false;
  },
  findById: async (budgetId) => {
    const { data, error } = await supa
      .from("transactions")
      .select("*")
      .eq("budgetId", budgetId);
    if (!error) {
      return data;
    }
    return false;
  },
};
