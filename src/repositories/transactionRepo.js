import { supaConnection } from "../db/benefitDb.js";

const supa = await supaConnection();

const transactionRepo = {
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

export default transactionRepo;
