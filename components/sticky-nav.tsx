"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/lib/i18n";

type NavItem = { id: string; label: string };

type Props = {
  locale: Locale;
  items: NavItem[];
  brand: string;
  facultyTagline: string;
};

export function StickyNav({ locale, items, brand, facultyTagline }: Props) {
  const [active, setActive] = useState(items[0]?.id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const observerItems = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    const sections = observerItems
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [observerItems]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-3 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-3 lg:gap-3">
            {/* Row 1: site identity always visible — never competes with nav width */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex min-w-0 flex-col gap-1 text-sm sm:flex-row sm:items-baseline sm:gap-x-5 sm:gap-y-0">
                <a
                  href="#top"
                  className="shrink-0 font-serif text-base text-accent transition hover:text-[#d6ba73] sm:text-lg"
                >
                  {brand}
                </a>
                <span className="max-w-full text-muted sm:max-w-[min(28rem,calc(100vw-10rem))] sm:text-sm lg:max-w-none">
                  {facultyTagline}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-3 pt-0.5">
                <LanguageSwitcher locale={locale} />
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-foreground transition hover:border-accent hover:text-accent lg:hidden"
                >
                  <span className="text-lg leading-none">≡</span>
                </button>
              </div>
            </div>

            {/* Row 2: two balanced rows of links (6 × 2) — desktop only */}
            <nav
              aria-label="Primary"
              className="hidden w-full border-t border-white/10 pt-3 text-[0.72rem] leading-snug text-muted lg:grid lg:grid-cols-6 lg:gap-x-4 lg:gap-y-2.5 lg:text-[0.8rem] xl:text-sm"
            >
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-center transition hover:text-accent xl:px-1 ${active === item.id ? "text-accent" : ""}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed top-0 right-0 z-50 flex h-screen w-[82%] max-w-sm flex-col gap-3 overflow-y-auto border-l border-white/10 bg-[#0d0d10] px-6 pt-24 pb-8 lg:hidden"
            >
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-foreground transition hover:border-accent hover:text-accent"
              >
                <span className="text-lg leading-none">x</span>
              </button>

              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-lg border px-4 py-3 text-sm transition ${
                    active === item.id
                      ? "border-accent/70 bg-accent/20 text-accent"
                      : "border-white/15 text-muted hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
