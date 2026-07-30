import soldierRepo from "../repositories/soldierRepo.js";
import {
  giftCardSchema,
  diningHallSchema,
  patchGiftCardBenefitValidation,
  patchDiningHallBenefitValidation,
} from "../zodValidations.js";

const BENEFIT_TYPE = ["giftCard", "diningHall"];
const rightNow = new Date();
let isoTime = rightNow.toISOString();
const time = new Date().toTimeString(); // לבדוק

// export async function soldierService(soldierRepo) {

// }

export async function addBenefitService(soldierId, obj) {
  let error;
  let schemaToCheck;
  if (obj.benefitType === "giftCard") {
    schemaToCheck = giftCardSchema.safeParse(obj);
  } else if (obj.benefitType === "diningHall") {
    schemaToCheck = diningHallSchema.safeParse(obj); // לסדר את הסכמה
  } else {
    error = new Error("Invalid benefit type");
    error.status = 400;
    throw error;
  }
  if (!schemaToCheck.success) {
    // console.log(schemaToCheck);

    error = new Error(schemaToCheck.error.message);
    error.status = 400;
    throw error;
    // console.log(typeof schemaToCheck.error.message);

    // process.exit(1);
  }

  const {
    unit,
    benefitType,
    details,
    decisionReason,
    budgetApproved,
    startDate,
  } = obj;

  const period = {
    benefitType,
    details,
    decisionReason,
    budgetApproved,
    startDate: startDate || time,
    endDate: null,
  };

  let history;
  // #*&$%$*# לבדוק אם זה הכוונה או שמספיק אם נמצא או לא #*&$%$*#
  const existing = await soldierRepo.getRecordBySoldierId(soldierId);
  if (existing) {
    const lenOfHistory = existing.history.length;
    if (existing.history[lenOfHistory - 1].budgetApproved === true) {
      error = new Error("An active benefit record exists");
      error.status = 409;
    }
    history = existing.history;
    history.push(period);
  }

  if (error) {
    throw error;
  }

  if (existing) {
    const result = await soldierRepo.updateRecord(soldierId, {
      history,
      currentBenefitType: benefitType,
    });
  } else {
    const result = await soldierRepo.createRecord({
      soldierId,
      unit,
      currentBenefitType: benefitType,
      history: history || [period],
    });
  }

  return {
    soldierId,
    unit,
    currentBenefitType: benefitType,
    history: [period],
  };
}

export async function getBenefits(soldierId) {
  const result = await soldierRepo.getRecordBySoldierId(soldierId);
  return result || null;
}

export async function updateBenefit(soldierId, obj) {
  const existing = await soldierRepo.getRecordBySoldierId(soldierId);
  if (!existing) {
    const error = new Error(`soldierId (${soldierId}) not found`);
    error.status = 404;
    throw error;
  }

  if (obj.benefitType === "giftCard") {
    schemaToCheck = patchGiftCardBenefitValidation.safeParse(obj);
  } else if (obj.benefitType === "diningHall") {
    schemaToCheck = patchDiningHallBenefitValidation.safeParse(obj); // לסדר את הסכמה
  } else {
    error = new Error("Invalid benefit type");
    error.status = 400;
    throw error;
  }
  if (!schemaToCheck.success) {
    error = new Error(schemaToCheck.error.message);
    error.status = 400;
    throw error;
  }

  const { benefitType, details, decisionReason, budgetApproved, decisionDate } =
    obj;

  let startDate = null;
  if (data.startDate) {
    startDate = time;
  }

  existing.benefitType = benefitType;
  existing.currentBenefitType = time;
  existing.budgetApproved = budgetApproved;
  existing.history[benefit.history.length - 1].endDate = time;
  existing.details.push({
    startDate: decisionDate || time,
    endDate: null,
    decisionReason,
    budgetApproved,
    benefitType,
    details,
  });
  await soldierRepo.updateRecord(soldierId, existing);
}
