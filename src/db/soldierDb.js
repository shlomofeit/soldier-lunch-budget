import mongoose from "mongoose";

const Soldier = new mongoose.Schema({
  soldierId: { type: Number, required: true },
  unit: { type: String, required: true },
  currentBenefitType: {
    type: String,
    enum: ["giftCard", "diningHall"],
    required: true,
  },
  history: { type: [String], required: true },
});

const Benefit_records = mongoose.model("Benefit_records", Soldier);

export default Benefit_records;

// const BenefitPreriod = {
//   startDate: String,
//   endDate: String,
//   decisionReason: String,
//   budgetApproved: Boolean,
//   benefitType: String, //enum
//   details: Object,
// };

// const giftcard = {
//   cardProvider: String,
//   monthlyValue: Number,
//   validMerchants: String, //String[] לבדוק מה זה אומר
// };

// const diningHall = {
//   baseId: Number || ObjectId,
//   kosherLevel: String,
//   mealTimes: String, //גם פה לבדוק String[]
// };
