import Link from "next/link";
import Section from "@/components/Section";
import StatGrid from "@/components/StatGrid";
import StepList from "@/components/StepList";
import PageHero from "@/components/PageHero";
import { CTA } from "@/components/ui";

const partners = ["Schools", "Health clinics", "Youth groups", "Community networks", "Peer leaders"];

const features = [
  {
    icon: "🤝",
    title: "Confidential care pathways",
    description: "Peer-led guidance and protected referral that helps people access support without fear.",
  },
  {
    icon: "💚",
    title: "Youth wellbeing support",
    description: "Integrated school return, mental health and protection services designed for young people.",
  },
  {
    icon: "🌍",
    title: "Stigma reduction initiatives",
    description: "Evidence-informed programmes that strengthen health access and community trust.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <PageHero
        slug="home"
        eyebrow="Community wellbeing"
        heading="Trusted pathways to care, education and protection in Dakar."
        text="FBST-Senegal supports young people and communities with confidential peer guidance, safe referrals and strength-based programmes that reduce stigma and improve outcomes."
        ctaLabel="Request support"
        ctaHref="/contact"
      />

      {/* Partners strip */}
      <section style={{ background: "#F0F2F5", borderTop: "1px solid #E0E3E8", borderBottom: "1px solid #E0E3E8" }}>
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#08B4D0" }}>
                Trusted partners
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: "#1E2430" }}>
                Schools, clinics and community networks partner with FBST for safer, more effective support.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {partners.map((item) => (
                <div
                  key={item}
                  className="card-hover rounded border px-5 py-4 text-center text-sm font-semibold"
                  style={{ background: "#FFFFFF", borderColor: "#E0E3E8", color: "#1E2430" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section eyebrow="What we offer" title="Tailored services for clients and partners">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-hover rounded border p-7"
              style={{ background: "#FFFFFF", borderColor: "#E0E3E8", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            >
              {/* Cyan accent bar */}
              <div className="w-8 h-0.5 mb-4" style={{ background: "#08B4D0" }} />
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#1E2430" }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555C68" }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
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

      {/* How it works */}
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

      {/* CTA */}
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
