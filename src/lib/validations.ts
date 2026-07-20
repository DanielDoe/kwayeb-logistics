import { z } from "zod";

export const sourcingRequestSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  country: z.string().min(1, "Destination is required"),
  requestType: z.enum(["sourcing", "shipping", "both"]),
  category: z.string().optional(),
  productDescription: z.string().min(10, "Please describe what you need"),
  quantity: z.string().optional(),
  budget: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type SourcingRequestInput = z.infer<typeof sourcingRequestSchema>;

export const trackingQuerySchema = z.object({
  trackingId: z
    .string()
    .min(3, "Tracking ID is required")
    .transform((v) => v.trim().toUpperCase()),
});
