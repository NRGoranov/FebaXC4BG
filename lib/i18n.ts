export const locales = ["en", "bg"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const isValidLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
