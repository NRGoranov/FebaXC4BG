import type { ReactNode } from "react";

import { defaultLocale, isValidLocale, type Locale } from "@/lib/i18n";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const language: Locale = isValidLocale(locale) ? locale : defaultLocale;

  return <div lang={language}>{children}</div>;
}
