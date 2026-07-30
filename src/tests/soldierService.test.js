import { it, describe, mock } from "node:test";
import assert from "node:assert";
import soldierService from "../services/soldierService.js";

const validGiftCard = {
  unit: "kodCode",
  benefitType: "giftCard",
  decisionReason: "good days with goodi",
  budgetApproved: true,
  details: {
    cardProvider: "goodi",
    monthlyValue: 200,
    validMerchants: ["aa", "bb"],
  },
};

describe("Soldier service test", () => {
  describe("addBenefitService test", () => {
    it("Should throw error with invalid type", async () => {
      const service = soldierService({});
      await assert.rejects(async () => {
        await service.addBenefitService(1, { benefitType: "tenBis" });
      }, /Invalid benefit type/);
    });

    it("Should throw error with active benefit exists", async () => {
      const service = soldierService({
        getRecordBySoldierId: mock.fn((id) => ({ soldierId: id })),
      });
      await assert.rejects(async () => {
        await service.addBenefitService(1, validGiftCard);
      }, /An active benefit record exists/);
    });

    it("Should return the new benefit record", async () => {
      const service = soldierService({
        getRecordBySoldierId: mock.fn((id) => null),
        createRecord: mock.fn((obj) => "1"),
      });
      const result = await service.addBenefitService("12", validGiftCard);
      assert.strictEqual(result.soldierId, "12");
      assert.strictEqual(result.currentBenefitType, "giftCard");
      assert.strictEqual(result.history.length, 1);
      assert.strictEqual(result.history[0].endDate, null);
    });
  });
});
