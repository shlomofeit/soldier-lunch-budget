import {
  createRecord,
  getRecordBySoldierId,
  updateRecord,
} from "../repositories/soldierRepo.js";
import { z } from "zod";

const BENEFIT_TYPE = ["giftCard", "diningHall"];
const rightNow = new Date();
let isoTime = rightNow.toISOString();

const giftcardValid = z.object({
  cardProvider: z.string(),
  monthlyValue: z.number(),
  validMerchants: z.string(), //String[] לבדוק מה זה אומר
});

const diningHallValid = z.object({
  baseId: z.number(),
  kosherLevel: z.string(),
  mealTimes: z.string(), //גם פה לבדוק String[]
});
// export async function soldierService(soldierRepo) {

// }

export async function addBenefitService(soldierId, obj) {
  console.log(obj);

  const {
    unit,
    benefitType,
    details,
    decisionReason,
    budgetApproved,
    startDate,
  } = obj; //צריך לסדר את הבדיקה של budgetApproved
  //   if (typeof details !== )
  if (!unit || !benefitType || !details || !decisionReason) {
    const error = new Error("missing required items");
    error.status = 400;
  } else if (!BENEFIT_TYPE.includes(benefitType)) {
    const error = new Error(
      `benefit must be one of ${BENEFIT_TYPE.join(" or ")}`,
    );
    error.status = 400;
  } else if (typeof details !== "object") {
    const error = new Error("details must be an Object");
    error.status = 400;
  }

  const period = {
    benefitType,
    details,
    decisionReason,
    budgetApproved,
    startDate: startDate || isoTime,
    endDate: null,
  };

  if (benefitType === "giftCard") {
    const validGifcard = giftcardValid.safeParse(details);
    if (!validGifcard.success) {
      const error = new Error("invalid giftCard details");
      error.status = 400;
    }
  } else if (benefitType === "diningHall") {
    const validdiningHall = diningHallValid.safeParse(details);
    if (!validdiningHall.success) {
      const error = new Error("invalid diningHall details");
      error.status = 400;
    }
  }

  const existing = await getRecordBySoldierId(soldierId);
  if (existing) {
    const lenOfHistory = existing.history.length;
    if (existing.history[lenOfHistory - 1].budgetApproved === true) {
      const error = new Error("An active benefit record exists");
      error.status = 409;
    }
    const history = existing.history;
    history.push(period);
  }

  if (error) {
    throw error;
  }

  if (existing) {
    const result = await updateRecord(soldierId, {
      history,
      currentBenefitType: benefitType,
    });
  } else {
    const result = await createRecord({
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
    result,
  };
}

export async function getBenefits(soldierId) {
  const result = await getRecordBySoldierId(soldierId);
  return result;
}
