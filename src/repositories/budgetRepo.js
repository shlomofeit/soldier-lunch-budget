import { supaConnection } from "../db/benefitDb.js";

//con
const supa = await supaConnection();

const repo = {
  create: async (obj) => {
    const { data, error } = await supa
      .from("allocations")
      .insert(obj)
      .select("*");
    if (!error) return data;
    return false;
  },
  findById: async (id) => {
    const { data, error } = await supa
      .from("allocations")
      .select("*")
      .eq("id", id);
    if (!error) {
      return data;
    }
    return false;
  },

  find: async (unit = null, month = null, benefitType = null) => {
    let result = supa.from("allocations").select("*");
    if (unit) {
      result = query.eq("unit", unit);
    }
    if (month) {
      result = query.eq("month", month);
    }
    if (benefitType) {
      result = query.eq("benefitType", benefitType);
    }

    const { data, error } = await result;
    if (!error) {
      return data;
    }
    return false;
  },
};

export default repo;
