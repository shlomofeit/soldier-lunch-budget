import express from "express";
import { addBenefitService } from "../services/soldierService.js";

export async function createBenefit(req, res, next) {
  try {
    const soldier = req.params.soldierId;
    const bodyreq = req.body;
    const result = await addBenefitService(soldier, bodyreq);
    console.log(req.body);
    return res.text(result);
  } catch (error) {
    console.error(error);
  }
}
