import createBudgetService from "../services/budgetService.js";
import budgetRepo from "../repositories/budgetRepo.js";
import transactionRepo from "../repositories/transactionRepo.js";

const service = createBudgetService(budgetRepo, transactionRepo);

export async function getBudget(req, res, next) {
  try {
    const result = await service.getBudgetB(req.query);
    return res.status(200).json({ success: true, message: result });
  } catch (error) {
    next(error);
  }
}

export async function addBudget(req, res, next) {
  try {
    const result = await service.createBudget(req.body);
    return res.status(201).json({ success: true, message: result });
  } catch (error) {
    next(error);
  }
}
