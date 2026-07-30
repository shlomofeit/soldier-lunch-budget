import express from "express";
import soldierService from "../services/soldierService.js";
import soldierRepo from "../repositories/soldierRepo.js";

const service = await soldierService(soldierRepo);

export async function createBenefit(req, res, next) {
  try {
    const soldier = req.params.soldierId;
    const bodyreq = req.body;
    const result = await service.addBenefitService(soldier, bodyreq);

    return res.status(201).json({ success: true, message: result });
  } catch (error) {
    // console.error(error);
    next(error);
  }
}

export async function getSoldierB(req, res, next) {
  try {
    const soldier = req.params.soldierId;
    const result = await service.getBenefits(soldier);
    if (result) return res.status(200).json({ success: true, message: result });
    return res.status(404).json({ success: false, message: "no records" });
  } catch (error) {
    next(error);
  }
}

export async function updateBenefit(req, res, next) {
  try {
    const soldier = req.params.soldierId;
    const bodyreq = req.body;
    const result = await service.updateBenefit(soldier, bodyreq);

    return res.status(200).json({ success: true, message: result });
  } catch (error) {
    next(error);
  }
}
