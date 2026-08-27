import { z } from "zod";

export const quoteWizardSchema = z.object({
  // Step 1: Route
  originCountry: z.string().default("China"),
  originCity: z.string().min(1, "Origin city is required"),
  destinationCountry: z.string().min(1, "Destination is required"),
  destinationCity: z.string().optional(),
  destinationPostal: z.string().optional(),
  pickupRequired: z.boolean().default(false),
  doorDeliveryRequired: z.boolean().default(false),
  // Step 2: Freight
  freightMethod: z.enum(["recommend", "air", "sea", "express", "fcl", "lcl", "rail"]),
  // Step 3: Cargo
  cargoCategory: z.string().optional(),
  itemDescription: z.string().min(5, "Describe your cargo"),
  packageCount: z.coerce.number().min(1).default(1),
  packageType: z.string().optional(),
  actualWeight: z.coerce.number().min(0.1, "Weight is required"),
  lengthCm: z.coerce.number().optional(),
  widthCm: z.coerce.number().optional(),
  heightCm: z.coerce.number().optional(),
  declaredValue: z.coerce.number().optional(),
  currency: z.string().default("USD"),
  cargoFlags: z.object({
    batteries: z.boolean().default(false),
    liquids: z.boolean().default(false),
    magnets: z.boolean().default(false),
    food: z.boolean().default(false),
    cosmetics: z.boolean().default(false),
    branded: z.boolean().default(false),
    hazardous: z.boolean().default(false),
    fragile: z.boolean().default(false),
  }).optional(),
  // Step 4: Supplier
  supplierName: z.string().optional(),
  supplierContact: z.string().optional(),
  supplierPhone: z.string().optional(),
  supplierAddress: z.string().optional(),
  cargoReadyDate: z.string().optional(),
  purchaseOrder: z.string().optional(),
  pickupInstructions: z.string().optional(),
  // Step 5: Services
  requestedServices: z.array(z.string()).default([]),
  // Step 6: Contact
  contactName: z.string().min(2, "Name is required"),
  contactEmail: z.string().email("Valid email required"),
  contactPhone: z.string().optional(),
  contactWhatsapp: z.string().optional(),
  preferredContact: z.string().optional(),
  company: z.string().optional(),
  sourcingType: z.enum(["sourcing", "shipping", "both"]).default("both"),
  additionalNotes: z.string().optional(),
});

export type QuoteWizardInput = z.infer<typeof quoteWizardSchema>;

export const estimateSchema = z.object({
  originCity: z.string().min(1),
  destinationCountry: z.string().min(1),
  destinationCity: z.string().optional(),
  freightMethod: z.enum(["recommend", "air", "sea", "express", "fcl", "lcl", "rail"]),
  cargoType: z.string().optional(),
  actualWeight: z.coerce.number().min(0.1),
  lengthCm: z.coerce.number().optional(),
  widthCm: z.coerce.number().optional(),
  heightCm: z.coerce.number().optional(),
  packageCount: z.coerce.number().min(1).default(1),
  pickupRequired: z.boolean().default(false),
  doorDeliveryRequired: z.boolean().default(false),
  contactEmail: z.string().email().optional(),
});

export type EstimateInput = z.infer<typeof estimateSchema>;

export const pickupSchema = z.object({
  supplierCity: z.string().min(1, "City is required"),
  pickupAddress: z.string().min(5, "Address is required"),
  contactName: z.string().min(2, "Contact name is required"),
  contactPhone: z.string().min(5, "Phone is required"),
  preferredDate: z.string().optional(),
  notes: z.string().optional(),
});

export type PickupInput = z.infer<typeof pickupSchema>;

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name is required").optional(),
  role: z.enum(["customer", "business"]).default("customer"),
  company: z.string().optional(),
});

export const signUpSchema = authSchema
  .extend({
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
