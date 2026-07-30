import express from "express";
import { addBenefitService, getBenefits } from "../services/soldierService.js";

export async function createBenefit(req, res, next) {
  try {
    const soldier = req.params.soldierId;
    const bodyreq = req.body;
    const result = await addBenefitService(soldier, bodyreq);

    return res.status(201).json({ success: true, message: result });
  } catch (error) {
    // console.error(error);
    next(error);
  }
}

export async function getSoldierB(req, res, next) {
  try {
    const soldier = req.params.soldierId;
    const result = await getBenefits(soldier);
    if (result) return res.status(200).json({ success: true, message: result });
    return res.status(404).json({ success: false, message: "no records" });
  } catch (error) {
    next(error);
  }
}
