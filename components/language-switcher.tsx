"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(en|bg)/, "") || "/";
  const getHref = (targetLocale: Locale) =>
    `/${targetLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-2 py-1 text-xs">
      {(["en", "bg"] as const).map((lng) => (
        <Link
          key={lng}
          href={getHref(lng)}
          className={`rounded-full px-2 py-1 transition ${
            locale === lng ? "bg-accent text-black" : "text-foreground hover:text-accent"
          }`}
        >
          {lng.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
