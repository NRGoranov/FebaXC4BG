"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Section } from "@/components/section";
import { StickyNav } from "@/components/sticky-nav";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 }
};

export function EventLanding({ locale, dictionary }: Props) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 480);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "about", label: dictionary.nav.about },
    { id: "program", label: dictionary.nav.program },
    { id: "speakers", label: dictionary.nav.speakers },
    { id: "media", label: dictionary.nav.media },
    { id: "partners", label: dictionary.nav.partners },
    { id: "team", label: dictionary.nav.team },
    { id: "history", label: dictionary.nav.history },
    { id: "collaboration", label: dictionary.nav.collaboration },
    { id: "contact", label: dictionary.nav.contact }
  ];

  return (
    <main id="top" className="bg-background pt-20 text-foreground">
      <StickyNav locale={locale} items={navItems} />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(198,168,92,0.2),_transparent_42%),linear-gradient(120deg,_rgba(255,255,255,0.06),_transparent_38%)]" />
        <div className="section-shell relative py-28 sm:py-36">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-sm tracking-[0.2em] text-accent uppercase"
          >
            {dictionary.hero.badge}
          </motion.p>
          <motion.h1
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-4xl font-serif text-5xl leading-tight tracking-tight sm:text-7xl"
          >
            {dictionary.hero.title}
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-3xl text-lg leading-8 text-muted"
          >
            {dictionary.hero.subtitle}
          </motion.p>
          <motion.a
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            href="#program"
            className="mt-10 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-medium text-black transition hover:bg-[#d6ba73]"
          >
            {dictionary.hero.cta}
          </motion.a>
        </div>
      </section>

      <Section id="about" title={dictionary.about.title}>
        <p className="max-w-4xl text-base leading-8 text-muted sm:text-lg">{dictionary.about.body}</p>
      </Section>

      <Section id="program" title={dictionary.program.title} subtitle={dictionary.program.subtitle}>
        <div className="space-y-4">
          {dictionary.program.items.map((item) => (
            <motion.article
              key={`${item.time}-${item.title}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="grid gap-4 rounded-2xl border border-white/10 bg-surface/70 p-6 md:grid-cols-[120px_1fr_1fr]"
            >
              <p className="text-accent">{item.time}</p>
              <p className="font-medium">{item.title}</p>
              <p className="text-muted">{item.speakers}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="speakers" title={dictionary.speakers.title} subtitle={dictionary.speakers.subtitle}>
        <div className="grid gap-6 md:grid-cols-3">
          {dictionary.speakers.list.map((speaker) => (
            <motion.article
              key={speaker.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group rounded-2xl border border-white/10 bg-surface p-4 transition hover:-translate-y-1 hover:border-accent/50"
            >
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={520}
                height={420}
                className="h-56 w-full rounded-xl object-cover grayscale transition group-hover:grayscale-0"
              />
              <h3 className="mt-5 font-serif text-2xl">{speaker.name}</h3>
              <p className="mt-2 text-sm text-accent">{speaker.role}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{speaker.bio}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="media" title={dictionary.media.title} subtitle={dictionary.media.subtitle}>
        <div className="grid gap-6 md:grid-cols-2">
          {["w5fLgMysn4k", "5qap5aO4i9A"].map((videoId) => (
            <div key={videoId} className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
              <iframe
                className="h-72 w-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Interview with Prof. Stanislav Gyoshev"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </Section>

      <Section id="partners" title={dictionary.partners.title} subtitle={dictionary.partners.subtitle}>
        <div className="grid gap-5 sm:grid-cols-2">
          {dictionary.partners.list.map((partner) => (
            <div
              key={partner.name}
              className="flex h-32 items-center justify-center rounded-2xl border border-white/10 bg-surface grayscale transition hover:grayscale-0"
            >
              <Image src={partner.logo} alt={partner.name} width={180} height={48} className="h-auto w-auto" />
            </div>
          ))}
        </div>
      </Section>

      <Section id="team" title={dictionary.team.title} subtitle={dictionary.team.subtitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {dictionary.team.members.map((member) => (
            <article
              key={member.name}
              className={`rounded-2xl border p-5 ${
                member.highlight ? "border-accent/60 bg-accent/8" : "border-white/10 bg-surface/60"
              }`}
            >
              <p className={`font-serif text-xl ${member.highlight ? "text-accent" : "text-foreground"}`}>{member.name}</p>
              <p className="mt-2 text-sm text-muted">{member.role}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="history" title={dictionary.history.title} subtitle={dictionary.history.subtitle}>
        <div className="space-y-4">
          {dictionary.history.items.map((item) => (
            <article key={`${item.year}-${item.title}`} className="rounded-2xl border border-white/10 bg-surface/70 p-6">
              <p className="text-sm tracking-widest text-accent">{item.year}</p>
              <h3 className="mt-2 font-serif text-2xl">{item.title}</h3>
              <p className="mt-2 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="collaboration" title={dictionary.collaboration.title}>
        <p className="max-w-4xl leading-8 text-muted">{dictionary.collaboration.text}</p>
      </Section>

      <Section id="contact" title={dictionary.contact.title} subtitle={dictionary.contact.subtitle}>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          <form
            action="https://formspree.io/f/xjkyljga"
            method="POST"
            className="space-y-4 rounded-2xl border border-white/10 bg-surface p-6"
          >
            <input
              name="name"
              required
              placeholder={dictionary.contact.form.name}
              className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-accent"
            />
            <input
              name="email"
              type="email"
              required
              placeholder={dictionary.contact.form.email}
              className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-accent"
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder={dictionary.contact.form.message}
              className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 outline-none transition focus:border-accent"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-black transition hover:bg-[#d6ba73]"
            >
              {dictionary.contact.form.submit}
            </button>
          </form>
          <a href="mailto:office@c4bg.org" className="h-fit text-muted underline-offset-4 hover:text-accent hover:underline">
            {dictionary.contact.fallback}
          </a>
        </div>
      </Section>

      <footer className="section-shell flex flex-col gap-5 py-12 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <Image src="/images/logos/c4bg.svg" alt="C4BG" width={104} height={32} />
          <Image src="/images/logos/feba.svg" alt="Стопански факултет (ФЕБА)" width={210} height={32} />
        </div>
        <p className="text-right">
          © {new Date().getFullYear()} Strategic Finance Forum & Gala. {dictionary.footer.rights}
          <span className="mt-1 block text-xs text-muted/70">
            Created by{" "}
            <a
              href="https://www.nrgtrw.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 transition hover:text-accent"
            >
              NRG
            </a>
          </span>
        </p>
      </footer>

      {showBackToTop ? (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          className="fixed right-5 bottom-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-accent/45 bg-black/80 text-accent shadow-[0_0_20px_rgba(198,168,92,0.25)] backdrop-blur transition hover:border-accent hover:bg-accent hover:text-black"
        >
          ↑
        </motion.a>
      ) : null}
    </main>
  );
}
