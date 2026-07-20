export const SITE = {
  name: "KWAYEB LOGISTICS",
  domain: "www.kwayeblogistics.com",
  tagline: "Your trusted bridge from China to the world",
  email: "hello@kwayeblogistics.com",
  phone: "+86 XXX XXXX XXXX",
} as const;

export const SHIPPING_ROUTES = [
  {
    id: "ghana",
    destination: "Ghana",
    region: "West Africa",
    flag: "🇬🇭",
    description: "Fast, reliable shipping from China to Accra and beyond.",
  },
  {
    id: "usa",
    destination: "United States",
    region: "North America",
    flag: "🇺🇸",
    description: "Door-to-door delivery across all 50 states.",
  },
  {
    id: "uk",
    destination: "United Kingdom",
    region: "Europe",
    flag: "🇬🇧",
    description: "Express and economy options to London and nationwide.",
  },
  {
    id: "australia",
    destination: "Australia",
    region: "Oceania",
    flag: "🇦🇺",
    description: "Reliable sea and air freight to Sydney, Melbourne & more.",
  },
  {
    id: "germany",
    destination: "Germany",
    region: "Europe",
    flag: "🇩🇪",
    description: "Efficient logistics hub for Central European delivery.",
  },
  {
    id: "europe",
    destination: "All of Europe",
    region: "Europe",
    flag: "🇪🇺",
    description: "France, Spain, Italy, Netherlands, Poland & every EU nation.",
  },
  {
    id: "africa",
    destination: "All of Africa",
    region: "Africa",
    flag: "🌍",
    description: "Pan-African shipping from Nigeria to Kenya, South Africa & more.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us what you need",
    description:
      "Submit a sourcing or shipping request. Share product details, quantity, and destination.",
  },
  {
    step: "02",
    title: "We source & consolidate",
    description:
      "Our team in China finds suppliers, verifies quality, and consolidates your goods at our warehouse.",
  },
  {
    step: "03",
    title: "Ship worldwide",
    description:
      "Choose air or sea freight. We handle customs documentation and compliance for your destination.",
  },
  {
    step: "04",
    title: "Track & receive",
    description:
      "Monitor your shipment in real time and receive your goods at your doorstep.",
  },
] as const;

export const SERVICES = [
  {
    title: "Product Sourcing",
    description:
      "Can't find a supplier? Tell us what you need — electronics, fashion, machinery, or anything else — and we'll source it from verified Chinese manufacturers.",
    icon: "search",
  },
  {
    title: "International Shipping",
    description:
      "Air freight, sea freight, and express courier options tailored to your budget and timeline.",
    icon: "ship",
  },
  {
    title: "Shipment Tracking",
    description:
      "Real-time tracking from warehouse departure to final delivery at your address.",
    icon: "track",
  },
  {
    title: "Customs & Compliance",
    description:
      "We manage documentation, duties guidance, and regulatory requirements for every destination.",
    icon: "document",
  },
  {
    title: "Warehouse Consolidation",
    description:
      "Combine multiple orders into one shipment to save on freight costs.",
    icon: "warehouse",
  },
  {
    title: "Secure Payments",
    description:
      "Safe payment options coming soon — pay for sourcing and shipping with confidence.",
    icon: "payment",
    comingSoon: true,
  },
] as const;

export const PRODUCT_CATEGORIES = [
  "Electronics & Gadgets",
  "Fashion & Apparel",
  "Home & Furniture",
  "Machinery & Industrial",
  "Beauty & Cosmetics",
  "Automotive Parts",
  "Agricultural Equipment",
  "Other — describe below",
] as const;
