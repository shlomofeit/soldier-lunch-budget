import express from "express";
import { getBudget, addBudget } from "../controllers/budgetController.js";

const budgetRouter = express.Router();

budgetRouter.post("/", addBudget);

budgetRouter.get("/budget/:id/transactions");

budgetRouter.get("/", getBudget);

export default budgetRouter;
