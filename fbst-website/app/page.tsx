import Link from "next/link";
import Section from "@/components/Section";
import StatGrid from "@/components/StatGrid";
import StepList from "@/components/StepList";
import PageHero from "@/components/PageHero";
import { CTA } from "@/components/ui";

const partners = [
  "Schools",
  "Health clinics",
  "Youth groups",
  "Community networks",
  "Peer leaders",
];

const features = [
  {
    title: "Confidential care pathways",
    description: "Peer-led guidance and protected referral that helps people access support without fear.",
  },
  {
    title: "Youth wellbeing support",
    description: "Integrated school return, mental health and protection services designed for young people.",
  },
  {
    title: "Stigma reduction initiatives",
    description: "Evidence-informed programmes that strengthen health access and community trust.",
  },
];

export default function Home() {
  return (
    <div className="space-y-24">
      <PageHero
        slug="home"
        eyebrow="Community wellbeing"
        heading="Trusted pathways to care, education and protection in Dakar."
        text="FBST-Senegal supports young people and communities with confidential peer guidance, safe referrals and strength-based programmes that reduce stigma and improve outcomes."
        ctaLabel="Request support"
        ctaHref="/contact"
      />

      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-baobab">Trusted partners</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-baobab-dark sm:text-4xl">
                Schools, clinics and community networks partner with FBST for safer, more effective support.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {partners.map((item) => (
                <div key={item} className="rounded-3xl border border-baobab/10 bg-card px-6 py-6 text-center text-sm font-semibold text-baobab-dark shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="What we offer" title="Tailored services for clients and partners">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-baobab/10 bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="font-display text-xl font-semibold text-baobab-dark">{feature.title}</h3>
              <p className="mt-4 text-sm leading-7 text-ink/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="deep" eyebrow="Impact" title="Measured outcomes with real community value">
        <StatGrid
          stats={[
            { value: "210", label: "young people joined the NOUVEAU DÉPART pilot" },
            { value: "181", label: "completed the NOUVEAU DÉPART pathway" },
            { value: "69%", label: "reported improved psychosocial wellbeing" },
            { value: "1,847", label: "community members reached with stigma-reduction information" },
          ]}
        />
      </Section>

      <Section eyebrow="How it works" title="A respectful process for every person">
        <StepList
          steps={[
            { text: "We listen confidentially and explain how support is protected." },
            { text: "We identify the safest next step for education, health or protection." },
            { text: "We connect people to trusted services and referral partners." },
            { text: "We follow up respectfully and keep people in control." },
          ]}
        />
      </Section>

      <Section>
        <CTA
          heading="Ready to strengthen your support pathways?"
          text="Contact FBST to request confidential support, discuss partnerships or explore how our programmes can help your community succeed."
          primary={{ label: "Request support", href: "/contact" }}
          secondary={{ label: "Partner with us", href: "/partnerships" }}
        />
      </Section>
    </div>
  );
}
