/** Demo catalog data for admin configuration and list pages. */

export const ADMIN_BOOKINGS = [
  { id: "1", reference: "BKG-2026-0142", carrier: "COSCO", route: "Guangzhou → Tema", etd: "Aug 30, 2026", status: "Confirmed" },
  { id: "2", reference: "BKG-2026-0138", carrier: "Maersk", route: "Shenzhen → Los Angeles", etd: "Sep 02, 2026", status: "Pending" },
  { id: "3", reference: "BKG-2026-0135", carrier: "Emirates SkyCargo", route: "Guangzhou → Accra", etd: "Aug 28, 2026", status: "Confirmed" },
];

export const ADMIN_CONSOLIDATIONS = [
  { id: "1", reference: "CON-2026-0088", destination: "Ghana", packages: 14, weightKg: 842, status: "In Progress" },
  { id: "2", reference: "CON-2026-0085", destination: "United States", packages: 8, weightKg: 520, status: "Ready" },
  { id: "3", reference: "CON-2026-0081", destination: "Nigeria", packages: 22, weightKg: 1180, status: "Loading" },
];

export const ADMIN_WAREHOUSES = [
  { id: "1", code: "WH-A", name: "Guangzhou Main Warehouse", city: "Guangzhou", zones: 4, capacity: "78%" },
  { id: "2", code: "WH-B", name: "Yiwu Consolidation Hub", city: "Yiwu", zones: 3, capacity: "54%" },
];

export const ADMIN_RECEIPTS = [
  { id: "1", packageId: "KWY-PKG-10842", shipment: "KWY-2026-002813", receivedAt: "Aug 26, 2026", staff: "Warehouse Lead", condition: "Good" },
  { id: "2", packageId: "KWY-PKG-10838", shipment: "KWY-2026-002819", receivedAt: "Aug 26, 2026", staff: "Warehouse Lead", condition: "Good" },
  { id: "3", packageId: "KWY-PKG-10829", shipment: "KWY-2026-002822", receivedAt: "Aug 25, 2026", staff: "Warehouse Lead", condition: "Damaged" },
];

export const ADMIN_LOCATIONS = [
  { id: "1", warehouse: "WH-A", zone: "Z3", rack: "R14", shelf: "B", packages: 6 },
  { id: "2", warehouse: "WH-A", zone: "Z2", rack: "R08", shelf: "A", packages: 4 },
  { id: "3", warehouse: "WH-B", zone: "Z1", rack: "R03", shelf: "C", packages: 9 },
];

export const ADMIN_REFUNDS = [
  { id: "1", reference: "REF-0024", customer: "Mensah Imports", invoice: "INV-01820", amount: 180, status: "Pending Review" },
  { id: "2", reference: "REF-0023", customer: "Global Retail", invoice: "INV-01812", amount: 95, status: "Approved" },
];

export const ADMIN_STATEMENTS = [
  { id: "1", customer: "Daniel Imports Ltd", period: "August 2026", balance: 2480, status: "Issued" },
  { id: "2", customer: "Apex Trading", period: "August 2026", balance: 0, status: "Paid" },
];

export const ADMIN_COMPANIES = [
  { id: "1", name: "Daniel Imports Ltd", country: "Ghana", contacts: 2, activeShipments: 3 },
  { id: "2", name: "Apex Trading", country: "Nigeria", contacts: 1, activeShipments: 2 },
  { id: "3", name: "Global Retail GH", country: "Ghana", contacts: 3, activeShipments: 5 },
];

export const ADMIN_SUPPLIERS = [
  { id: "1", name: "Guangzhou Electronics Co.", city: "Guangzhou", contact: "Li Wei", pickups: 24 },
  { id: "2", name: "Shenzhen Textiles Ltd", city: "Shenzhen", contact: "Chen Ming", pickups: 18 },
  { id: "3", name: "Yiwu Wholesale Hub", city: "Yiwu", contact: "Zhang Hua", pickups: 31 },
];

export const ADMIN_SERVICES = [
  { id: "1", slug: "air-freight", name: "Air Freight", active: true, baseRate: "$4.50/kg" },
  { id: "2", slug: "sea-freight", name: "Sea Freight", active: true, baseRate: "$180/CBM" },
  { id: "3", slug: "express", name: "Express Shipping", active: true, baseRate: "$8.00/kg" },
  { id: "4", slug: "consolidation", name: "Cargo Consolidation", active: true, baseRate: "Variable" },
];

export const ADMIN_ROUTES = [
  { id: "1", origin: "China", destination: "Ghana", modes: "Sea, Air", transitDays: "35–45 / 7–10" },
  { id: "2", origin: "China", destination: "United States", modes: "Sea, Air", transitDays: "25–35 / 5–8" },
  { id: "3", origin: "China", destination: "United Kingdom", modes: "Sea, Air", transitDays: "30–40 / 6–9" },
];

export const ADMIN_COUNTRIES = [
  { id: "1", code: "GH", name: "Ghana", region: "Africa", active: true },
  { id: "2", code: "US", name: "United States", region: "North America", active: true },
  { id: "3", code: "NG", name: "Nigeria", region: "Africa", active: true },
  { id: "4", code: "GB", name: "United Kingdom", region: "Europe", active: true },
];

export const ADMIN_PORTS = [
  { id: "1", code: "CNGGZ", name: "Guangzhou Port", country: "China", type: "Sea" },
  { id: "2", code: "GHTEM", name: "Tema Port", country: "Ghana", type: "Sea" },
  { id: "3", code: "CNSZX", name: "Shenzhen Port", country: "China", type: "Sea" },
];

export const ADMIN_AIRPORTS = [
  { id: "1", code: "CAN", name: "Guangzhou Baiyun", country: "China" },
  { id: "2", code: "ACC", name: "Kotoka International", country: "Ghana" },
  { id: "3", code: "PVG", name: "Shanghai Pudong", country: "China" },
];

export const ADMIN_CURRENCIES = [
  { id: "1", code: "USD", name: "US Dollar", symbol: "$", default: true },
  { id: "2", code: "GHS", name: "Ghanaian Cedi", symbol: "₵", default: false },
  { id: "3", code: "CNY", name: "Chinese Yuan", symbol: "¥", default: false },
];

export const ADMIN_INTEGRATIONS = [
  { id: "1", name: "Supabase", category: "Database & Auth", status: "Connected" },
  { id: "2", name: "Stripe", category: "Payments", status: "Not configured" },
  { id: "3", name: "SendGrid", category: "Email", status: "Not configured" },
];

export const ADMIN_AUDIT_LOGS = [
  { id: "1", action: "Invoice ISSUED", user: "Finance Officer", target: "INV-01831", time: "Aug 26 · 9:41 AM" },
  { id: "2", action: "Cargo RECEIVED", user: "Warehouse Lead", target: "KWY-PKG-10842", time: "Aug 26 · 8:15 AM" },
  { id: "3", action: "Quote UPDATED", user: "Operations Manager", target: "Q-01842", time: "Aug 25 · 4:22 PM" },
  { id: "4", action: "Staff LOGIN", user: "Admin User", target: "admin@kwayeb.test", time: "Aug 25 · 9:00 AM" },
];

export const ADMIN_NOTIFICATIONS = [
  { id: "1", event: "New quote request", channel: "Email + In-app", enabled: true },
  { id: "2", event: "Payment received", channel: "Email", enabled: true },
  { id: "3", event: "Shipment delayed", channel: "Email + SMS", enabled: true },
  { id: "4", event: "Warehouse exception", channel: "In-app", enabled: true },
];
