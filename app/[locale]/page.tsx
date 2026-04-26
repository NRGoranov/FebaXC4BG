import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventLanding } from "@/components/event-landing";
import { getDictionary } from "@/lib/dictionaries";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      type: "website",
      locale: locale === "bg" ? "bg_BG" : "en_US"
    }
  };
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const language = locale as Locale;
  const dictionary = await getDictionary(language);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Strategic Finance Forum & Gala",
    startDate: "2026-05-21T09:00:00+03:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Hyatt Regency Sofia",
      address: "Sofia, Bulgaria"
    },
    organizer: {
      "@type": "Organization",
      name: "C4BG"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <EventLanding locale={language} dictionary={dictionary} />
    </>
  );
}
