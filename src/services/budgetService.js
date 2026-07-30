import { budgetSchema, spendSchema } from "../zodValidations.js";
import repo from "../repositories/budgetRepo.js";
import transactionRepo from "../repositories/transactionRepo.js";

export default function createBudgetService(budgetRepo, transactionRepo) {
  return {
    getBudgetB: async (data) => {
      const check = budgetSchema.safeParse(data);
      if (!check.success) {
        const error = new Error(check.error.issues[0].message);
        error.status = 400;
        throw error;
      }
      const { unit, benefitType, month, allocatedAmount } = data;
      const dupCheck = await budgetRepo.find(unit, month, benefitType);
      if (Array.isArray(dupCheck) && dupCheck.length !== 0) {
        const error = new Error(
          `An assignment already exists for this combination`,
        );
        error.status = 409;
        throw error;
      }
      const result = await budgetRepo.create({
        unit,
        benefitType,
        month,
        allocatedAmount,
      });
      return result;
    },

    createBudget: async (obj) => {
      const check = budgetSchema.safeParse(obj);
      if (!check.success) {
        const error = new Error(check.error.issues[0].message);
        error.status = 400;
        throw error;
      }
      const { unit, benefitType, month, allocatedAmount } = data;
      const dupCheck = await budgetRepo.find(unit, month, benefitType);
      if (Array.isArray(dupCheck) && dupCheck.length !== 0) {
        const error = new Error("assignment exists");
        error.status = 409;
        throw error;
      }
      const result = await repo.create({
        unit,
        benefitType,
        month,
        allocatedAmount,
      });
      return result;
    },
  };
}
