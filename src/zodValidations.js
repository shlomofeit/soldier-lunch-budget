import { z } from "zod";

export const giftCardSchema = z.object({
  unit: z
    .string("Invalid input: expected string")
    .trim()
    .min(1, "unit field is required"),
  benefitType: z.literal("giftCard"),
  decisionReason: z
    .string("Invalid input: expected string")
    .trim()
    .min(1, "decisionReason field is required"),
  budgetApproved: z.boolean("budgetApproved must be true or false"),
  startDate: z.string().trim().optional(),
  details: z.object({
    cardProvider: z
      .string("Invalid input: expected string")
      .trim()
      .min(1, "cardProvider Field is required"),
    monthlyValue: z.number("Invalid input: expected number, received string"),
    validMerchants: z.array(
      z.string("Invalid input: expected number, received string"),
      "validMerchants array is required",
    ),
  }),
});

export const diningHallSchema = z.object({
  unit: z
    .string("Invalid input: expected string")
    .trim()
    .min(1, "unit field is required"),
  benefitType: z.literal("diningHall"),
  decisionReason: z
    .string("Invalid input: expected string")
    .trim()
    .min(1, "decisionReason field is required"),
  budgetApproved: z.boolean("budgetApproved must be true or false"),
  startDate: z.string().trim().optional(),
  details: z.object({
    baseId: z.number("baseId field is required"),
    kosherLevel: z.string("Invalid input: expected string"),
    mealTimes: z.array(z.string()),
  }),
});

export const patchGiftCardBenefitValidation = z.object({
  benefitType: z.literal("giftCard"),
  details: z.object({
    cardProvider: z
      .string("Invalid input: expected string")
      .trim()
      .min(1, "cardProvider field is required"),
    monthlyValue: z.number("monthlyValue field is required"),
    validMerchants: z.array(z.string()),
  }),
  decisionReason: z
    .string("Invalid input: expected string")
    .trim()
    .min(1, "decisionReason field is required"),
  budgetApproved: z.boolean("budgetApproved must be true or false"),
  decisionDate: z.string().trim().optional(),
});

export const patchDiningHallBenefitValidation = z.object({
  benefitType: z.literal("diningHall"),
  details: z.object({
    baseId: z.number("baseId field is required"),
    kosherLevel: z.string("Invalid input: expected string"),
    mealTimes: z.array(z.string()),
  }),
  decisionReason: z
    .string("Invalid input: expected string")
    .trim()
    .min(1, "decisionReason field is required"),
  budgetApproved: z.boolean("budgetApproved must be true or false"),
  decisionDate: z.string().trim().optional(),
});

export const budgetSchema = z.object({
  unit: z
    .string("unit field is required")
    .trim()
    .min(1, "unit field is required"),
  benefitType: z.literal(
    ["giftCard", "diningHall"],
    "benefitType must be giftCard or diningHall",
  ),
  month: z
    .string("month field is required")
    .trim()
    .min(1, "month field is required"),
  allocatedAmount: z.coerce.number("allocatedAmount must be a number"),
});

export const spendSchema = z.object({
  amount: z.coerce.number("amount must be a number"),
  reason: z.string().trim().optional(),
});
