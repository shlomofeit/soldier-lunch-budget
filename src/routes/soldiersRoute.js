import express from "express";
import {
  createBenefit,
  //updateSoldier,
} from "../controllers/soldierController.js";

const router = express.Router();

router.post("/:soldierId/benefits", createBenefit);

// router.patch("/soldiers/:soldierId/benefits", updateSoldier);

export default router;
