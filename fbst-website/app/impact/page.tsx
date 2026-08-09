import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import StatGrid from "@/components/StatGrid";
import { BulletList } from "@/components/ui";

export const metadata: Metadata = {
  title: "Impact",
  description: "Documented results from NOUVEAU DÉPART and the SafeLink foundation for D-WiFI, reported honestly.",
};

export default function ImpactPage() {
  return (
    <div>
      <PageHero slug="impact" eyebrow="Impact" heading="Results reported honestly, kept separate from future plans.">
        We use numbers to show reach and change, but we also ask whether people felt safer,
        more respected and better able to take the next step.
      </PageHero>

      <Section eyebrow="NOUVEAU DÉPART" title="Successful 2024 pilot">
        <StatGrid
          stats={[
            { value: "210 / 181", label: "young people enrolled; completed the main pathway" },
            { value: "86%", label: "completion rate" },
            { value: "69%", label: "improved psychosocial wellbeing" },
            { value: "63%", label: "reduced shame, isolation or perceived stigma" },
            { value: "74%", label: "improved social support" },
            { value: "48%", label: "of out-of-school or returning young people made verified educational progress" },
            { value: "63%", label: "of pregnant students or young mothers maintained or restored an education connection" },
            { value: "81%", label: "of trained adults improved knowledge or attitudes" },
            { value: "27", label: "sensitive situations safely identified and referred" },
          ]}
        />
      </Section>

      <Section tone="deep" eyebrow="D-WiFI" title="SafeLink foundation: successful 2024-2025 implementation">
        <StatGrid
          stats={[
            { value: "1,847", label: "community members reached with HIV prevention and stigma-reduction messages" },
            { value: "683", label: "MSM/HSH supported through peer outreach and safe-space conversations" },
            { value: "436", label: "people referred for HIV testing and counselling" },
            { value: "127", label: "people living with HIV re-linked to treatment or adherence support" },
            { value: "31", label: "peer educators trained" },
            { value: "18", label: "health-service focal persons engaged on confidentiality" },
            { value: "74", label: "stigma, violence or disclosure-risk cases documented for safe referral" },
          ]}
        />
      </Section>

      <Section eyebrow="What these results mean">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <p className="text-ink/85 leading-relaxed">
            For NOUVEAU DÉPART, success means a young person feels less alone, receives safer
            support and takes a realistic step toward wellbeing and education.
          </p>
          <p className="text-ink/85 leading-relaxed">
            For D-WiFI, success means a person who feared services can ask questions safely,
            accept a referral, return to treatment or seek protection without being exposed.
          </p>
        </div>
      </Section>

      <Section tone="deep" eyebrow="How we measure responsibly">
        <BulletList
          items={[
            "We collect only the information needed for support, learning and accountability.",
            "We use coded or anonymised records wherever possible.",
            "We separate completed achievements from future targets.",
            "We include community feedback, not only attendance numbers.",
            "We protect identities in public reports and stories.",
          ]}
        />
      </Section>
    </div>
  );
}
