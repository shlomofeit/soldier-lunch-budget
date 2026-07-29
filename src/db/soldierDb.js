import mongoose from "mongoose";

const Soldier = new mongoose.Schema({
  name: { type: String },
});

const Benefit_records = mongoose.model("Benefit_records", Soldier);

export default Benefit_records;
