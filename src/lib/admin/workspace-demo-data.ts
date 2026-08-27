/** Rich demo data for staff workspace dashboards — works without Supabase. */

export interface ActionQueueItem {
  id: string;
  priority: "urgent" | "high" | "normal";
  shipment: string;
  customer: string;
  issue: string;
  location: string;
  action: string;
  href: string;
}

export interface WarehousePackage {
  id: string;
  packageId: string;
  supplier: string;
  customer: string;
  weightKg: number;
  volumeCbm: number;
  location: string;
  status: string;
  statusColor: "green" | "amber" | "red" | "blue";
}

export interface PaymentVerification {
  id: string;
  customer: string;
  invoice: string;
  amount: number;
  method: string;
  status: "verify" | "confirmed";
  href: string;
}

export interface SupportConversation {
  id: string;
  customer: string;
  subject: string;
  preview: string;
  priority: "urgent" | "normal";
  status: "unassigned" | "mine" | "waiting";
  updatedAt: string;
  shipment?: string;
  invoice?: string;
}

export interface SupportMessage {
  id: string;
  sender: "customer" | "staff";
  content: string;
  time: string;
}

export interface ShipmentDetail {
  id: string;
  trackingId: string;
  status: string;
  statusLabel: string;
  origin: string;
  destination: string;
  freightType: string;
  customer: string;
  etd: string;
  eta: string;
  timeline: { label: string; date: string | null; state: "done" | "current" | "pending" }[];
  charges: { label: string; amount: number }[];
  pendingIssue?: string;
  pendingAction?: string;
  documentsNeeded?: string[];
}

export interface QuoteDetail {
  id: string;
  quoteNumber: string;
  status: string;
  statusLabel: string;
  customer: string;
  contactEmail: string;
  origin: string;
  destination: string;
  freightMethod: string;
  cargoDescription: string;
  submittedAt: string;
  pendingIssue?: string;
}

export interface InvoiceDetail {
  id: string;
  invoiceNumber: string;
  total: number;
  currency: string;
  status: string;
  statusLabel: string;
  customer: string;
  shipment: string;
  issued: string;
  due: string;
  lineItems: { label: string; amount: number }[];
}

export const OPERATIONS_ACTION_QUEUE: ActionQueueItem[] = [
  {
    id: "1",
    priority: "urgent",
    shipment: "KWY 28401",
    customer: "Acme Ltd",
    issue: "Customs documents missing",
    location: "Accra",
    action: "Review",
    href: "/admin/operations/shipments/kwy-28401",
  },
  {
    id: "2",
    priority: "high",
    shipment: "KWY 28194",
    customer: "John Mensah",
    issue: "Cargo measurements changed",
    location: "Guangzhou",
    action: "Contact",
    href: "/admin/operations/shipments/kwy-28194",
  },
  {
    id: "3",
    priority: "normal",
    shipment: "KWY 28213",
    customer: "Apex Imports",
    issue: "Quote awaiting preparation",
    location: "Shenzhen",
    action: "Prepare Quote",
    href: "/admin/operations/quotes/apex-28213",
  },
];

export const WAREHOUSE_PACKAGES: WarehousePackage[] = [
  {
    id: "1",
    packageId: "KWY-PKG-10842",
    supplier: "Guangzhou Electronics Co.",
    customer: "Kofi Imports",
    weightKg: 87.4,
    volumeCbm: 0.36,
    location: "WH-A · Z3 · R14 · B",
    status: "READY FOR CONSOLIDATION",
    statusColor: "green",
  },
  {
    id: "2",
    packageId: "KWY-PKG-10838",
    supplier: "Shenzhen Textiles Ltd",
    customer: "Mensah Trading",
    weightKg: 42.1,
    volumeCbm: 0.18,
    location: "WH-A · Z2 · R08 · A",
    status: "AWAITING INSPECTION",
    statusColor: "amber",
  },
  {
    id: "3",
    packageId: "KWY-PKG-10829",
    supplier: "Yiwu Wholesale Hub",
    customer: "Global Retail GH",
    weightKg: 156.0,
    volumeCbm: 0.72,
    location: "WH-B · Z1 · R03 · C",
    status: "EXCEPTION",
    statusColor: "red",
  },
];

export const FINANCE_PAYMENTS: PaymentVerification[] = [
  {
    id: "1",
    customer: "Mensah Imports",
    invoice: "INV-01831",
    amount: 2480,
    method: "Bank Transfer",
    status: "verify",
    href: "/admin/finance/invoices/inv-01831",
  },
  {
    id: "2",
    customer: "Apex Trading",
    invoice: "INV-01832",
    amount: 4120,
    method: "Mobile Money",
    status: "verify",
    href: "/admin/finance/invoices/inv-01832",
  },
  {
    id: "3",
    customer: "Global Retail",
    invoice: "INV-01835",
    amount: 1780,
    method: "Card",
    status: "confirmed",
    href: "/admin/finance/invoices/inv-01835",
  },
];

export const SUPPORT_CONVERSATIONS: SupportConversation[] = [
  {
    id: "1",
    customer: "Kwame Mensah",
    subject: "Where is my shipment?",
    preview: "Hi, I submitted payment last week but haven't heard anything...",
    priority: "urgent",
    status: "unassigned",
    updatedAt: "2 min ago",
    shipment: "KWY-2026-28413",
    invoice: "INV-1831",
  },
  {
    id: "2",
    customer: "Ama Darko",
    subject: "Package consolidation question",
    preview: "Can I add more items to my existing shipment?",
    priority: "normal",
    status: "mine",
    updatedAt: "18 min ago",
    shipment: "KWY-2026-28102",
  },
  {
    id: "3",
    customer: "Daniel Imports Ltd",
    subject: "Invoice payment confirmation",
    preview: "I've sent the bank transfer receipt via email.",
    priority: "normal",
    status: "waiting",
    updatedAt: "1 hr ago",
    invoice: "INV-01829",
  },
];

export const SUPPORT_MESSAGES: SupportMessage[] = [
  {
    id: "1",
    sender: "customer",
    content: "Hi, I submitted payment last week but haven't heard anything about my shipment. Can you please check?",
    time: "Aug 26 · 9:12 AM",
  },
  {
    id: "2",
    sender: "staff",
    content: "Hello Kwame, thank you for reaching out. Let me check the status of KWY-2026-28413 for you now.",
    time: "Aug 26 · 9:18 AM",
  },
  {
    id: "3",
    sender: "customer",
    content: "Thank you! The tracking still shows 'In Transit' from Aug 24.",
    time: "Aug 26 · 9:22 AM",
  },
];

export const DEMO_SHIPMENT: ShipmentDetail = {
  id: "kwy-28401",
  trackingId: "KWY-2026-002841",
  status: "in_transit",
  statusLabel: "IN TRANSIT",
  origin: "Guangzhou, China",
  destination: "Accra, Ghana",
  freightType: "Sea Freight · LCL",
  customer: "Acme Ltd",
  etd: "Aug 28, 2026",
  eta: "Oct 04, 2026",
  pendingIssue: "Customs documents missing",
  pendingAction: "Review shipment documents and request missing customs paperwork from the customer.",
  documentsNeeded: ["Commercial invoice", "Packing list", "Import declaration"],
  timeline: [
    { label: "Cargo Received", date: "Aug 19", state: "done" },
    { label: "Measurements Confirmed", date: "Aug 20", state: "done" },
    { label: "Payment Confirmed", date: "Aug 23", state: "done" },
    { label: "Departed Guangzhou", date: "Aug 28", state: "done" },
    { label: "In Transit", date: null, state: "current" },
    { label: "Arrived Ghana", date: null, state: "pending" },
    { label: "Customs Clearance", date: null, state: "pending" },
    { label: "Delivered", date: null, state: "pending" },
  ],
  charges: [
    { label: "Ocean Freight", amount: 1720 },
    { label: "Warehouse Handling", amount: 180 },
    { label: "Documentation", amount: 120 },
    { label: "Origin Handling", amount: 210 },
    { label: "Door Delivery", amount: 250 },
  ],
};

export const DEMO_SHIPMENTS: Record<string, ShipmentDetail> = {
  "kwy-28401": DEMO_SHIPMENT,
  "kwy-28194": {
    id: "kwy-28194",
    trackingId: "KWY-2026-002194",
    status: "at_warehouse",
    statusLabel: "AT WAREHOUSE",
    origin: "Guangzhou, China",
    destination: "Lagos, Nigeria",
    freightType: "Air Freight",
    customer: "John Mensah",
    etd: "Sep 02, 2026",
    eta: "Sep 12, 2026",
    pendingIssue: "Cargo measurements changed",
    pendingAction: "Contact the customer to confirm revised weight and volume before dispatch.",
    timeline: [
      { label: "Cargo Received", date: "Aug 24", state: "done" },
      { label: "Measurements Updated", date: "Aug 26", state: "done" },
      { label: "Customer Confirmation", date: null, state: "current" },
      { label: "Payment Confirmed", date: null, state: "pending" },
      { label: "Dispatched", date: null, state: "pending" },
      { label: "Delivered", date: null, state: "pending" },
    ],
    charges: [
      { label: "Air Freight", amount: 980 },
      { label: "Warehouse Handling", amount: 120 },
      { label: "Documentation", amount: 85 },
    ],
  },
};

export const DEMO_ADMIN_QUOTES: Record<string, QuoteDetail> = {
  "apex-28213": {
    id: "apex-28213",
    quoteNumber: "Q-01842",
    status: "submitted",
    statusLabel: "AWAITING PREPARATION",
    customer: "Apex Imports",
    contactEmail: "ops@apeximports.com",
    origin: "Shenzhen, China",
    destination: "Accra, Ghana",
    freightMethod: "Sea Freight · LCL",
    cargoDescription: "Consumer electronics accessories — 2.4 CBM, 680 kg, ready in 5 business days.",
    submittedAt: "Aug 26, 2026",
    pendingIssue: "Quote awaiting preparation",
  },
};

export function getDemoShipment(slug: string) {
  return DEMO_SHIPMENTS[slug.toLowerCase()] ?? null;
}

export function getDemoAdminQuote(slug: string) {
  return DEMO_ADMIN_QUOTES[slug.toLowerCase()] ?? null;
}

export function getActionQueueItemByHref(href: string) {
  return OPERATIONS_ACTION_QUEUE.find((item) => item.href === href) ?? null;
}

export const DEMO_INVOICE: InvoiceDetail = {
  id: "inv-01831",
  invoiceNumber: "INV-01831",
  total: 2480,
  currency: "USD",
  status: "awaiting_payment",
  statusLabel: "AWAITING PAYMENT",
  customer: "Mensah Imports Ltd",
  shipment: "KWY-2026-002841",
  issued: "August 24, 2026",
  due: "August 31, 2026",
  lineItems: [
    { label: "Ocean Freight", amount: 1720 },
    { label: "Warehouse Handling", amount: 180 },
    { label: "Documentation", amount: 120 },
    { label: "Origin Handling", amount: 210 },
    { label: "Door Delivery", amount: 250 },
  ],
};

export function getGreeting(name: string | null) {
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = name?.split(" ")[0] ?? "there";
  return `${timeGreeting}, ${firstName}`;
}
