"use client";

import { Mail } from "lucide-react";

export function FooterNewsletter() {
  return (
    <form
      className="mt-4 flex overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 focus-within:ring-[#ff6600]/50"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="sr-only" htmlFor="footer-email">
        Email
      </label>
      <div className="flex flex-1 items-center gap-2 px-3">
        <Mail className="h-4 w-4 shrink-0 text-slate-500" />
        <input
          id="footer-email"
          type="email"
          placeholder="Your email"
          className="w-full bg-transparent py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 bg-[#ff6600] px-4 text-sm font-semibold text-white transition hover:bg-[#e55a00]"
      >
        Subscribe
      </button>
    </form>
  );
}
