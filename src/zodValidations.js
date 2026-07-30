import { z } from "zod";

export const giftCardSchema = z.object({
  unit: z
    .string({ invalid_type_error: "Invalid input: expected string" })
    .trim()
    .min(1, "unit field is required"),
  benefitType: z.literal("giftCard"),
  decisionReason: z
    .string({ invalid_type_error: "Invalid input: expected string" })
    .trim()
    .min(1, "decisionReason field is required"),
  budgetApproved: z.boolean({
    required_error: "budgetApproved field is required",
    invalid_type_error: "budgetApproved must be true or false",
  }),
  startDate: z.string().trim().optional(),
  details: z.object({
    cardProvider: z
      .string({ invalid_type_error: "Invalid input: expected string" })
      .trim()
      .min(1, "cardProvider Field is required"),
    monthlyValue: z.number({
      required_error: "monthlyValue field is required",
      invalid_type_error: "Invalid input: expected number, received string",
    }),
    validMerchants: z.array(z.string(), {
      required_error: "validMerchants array is required",
    }),
  }),
});

export const diningHallSchema = z.object({
  unit: z
    .string({ invalid_type_error: "Invalid input: expected string" })
    .trim()
    .min(1, "unit field is required"),
  benefitType: z.literal("diningHall"),
  decisionReason: z
    .string({ invalid_type_error: "Invalid input: expected string" })
    .trim()
    .min(1, "decisionReason field is required"),
  budgetApproved: z.boolean({
    required_error: "budgetApproved field is required",
    invalid_type_error: "budgetApproved must be true or false",
  }),
  startDate: z.string().trim().optional(),
  details: z.object({
    baseId: z.number({
      required_error: "baseId field is required",
      invalid_type_error: "Invalid input: expected number, received string",
    }),
    kosherLevel: z.string({
      required_error: "baseId field is required",
      invalid_type_error: "Invalid input: expected string",
    }),
    mealTimes: z.array(z.string(), {
      required_error: "mealTimes array is required",
    }),
  }),
});
