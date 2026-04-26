import "server-only";

import type { Locale } from "@/lib/i18n";

type Speaker = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

type ProgramItem = {
  time: string;
  title: string;
  speakers: string;
};

type Partner = {
  name: string;
  logo: string;
};

type TeamMember = {
  name: string;
  role: string;
  highlight?: boolean;
};

type HistoryItem = {
  year: string;
  title: string;
  description: string;
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { about: string; program: string; speakers: string; media: string; partners: string; team: string; history: string; collaboration: string; contact: string };
  hero: { badge: string; title: string; subtitle: string; cta: string };
  about: { title: string; body: string };
  program: { title: string; subtitle: string; items: ProgramItem[] };
  speakers: { title: string; subtitle: string; list: Speaker[] };
  media: { title: string; subtitle: string };
  partners: { title: string; subtitle: string; list: Partner[] };
  team: { title: string; subtitle: string; members: TeamMember[] };
  history: { title: string; subtitle: string; items: HistoryItem[] };
  collaboration: { title: string; text: string };
  contact: {
    title: string;
    subtitle: string;
    form: { name: string; email: string; message: string; submit: string };
    fallback: string;
  };
  footer: { rights: string };
};

const dictionaries = {
  en: () => import("@/locales/en/common.json").then((module) => module.default),
  bg: () => import("@/locales/bg/common.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]() as Promise<Dictionary>;
};
