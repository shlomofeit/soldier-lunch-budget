import express from "express";
import {
  createBenefit,
  getSoldierB,
  updateBenefit,
} from "../controllers/soldierController.js";

const router = express.Router();

router.post("/:soldierId/benefits", createBenefit);

router.get("/:soldierId/benefits", getSoldierB);

router.patch("/soldiers/:soldierId/benefits", updateBenefit);

export default router;
