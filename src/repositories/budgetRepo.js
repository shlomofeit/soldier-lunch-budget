import { budgetPool, transactionPool } from "../db/benefitDb.js";

export async function insertAllocation(obj) {
  const { unit, benefitType, month, allocatedAmount } = obj;
  const [result] = await budgetPool.execute(
    "INSERT INTO allocations (unit, benefitType, month, allocatedAmount) VALUES (?, ?, ?, ?)",
    [unit, benefitType, month, allocatedAmount],
  );
  return result.insertId;
}
