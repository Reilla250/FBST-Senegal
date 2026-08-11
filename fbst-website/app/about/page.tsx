import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { BulletList, Card } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description: "Who FBST-Senegal is, our mission, vision, values and who we serve.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHero slug="about" eyebrow="About us" heading="Rooted in Dakar. Led by community.">
        Fondation La Bonne Santé Pour Tous (FBST-Senegal) is a Senegalese, community-based and
        youth-led nonprofit organisation based in Dakar. We work with people and young people
        affected by stigma, mental-health challenges, school exclusion, HIV, violence, poverty
        and barriers to safe services.
      </PageHero>

      <Section eyebrow="Who we are" title="From lived experience to practical action">
        <div className="max-w-3xl space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            FBST was founded in Dakar in 2000 by community members who had seen how stigma,
            broken confidentiality and unsafe services could push people away from care. They
            chose to turn lived experience into practical action, trusted information and
            respectful support.
          </p>
          <p>
            Today, FBST works across youth mental health, education, HIV prevention,
            psychosocial support, protection, peer navigation and community-health
            accountability.
          </p>
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Our mission">
            To protect health, mental wellbeing, dignity and opportunity for people facing
            stigma and exclusion in Senegal through community leadership, safe information,
            psychosocial support, education pathways, confidential referral and partnership
            with trusted services.
          </Card>
          <Card title="Our vision">
            A Senegal where no one is pushed away from care, education or community because of
            stigma, identity, HIV status, mental-health needs, pregnancy, disability, poverty
            or fear.
          </Card>
        </div>
      </Section>

      <Section eyebrow="Our values" title="What guides every conversation">
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
          {[
            ["Dignity", "Every person is more than a diagnosis, identity, pregnancy, school history or difficult moment."],
            ["Community leadership", "People most affected help shape our priorities, delivery and learning."],
            ["Confidentiality", "Privacy is part of health and safety."],
            ["Inclusion", "We recognise that people may face several barriers at the same time."],
            ["Do no harm", "We never expose people in order to help them."],
            ["Accountability", "We listen to feedback and use evidence to improve."],
            ["Hope", "Every interaction should leave a person with a clearer and safer next step."],
          ].map(([title, text]) => (
            <div key={title} className="border-l-2 border-blue-900 dark:border-blue-500 pl-4">
              <p className="font-display text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="deep" eyebrow="Who we serve">
        <BulletList
          items={[
            "Young people aged 10 to 24 facing distress, stigma, school dropout or difficult school return",
            "Pregnant students and young mothers seeking a dignified education pathway",
            "People living with HIV, including those newly diagnosed or disconnected from care",
            "Men who have sex with men (MSM/HSH), sex workers and other key or vulnerable populations",
            "People facing violence, blackmail, forced disclosure, family rejection or unsafe services",
            "People affected by poverty, disability, migration, social isolation or other access barriers",
          ]}
        />
      </Section>

      <Section eyebrow="Official details" title="Organisation details">
        <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-5 max-w-2xl">
          {[
            ["Legal name", "Fondation La Bonne Santé Pour Tous"],
            ["Public name", "FBST-Senegal"],
            ["Registration number", "978"],
            ["Location", "Dakar, Senegal"],
            ["Website", "www.fdnlabonnesantepourtous.org"],
            ["Email", "info@fdnlabonnesantepourtous.org"],
            ["Telephone", "+221 77 857 70 78"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{label}</dt>
              <dd className="text-sm font-semibold text-slate-900 dark:text-slate-100">{value}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}
