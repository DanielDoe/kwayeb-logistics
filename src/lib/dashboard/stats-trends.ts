const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"] as const;
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

interface Timestamped {
  created_at: string;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function bucketLastWeek(items: Timestamped[]) {
  const today = startOfDay(new Date());
  const buckets = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - index));
    return { date: day, label: DAY_LABELS[day.getDay()], value: 0 };
  });

  for (const item of items) {
    const created = startOfDay(new Date(item.created_at));
    const bucket = buckets.find((entry) => entry.date.getTime() === created.getTime());
    if (bucket) bucket.value += 1;
  }

  return buckets.map(({ label, value }) => ({ label, value }));
}

export function bucketLastMonths(items: Timestamped[], months = 6) {
  const anchor = startOfMonth(new Date());
  const buckets = Array.from({ length: months }, (_, index) => {
    const month = new Date(anchor.getFullYear(), anchor.getMonth() - (months - 1 - index), 1);
    return { date: month, label: MONTH_LABELS[month.getMonth()].slice(0, 3), value: 0 };
  });

  for (const item of items) {
    const created = startOfMonth(new Date(item.created_at));
    const bucket = buckets.find(
      (entry) =>
        entry.date.getFullYear() === created.getFullYear() && entry.date.getMonth() === created.getMonth(),
    );
    if (bucket) bucket.value += 1;
  }

  return buckets.map(({ label, value }) => ({ label, value }));
}

export function latestUpdatedLabel(items: Timestamped[]) {
  if (items.length === 0) return "No recent activity";

  const latest = items.reduce((max, item) => {
    const time = new Date(item.created_at).getTime();
    return time > max ? time : max;
  }, 0);

  const diffMs = Date.now() - latest;
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "just updated";
  if (minutes < 60) return `updated ${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `updated ${hours} hr ago`;

  const days = Math.floor(hours / 24);
  return `updated ${days} day${days === 1 ? "" : "s"} ago`;
}

export function periodChange(data: { value: number }[]) {
  if (data.length < 2) {
    return { label: "No prior data", positive: true };
  }

  const mid = Math.floor(data.length / 2);
  const recent = data.slice(mid).reduce((sum, point) => sum + point.value, 0);
  const prior = data.slice(0, mid).reduce((sum, point) => sum + point.value, 0);

  if (prior === 0 && recent === 0) {
    return { label: "No change this period", positive: true };
  }

  if (prior === 0) {
    return { label: `+${recent} this period`, positive: true };
  }

  const pct = Math.round(((recent - prior) / prior) * 100);
  return {
    label: `${pct >= 0 ? "+" : ""}${pct}% vs prior period`,
    positive: pct >= 0,
  };
}
