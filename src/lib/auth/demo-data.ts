import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import type { CustomerFacingRole } from "@/lib/auth/demo-session-shared";
import {
  generateInvoiceNumber,
  generateQuoteNumber,
  generateTicketNumber,
} from "@/lib/pricing/estimator";

export const DEMO_DATA_COOKIE = "kwayeb_demo_data";

export interface DemoQuote {
  id: string;
  user_id: string;
  quote_number: string;
  status: string;
  destination_country: string;
  freight_method: string | null;
  created_at: string;
}

export interface DemoShipment {
  id: string;
  user_id: string;
  tracking_id: string;
  status: string;
  origin: string;
  destination: string;
  destination_country: string;
  freight_type: string | null;
  estimated_delivery: string | null;
  created_at: string;
}

export interface DemoShipmentEvent {
  status_label: string;
  location: string;
  event_at: string;
}

export interface DemoTrackableShipment extends DemoShipment {
  events: DemoShipmentEvent[];
}

export interface DemoInvoice {
  id: string;
  user_id: string;
  invoice_number: string;
  status: string;
  currency: string;
  total: number;
  due_date: string | null;
  created_at: string;
}

export interface DemoSupportTicket {
  id: string;
  user_id: string;
  ticket_number: string;
  subject: string;
  message: string;
  category: string;
  priority: string;
  status: string;
  contact_email: string;
  contact_name: string | null;
  created_at: string;
}

interface DemoDataStore {
  quotes: DemoQuote[];
  shipments: DemoShipment[];
  invoices: DemoInvoice[];
  tickets: DemoSupportTicket[];
  seededUsers: string[];
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  };
}

function parseStore(value: string | undefined): DemoDataStore {
  if (!value) {
    return { quotes: [], shipments: [], invoices: [], tickets: [], seededUsers: [] };
  }

  try {
    const parsed = JSON.parse(value) as DemoDataStore;
    return {
      quotes: parsed.quotes ?? [],
      shipments: (parsed.shipments ?? []).map((shipment) => ({
        ...shipment,
        origin: shipment.origin ?? "Guangzhou, China",
      })),
      invoices: parsed.invoices ?? [],
      tickets: parsed.tickets ?? [],
      seededUsers: parsed.seededUsers ?? [],
    };
  } catch {
    return { quotes: [], shipments: [], invoices: [], tickets: [], seededUsers: [] };
  }
}

async function readStore() {
  const store = await cookies();
  return parseStore(store.get(DEMO_DATA_COOKIE)?.value);
}

async function writeStore(data: DemoDataStore) {
  const store = await cookies();
  store.set(DEMO_DATA_COOKIE, JSON.stringify(data), cookieOptions());
}

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function hoursAgo(hours: number) {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

const STATIC_DEMO_SHIPMENTS: DemoTrackableShipment[] = [
  {
    id: "static-kwy-2026-001",
    user_id: "static",
    tracking_id: "KWY-2026-001",
    status: "in_transit",
    origin: "Guangzhou, China",
    destination: "Accra",
    destination_country: "Ghana",
    freight_type: "SEA",
    estimated_delivery: daysFromNow(18),
    created_at: daysAgo(12),
    events: [
      {
        status_label: "Order received & consolidated",
        location: "Guangzhou Warehouse",
        event_at: daysAgo(12),
      },
      {
        status_label: "Departed via sea freight",
        location: "Guangzhou Port",
        event_at: daysAgo(10),
      },
      {
        status_label: "In transit",
        location: "Indian Ocean",
        event_at: daysAgo(7),
      },
    ],
  },
  {
    id: "static-kw-trk-88421",
    user_id: "static",
    tracking_id: "KW-TRK-88421",
    status: "in_transit",
    origin: "Guangzhou, China",
    destination: "Accra",
    destination_country: "Ghana",
    freight_type: "SEA",
    estimated_delivery: daysFromNow(12),
    created_at: daysAgo(10),
    events: [
      {
        status_label: "Order received & consolidated",
        location: "Guangzhou Warehouse",
        event_at: daysAgo(10),
      },
      {
        status_label: "Departed via sea freight",
        location: "Guangzhou Port",
        event_at: daysAgo(8),
      },
      {
        status_label: "In transit",
        location: "Ghana route",
        event_at: daysAgo(2),
      },
    ],
  },
];

function buildDemoEvents(shipment: DemoShipment): DemoShipmentEvent[] {
  const created = new Date(shipment.created_at);
  const day = (offset: number) => {
    const date = new Date(created);
    date.setDate(date.getDate() + offset);
    return date.toISOString();
  };

  const templates: Record<string, DemoShipmentEvent[]> = {
    processing: [
      { status_label: "Order received", location: shipment.origin, event_at: created.toISOString() },
    ],
    in_transit: [
      { status_label: "Order received & consolidated", location: shipment.origin, event_at: created.toISOString() },
      {
        status_label: `Departed via ${shipment.freight_type?.toLowerCase() ?? "freight"}`,
        location: "Guangzhou Port",
        event_at: day(2),
      },
      {
        status_label: "In transit",
        location: `${shipment.destination_country} route`,
        event_at: hoursAgo(36),
      },
    ],
    customs: [
      { status_label: "Arrived at destination port", location: shipment.destination, event_at: day(8) },
      { status_label: "Customs clearance", location: shipment.destination, event_at: hoursAgo(12) },
    ],
    delivered: [
      { status_label: "Delivered", location: shipment.destination, event_at: shipment.estimated_delivery ?? day(10) },
    ],
  };

  return templates[shipment.status] ?? templates.in_transit;
}

function toTrackableShipment(shipment: DemoShipment): DemoTrackableShipment {
  const normalized = {
    ...shipment,
    origin: shipment.origin ?? "Guangzhou, China",
  };

  return {
    ...normalized,
    events: buildDemoEvents(normalized),
  };
}

export async function findDemoShipmentByTrackingId(trackingId: string) {
  const normalized = trackingId.trim().toUpperCase();

  const staticMatch = STATIC_DEMO_SHIPMENTS.find(
    (shipment) => shipment.tracking_id.toUpperCase() === normalized,
  );
  if (staticMatch) return staticMatch;

  const store = await readStore();
  const match = store.shipments.find(
    (shipment) => shipment.tracking_id.toUpperCase() === normalized,
  );

  return match ? toTrackableShipment(match) : null;
}

function seedCustomerData(userId: string, email: string, fullName: string): DemoDataStore {
  const quote1Id = randomUUID();
  const quote2Id = randomUUID();
  const shipmentId = randomUUID();

  return {
    seededUsers: [userId],
    quotes: [
      {
        id: quote1Id,
        user_id: userId,
        quote_number: generateQuoteNumber(),
        status: "SUBMITTED",
        destination_country: "Ghana",
        freight_method: "SEA",
        created_at: daysAgo(5),
      },
      {
        id: quote2Id,
        user_id: userId,
        quote_number: generateQuoteNumber(),
        status: "QUOTE_READY",
        destination_country: "Nigeria",
        freight_method: "AIR",
        created_at: daysAgo(2),
      },
    ],
    shipments: [
      {
        id: shipmentId,
        user_id: userId,
        tracking_id: "KW-TRK-88421",
        status: "in_transit",
        origin: "Guangzhou, China",
        destination: "Accra",
        destination_country: "Ghana",
        freight_type: "SEA",
        estimated_delivery: daysFromNow(12),
        created_at: daysAgo(10),
      },
    ],
    invoices: [
      {
        id: randomUUID(),
        user_id: userId,
        invoice_number: generateInvoiceNumber(),
        status: "ISSUED",
        currency: "USD",
        total: 1245.5,
        due_date: daysFromNow(14),
        created_at: daysAgo(3),
      },
    ],
    tickets: [
      {
        id: randomUUID(),
        user_id: userId,
        ticket_number: generateTicketNumber(),
        subject: "Tracking update for shipment KW-TRK-88421",
        message: "Could you share the latest milestone for my shipment to Accra?",
        category: "tracking",
        priority: "NORMAL",
        status: "OPEN",
        contact_email: email,
        contact_name: fullName,
        created_at: daysAgo(1),
      },
    ],
  };
}

function seedBusinessData(userId: string, email: string, fullName: string): DemoDataStore {
  return {
    seededUsers: [userId],
    quotes: [
      {
        id: randomUUID(),
        user_id: userId,
        quote_number: generateQuoteNumber(),
        status: "SUBMITTED",
        destination_country: "Kenya",
        freight_method: "SEA",
        created_at: daysAgo(8),
      },
      {
        id: randomUUID(),
        user_id: userId,
        quote_number: generateQuoteNumber(),
        status: "QUOTE_READY",
        destination_country: "South Africa",
        freight_method: "AIR",
        created_at: daysAgo(4),
      },
      {
        id: randomUUID(),
        user_id: userId,
        quote_number: generateQuoteNumber(),
        status: "ACCEPTED",
        destination_country: "Ghana",
        freight_method: "SEA",
        created_at: daysAgo(15),
      },
    ],
    shipments: [
      {
        id: randomUUID(),
        user_id: userId,
        tracking_id: "KW-TRK-90102",
        status: "in_transit",
        origin: "Guangzhou, China",
        destination: "Nairobi",
        destination_country: "Kenya",
        freight_type: "SEA",
        estimated_delivery: daysFromNow(8),
        created_at: daysAgo(12),
      },
      {
        id: randomUUID(),
        user_id: userId,
        tracking_id: "KW-TRK-77533",
        status: "delivered",
        origin: "Guangzhou, China",
        destination: "Johannesburg",
        destination_country: "South Africa",
        freight_type: "AIR",
        estimated_delivery: daysFromNow(-2),
        created_at: daysAgo(25),
      },
    ],
    invoices: [
      {
        id: randomUUID(),
        user_id: userId,
        invoice_number: generateInvoiceNumber(),
        status: "ISSUED",
        currency: "USD",
        total: 4820,
        due_date: daysFromNow(7),
        created_at: daysAgo(2),
      },
      {
        id: randomUUID(),
        user_id: userId,
        invoice_number: generateInvoiceNumber(),
        status: "PAID",
        currency: "USD",
        total: 3150,
        due_date: daysFromNow(-5),
        created_at: daysAgo(20),
      },
    ],
    tickets: [
      {
        id: randomUUID(),
        user_id: userId,
        ticket_number: generateTicketNumber(),
        subject: "Invoice payment confirmation",
        message: "We sent payment for invoice last week. Please confirm receipt.",
        category: "payment",
        priority: "HIGH",
        status: "ASSIGNED",
        contact_email: email,
        contact_name: fullName,
        created_at: daysAgo(3),
      },
      {
        id: randomUUID(),
        user_id: userId,
        ticket_number: generateTicketNumber(),
        subject: "Warehouse consolidation request",
        message: "Can we consolidate two POs into one container for the Kenya route?",
        category: "warehouse",
        priority: "NORMAL",
        status: "RESOLVED",
        contact_email: email,
        contact_name: fullName,
        created_at: daysAgo(12),
      },
    ],
  };
}

export async function ensureDemoDataSeeded(input: {
  userId: string;
  email: string;
  fullName: string;
  role: CustomerFacingRole;
}) {
  const store = await readStore();
  if (store.seededUsers.includes(input.userId)) return;

  const seed = input.role === "business"
    ? seedBusinessData(input.userId, input.email, input.fullName)
    : seedCustomerData(input.userId, input.email, input.fullName);

  await writeStore({
    quotes: [...store.quotes, ...seed.quotes],
    shipments: [...store.shipments, ...seed.shipments],
    invoices: [...store.invoices, ...seed.invoices],
    tickets: [...store.tickets, ...seed.tickets],
    seededUsers: [...store.seededUsers, input.userId],
  });
}

export async function getDemoQuotes(userId: string) {
  const store = await readStore();
  return store.quotes.filter((q) => q.user_id === userId).sort(sortByDateDesc);
}

export async function getDemoShipments(userId: string) {
  const store = await readStore();
  return store.shipments.filter((s) => s.user_id === userId).sort(sortByDateDesc);
}

export async function getDemoInvoices(userId: string) {
  const store = await readStore();
  return store.invoices.filter((i) => i.user_id === userId).sort(sortByDateDesc);
}

export async function getDemoSupportTickets(userId: string) {
  const store = await readStore();
  return store.tickets.filter((t) => t.user_id === userId).sort(sortByDateDesc);
}

export async function getDemoDashboardStats(userId: string) {
  const [quotes, shipments, invoices] = await Promise.all([
    getDemoQuotes(userId),
    getDemoShipments(userId),
    getDemoInvoices(userId),
  ]);

  const activeQuoteStatuses = new Set(["SUBMITTED", "UNDER_REVIEW", "QUOTE_READY", "ACCEPTED"]);
  const activeShipmentStatuses = new Set(["pending", "booked", "in_transit", "customs", "out_for_delivery"]);
  const outstandingInvoiceStatuses = new Set(["ISSUED", "PARTIALLY_PAID", "OVERDUE"]);

  return {
    activeQuotes: quotes.filter((q) => activeQuoteStatuses.has(q.status)).length,
    activeShipments: shipments.filter((s) => activeShipmentStatuses.has(s.status)).length,
    outstandingInvoices: invoices.filter((i) => outstandingInvoiceStatuses.has(i.status)).length,
  };
}

export async function addDemoQuote(userId: string, input: {
  destination_country: string;
  freight_method: string | null;
}) {
  const store = await readStore();
  const quote: DemoQuote = {
    id: randomUUID(),
    user_id: userId,
    quote_number: generateQuoteNumber(),
    status: "SUBMITTED",
    destination_country: input.destination_country,
    freight_method: input.freight_method,
    created_at: new Date().toISOString(),
  };

  await writeStore({ ...store, quotes: [quote, ...store.quotes] });
  return quote;
}

export async function getDemoQuoteById(userId: string, quoteId: string) {
  const store = await readStore();
  return store.quotes.find((quote) => quote.user_id === userId && quote.id === quoteId) ?? null;
}

export async function getDemoInvoiceById(userId: string, invoiceId: string) {
  const store = await readStore();
  return store.invoices.find((invoice) => invoice.user_id === userId && invoice.id === invoiceId) ?? null;
}

export async function addDemoSupportTicket(userId: string, input: {
  subject: string;
  message: string;
  category: string;
  contact_email: string;
  contact_name: string | null;
}) {
  const store = await readStore();
  const ticket: DemoSupportTicket = {
    id: randomUUID(),
    user_id: userId,
    ticket_number: generateTicketNumber(),
    subject: input.subject,
    message: input.message,
    category: input.category,
    priority: "NORMAL",
    status: "OPEN",
    contact_email: input.contact_email,
    contact_name: input.contact_name,
    created_at: new Date().toISOString(),
  };

  await writeStore({ ...store, tickets: [ticket, ...store.tickets] });
  return ticket;
}

function sortByDateDesc<T extends { created_at: string }>(a: T, b: T) {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export async function ensureAdminDemoDataSeeded() {
  const { ensureDemoSeedUsers } = await import("@/lib/auth/demo-session");
  const users = await ensureDemoSeedUsers();
  const customer = users.find((user) => user.email === "test.customer@kwayeb.test");

  if (customer) {
    await ensureDemoDataSeeded({
      userId: customer.id,
      email: customer.email,
      fullName: customer.fullName,
      role: "customer",
    });
  }
}

export async function getAllDemoQuotes() {
  await ensureAdminDemoDataSeeded();
  const store = await readStore();
  return [...store.quotes].sort(sortByDateDesc);
}

export async function getAllDemoShipments() {
  await ensureAdminDemoDataSeeded();
  const store = await readStore();
  return [...store.shipments].sort(sortByDateDesc);
}

export async function getAllDemoInvoices() {
  await ensureAdminDemoDataSeeded();
  const store = await readStore();
  return [...store.invoices].sort(sortByDateDesc);
}

export async function getAllDemoSupportTickets() {
  await ensureAdminDemoDataSeeded();
  const store = await readStore();
  return [...store.tickets].sort(sortByDateDesc);
}

export async function getAdminDemoStats() {
  await ensureAdminDemoDataSeeded();
  const store = await readStore();

  return {
    newQuotes: store.quotes.filter((q) => q.status === "SUBMITTED").length,
    activeShipments: store.shipments.filter((s) => s.status !== "delivered").length,
    openTickets: store.tickets.filter((t) => t.status === "OPEN").length,
    unpaidInvoices: store.invoices.filter((i) => i.status === "ISSUED" || i.status === "OVERDUE").length,
  };
}
