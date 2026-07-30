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
// const time = new Date().toTimeString(); // לבדוק

export default function soldierService(soldierRepo) {
  return {
    addBenefitService: async (soldierId, obj) => {
      let error;
      let schemaToCheck;
      if (obj.benefitType === "giftCard") {
        schemaToCheck = giftCardSchema.safeParse(obj);
      } else if (obj.benefitType === "diningHall") {
        schemaToCheck = diningHallSchema.safeParse(obj);
      } else {
        error = new Error("Invalid benefit type");
        error.status = 400;
        throw error;
      }
      if (!schemaToCheck.success) {
        error = new Error(schemaToCheck.error.issues[0].message);
        error.status = 400;
        throw error;
        // console.log(typeof schemaToCheck.error.message);

        // process.exit(1);
      }

      const existing = await soldierRepo.getRecordBySoldierId(soldierId);
      if (existing) {
        error = new Error("An active benefit record exists");
        error.status = 409;
        throw error;
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
        startDate: startDate || new Date().toTimeString(),
        endDate: null,
        decisionReason,
        budgetApproved,
        benefitType,
        details,
      };

      await soldierRepo.createRecord({
        soldierId,
        unit,
        currentBenefitType: benefitType,
        history: [period],
      });

      return {
        soldierId,
        unit,
        currentBenefitType: benefitType,
        history: [period],
      };
    },

    getBenefits: async (soldierId) => {
      const result = await soldierRepo.getRecordBySoldierId(soldierId);
      return result || null;
    },

    updateBenefit: async (soldierId, obj) => {
      let error;
      let schemaToCheck; //לבדוק שעכשיו תקין
      const existing = await soldierRepo.getRecordBySoldierId(soldierId);
      if (!existing) {
        error = new Error(`soldier not found`);
        error.status = 404;
        throw error;
      }

      if (obj.benefitType === "giftCard") {
        schemaToCheck = patchGiftCardBenefitValidation.safeParse(obj);
      } else if (obj.benefitType === "diningHall") {
        schemaToCheck = patchDiningHallBenefitValidation.safeParse(obj);
      } else {
        error = new Error("Invalid benefit type");
        error.status = 400;
        throw error;
      }
      if (!schemaToCheck.success) {
        error = new Error(schemaToCheck.error.issues[0].message);
        error.status = 400;
        throw error;
      }

      const {
        benefitType,
        details,
        decisionReason,
        budgetApproved,
        decisionDate,
      } = obj;

      const time = new Date().toTimeString();

      existing.currentBenefitType = benefitType;
      existing.history[existing.history.length - 1].endDate = time;
      existing.history.push({
        startDate: decisionDate || time,
        endDate: null,
        decisionReason,
        budgetApproved,
        benefitType,
        details,
      });

      await soldierRepo.updateRecord(soldierId, {
        currentBenefitType: existing.currentBenefitType,
        history: existing.history,
      });

      return existing;
    },
  };
}
