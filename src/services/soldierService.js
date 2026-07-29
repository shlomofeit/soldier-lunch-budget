import {
  createRecord,
  getRecordBySoldierId,
} from "../repositories/soldierRepo.js";

const BENEFIT_TYPE = ["giftCard", "diningHall"];
const rightNow = new Date();
let isoTime = rightNow.toISOString();

// export async function soldierService(soldierRepo) {

// }

export async function addBenefitService(soldierId, obj) {
  const {
    unit,
    benefitType,
    details,
    decisionReason,
    budgetApproved,
    startDate,
  } = obj; //צריך לסדר את הבדיקה של budgetApproved
  if (!unit || !benefitType || !details || !decisionReason) {
    const error = new Error("missing required items");
    error.status = 400;
  }
  if (!BENEFIT_TYPE.includes(benefitType)) {
    const error = new Error(
      `benefit must be one of ${BENEFIT_TYPE.join(" or ")}`,
    );
    error.status = 400;
  }
  const existing = await getRecordBySoldierId(soldierId);
  if (existing) {
    const error = new Error("benefit record already exists");
    error.status = 409;
  }
  const period = {
    benefitType,
    details: details || {},
    decisionReason: decisionReason || null,
    budgetApproved: !!budgetApproved,
    startDate: startDate || isoTime,
    endDate: null,
  };
  return createRecord({
    soldierId,
    unit,
    currentBenefitType: benefitType,
    history: [period],
  });
}
