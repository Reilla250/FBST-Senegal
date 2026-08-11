import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { BulletList } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Programs",
  description: "FBST-Senegal's six programs supporting the whole person, not only one problem.",
};

const programs = [
  {
    n: "01",
    title: "Youth mental health and school return",
    text: "We support young people aged 10 to 24 through confidential identification, wellbeing circles, individual support plans, family-school mediation and safe referral. The program includes young people who are out of school, returning to school, pregnant, parenting or experiencing stigma and isolation.",
  },
  {
    n: "02",
    title: "HIV prevention and treatment continuity",
    text: "We provide clear HIV prevention and treatment information, confidential testing referrals, treatment re-linkage, adherence support and follow-up. Clinical testing, diagnosis and treatment remain the responsibility of authorised health providers.",
  },
  {
    n: "03",
    title: "Peer navigation and safe linkage to care",
    text: "Trusted and supervised peers help people understand their options, agree on a safe referral plan, reach an appropriate service and receive respectful follow-up. Peer navigators do not diagnose or prescribe.",
  },
  {
    n: "04",
    title: "Sexual and reproductive health support",
    text: "We provide non-judgemental information and referral related to sexual and reproductive health, pre-exposure prophylaxis (PrEP), sexually transmitted infection (STI) services, safer sex, counselling and youth-friendly care.",
  },
  {
    n: "05",
    title: "Rights, protection and anti-stigma action",
    text: "We help people understand confidentiality, informed consent, respectful care and safe ways to seek help after stigma, discrimination, violence, blackmail or forced disclosure. Sensitive cases are handled through confidential and consent-based referral.",
  },
  {
    n: "06",
    title: "Health-system partnership and accountability",
    text: "We work with schools, health facilities, public services, community groups and civil-society partners to improve referrals, confidentiality, respectful communication, service quality and community feedback.",
  },
];

export default function ProgramsPage() {
  return (
    <div>
      <PageHero slug="programs" eyebrow="Our programs" heading="Supporting the whole person, not only one problem.">
        Stigma rarely affects only one part of life. A young person&rsquo;s distress may be
        linked to school exclusion, family pressure, violence or poverty. A person avoiding HIV
        care may also be managing fear of disclosure, treatment fatigue or unsafe service
        experiences.
      </PageHero>

      <Section>
        <div className="space-y-5">
          {programs.map((p) => (
            <div
              key={p.n}
              className="card-hover rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-start gap-5">
                <span
                  className="text-3xl font-extrabold text-blue-900 dark:text-blue-400 flex-shrink-0 leading-none"
                  style={{ fontFamily: "var(--font-data)" }}
                >
                  {p.n}
                </span>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {p.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">{p.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="deep" eyebrow="Commitments" title="Across every program">
        <BulletList
          items={[
            "Youth and community leadership",
            "Gender-responsive and disability-inclusive practice",
            "Safeguarding and child protection",
            "Consent, confidentiality and minimum data collection",
            "Safe referral and do-no-harm communication",
            "Monitoring, learning and accountability",
          ]}
        />
      </Section>
    </div>
  );
}
