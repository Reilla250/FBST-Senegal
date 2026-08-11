import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { BulletList } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News and Resources",
  description: "Practical, non-identifying resources on youth wellbeing, HIV literacy and safeguarding from FBST-Senegal.",
};

export default function ResourcesPage() {
  return (
    <div>
      <PageHero slug="resources" eyebrow="News and resources" heading="Practical information that protects, not exposes.">
        FBST shares practical, non-identifying information that helps communities, schools and
        services reduce stigma, protect confidentiality and improve access to support.
      </PageHero>

      <Section eyebrow="Recommended resource categories">
        <BulletList
          items={[
            "Youth mental health and wellbeing",
            "School return and inclusion",
            "HIV prevention and treatment literacy",
            "Peer navigation and referral",
            "Sexual and reproductive health",
            "Safeguarding and confidentiality",
            "Community stories and learning, shared without identifying participants",
            "Reports, briefs and partner resources",
          ]}
        />
      </Section>

      <Section tone="deep">
        <p className="max-w-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
          Read updates from FBST&rsquo;s community health, youth wellbeing, education and
          anti-stigma work in Dakar. Every public story is reviewed to protect dignity, privacy
          and safety.
        </p>
      </Section>

      <Section eyebrow="Editorial safety rule">
        <p className="max-w-3xl text-slate-600 dark:text-slate-300 leading-relaxed">
          FBST will not publish participant names, HIV status, sexual orientation, school
          identity, safe-space location or sensitive personal stories without clear consent
          and a safeguarding review. Learning should never place a person at risk.
        </p>
      </Section>
    </div>
  );
}
