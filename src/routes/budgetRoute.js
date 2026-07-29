import express from "express";
import { addBudget, getBudget } from "../controllers/budgetController.js";

const router = express.Router();

router.post("/budget", addBudget);

router.get("/budget/:id/transactions");

router.get("/budget", getBudget);
