import soldierRepo from "../repositories/soldierRepo.js";
import { giftCardSchema, diningHallSchema } from "../zodValidations.js";

const BENEFIT_TYPE = ["giftCard", "diningHall"];
const rightNow = new Date();
let isoTime = rightNow.toISOString();
const time = new Date().toTimeString(); // לבדוק

// export async function soldierService(soldierRepo) {

// }

export async function addBenefitService(soldierId, obj) {
  console.log(obj);

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
    console.log(schemaToCheck.error);

    error = new Error(schemaToCheck.error.errors[0].message);
    error.status = 400;
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

  // #*&$%$*# לבדוק אם זה הכוונה או שמספיק אם נמצא או לא #*&$%$*#
  const existing = await getRecordBySoldierId(soldierId);
  if (existing) {
    const lenOfHistory = existing.history.length;
    if (existing.history[lenOfHistory - 1].budgetApproved === true) {
      error = new Error("An active benefit record exists");
      error.status = 409;
    }
    const history = existing.history;
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
  const result = await getRecordBySoldierId(soldierId);
  return result;
}
