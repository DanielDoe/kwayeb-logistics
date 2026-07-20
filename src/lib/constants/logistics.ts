export const USER_ROLES = [
  "guest",
  "customer",
  "business",
  "operations",
  "warehouse",
  "finance",
  "support",
  "admin",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const QUOTE_STATUSES = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "INFORMATION_REQUIRED",
  "PRICING_IN_PROGRESS",
  "QUOTE_READY",
  "CUSTOMER_ACCEPTED",
  "CUSTOMER_REJECTED",
  "EXPIRED",
  "CONVERTED_TO_SHIPMENT",
  "CANCELLED",
] as const;

export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export const FREIGHT_METHODS = [
  { value: "recommend", label: "Not sure — recommend an option" },
  { value: "air", label: "Air freight" },
  { value: "sea", label: "Sea freight" },
  { value: "express", label: "Express parcel" },
  { value: "fcl", label: "FCL (Full Container Load)" },
  { value: "lcl", label: "LCL (Less than Container Load)" },
  { value: "rail", label: "Rail freight" },
] as const;

export const SHIPMENT_MILESTONES = [
  { code: "QUOTE_ACCEPTED", label: "Quote Accepted" },
  { code: "AWAITING_SUPPLIER_CARGO", label: "Awaiting Supplier Cargo" },
  { code: "PICKUP_SCHEDULED", label: "Pickup Scheduled" },
  { code: "PICKED_UP_FROM_SUPPLIER", label: "Picked Up from Supplier" },
  { code: "RECEIVED_AT_CHINA_WAREHOUSE", label: "Received at China Warehouse" },
  { code: "WAREHOUSE_INSPECTION", label: "Warehouse Inspection" },
  { code: "MEASUREMENTS_CONFIRMED", label: "Measurements Confirmed" },
  { code: "AWAITING_PAYMENT", label: "Awaiting Payment" },
  { code: "PAYMENT_CONFIRMED", label: "Payment Confirmed" },
  { code: "CONSOLIDATION_IN_PROGRESS", label: "Consolidation in Progress" },
  { code: "CARGO_READY_FOR_DISPATCH", label: "Cargo Ready for Dispatch" },
  { code: "BOOKING_CONFIRMED", label: "Booking Confirmed" },
  { code: "EXPORT_DOCUMENTATION_IN_PROGRESS", label: "Export Documentation" },
  { code: "EXPORT_CUSTOMS_PROCESSING", label: "Export Customs Processing" },
  { code: "DEPARTED_ORIGIN", label: "Departed Origin" },
  { code: "IN_TRANSIT", label: "In Transit" },
  { code: "TRANSSHIPMENT", label: "Transshipment" },
  { code: "ARRIVED_DESTINATION_PORT", label: "Arrived at Destination Port" },
  { code: "IMPORT_CUSTOMS_PROCESSING", label: "Import Customs Processing" },
  { code: "CUSTOMS_CLEARED", label: "Customs Cleared" },
  { code: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { code: "DELIVERED", label: "Delivered" },
  { code: "ON_HOLD", label: "On Hold" },
  { code: "DELAYED", label: "Delayed" },
  { code: "EXCEPTION", label: "Exception" },
] as const;

export const TICKET_CATEGORIES = [
  { value: "quotation", label: "Quotation" },
  { value: "tracking", label: "Tracking" },
  { value: "payment", label: "Payment" },
  { value: "warehouse", label: "Warehouse" },
  { value: "damage", label: "Cargo Damage" },
  { value: "customs", label: "Customs Question" },
  { value: "delivery", label: "Delivery" },
  { value: "account", label: "Account" },
  { value: "technical", label: "Technical Issue" },
  { value: "general", label: "General Inquiry" },
] as const;

export const LOGISTICS_SERVICES = [
  { slug: "air-freight", title: "Air Freight", desc: "Fast delivery for time-sensitive cargo" },
  { slug: "sea-freight", title: "Sea Freight", desc: "Cost-effective for large volumes" },
  { slug: "express", title: "Express Shipping", desc: "Door-to-door parcel delivery" },
  { slug: "fcl", title: "FCL Shipping", desc: "Full container load options" },
  { slug: "lcl", title: "LCL Shipping", desc: "Share container space, pay less" },
  { slug: "consolidation", title: "Cargo Consolidation", desc: "Combine multiple supplier orders" },
  { slug: "warehousing", title: "China Warehousing", desc: "Store cargo at our China warehouse" },
  { slug: "supplier-pickup", title: "Supplier Pickup", desc: "We collect from your supplier" },
  { slug: "customs-support", title: "Customs Support", desc: "Documentation and compliance guidance" },
  { slug: "door-to-door", title: "Door-to-Door", desc: "End-to-end delivery to your address" },
  { slug: "sourcing", title: "Sourcing Assistance", desc: "Find products from China suppliers" },
] as const;

export const FAQ_ITEMS = [
  {
    q: "How do I request a shipping quote?",
    a: "Use our multi-step quote form under Source & Quote. Provide your route, cargo details, and contact info. Our team responds within 24 hours.",
  },
  {
    q: "What information is required for a quote?",
    a: "Origin and destination, freight method preference, cargo weight and dimensions, item description, and supplier details if pickup is needed.",
  },
  {
    q: "Can you collect cargo from my supplier in China?",
    a: "Yes. Request supplier pickup when submitting a quote or use the pickup request form on our homepage.",
  },
  {
    q: "What is the difference between air and sea freight?",
    a: "Air freight is faster but costs more per kg. Sea freight is economical for large or heavy cargo but takes longer.",
  },
  {
    q: "What are FCL and LCL?",
    a: "FCL (Full Container Load) means you rent an entire container. LCL (Less than Container Load) means your cargo shares container space with others.",
  },
  {
    q: "How is volumetric weight calculated?",
    a: "Volume (L × W × H) divided by a service-specific divisor. Chargeable weight is the greater of actual weight and volumetric weight.",
  },
  {
    q: "How do I track my shipment?",
    a: "Enter your Kwayeb tracking number on the Track page. You'll see milestone updates from warehouse to delivery.",
  },
  {
    q: "Does an estimate represent the final price?",
    a: "No. Our shipping calculator provides an initial estimate only. Final pricing may change after cargo inspection and route confirmation.",
  },
] as const;

export const VOLUMETRIC_DIVISORS = {
  air: 6000,
  express: 5000,
  sea: 1000000,
  fcl: 1000000,
  lcl: 1000000,
  rail: 6000,
  recommend: 6000,
} as const;

export const BASE_RATES_USD = {
  air: { perKg: 4.5, minimum: 45 },
  sea: { perCbm: 180, minimum: 120 },
  express: { perKg: 8, minimum: 35 },
  fcl: { "20ft": 1800, "40ft": 2800 },
  lcl: { perCbm: 95, minimum: 85 },
  rail: { perKg: 3.2, minimum: 60 },
  recommend: { perKg: 4.5, minimum: 45 },
} as const;
