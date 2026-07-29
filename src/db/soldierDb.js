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
