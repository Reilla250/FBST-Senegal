import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import StatGrid from "@/components/StatGrid";
import StepList from "@/components/StepList";
import { BulletList, CTA } from "@/components/ui";

export const metadata: Metadata = {
  title: "Dakar Without Fear Initiative (D-WiFI)",
  description: "FBST-Senegal's community-led HIV stigma-reduction and safe-care project, built on the SafeLink pathway.",
};

export default function DWiFIPage() {
  return (
    <div>
      <PageHero slug="projects/dakar-without-fear" eyebrow="Successful project" heading="Care should be easier to reach than fear.">
        Dakar Without Fear Initiative (D-WiFI) is FBST&rsquo;s community-led HIV
        stigma-reduction and safe-care project for men who have sex with men (MSM/HSH) and
        other people facing fear, discrimination or unsafe service experiences in Dakar.
      </PageHero>

      <Section eyebrow="About the project" title="Built on a proven foundation">
        <p className="max-w-3xl text-ink/85 leading-relaxed">
          D-WiFI is built on FBST&rsquo;s successful 2024-2025 SafeLink work. The project
          recognises that services can exist while people still stay away because they fear
          being recognised, judged, exposed, blackmailed or treated badly.
        </p>
      </Section>

      <Section tone="deep" eyebrow="Who the project supports">
        <BulletList
          items={[
            "MSM/HSH who are hidden, newly diagnosed, out of care or afraid to test",
            "People living with HIV who need treatment re-linkage or adherence support",
            "People affected by violence, blackmail, forced disclosure or family rejection",
            "People whose vulnerability also involves youth, sex work, migration, disability, poverty or substance use",
          ]}
        />
      </Section>

      <Section eyebrow="The SafeLink pathway" title="Trust before referral, at every step">
        <StepList
          steps={[
            { title: "A discreet start", text: "A trusted peer begins a discreet and respectful conversation." },
            { title: "The person chooses", text: "The person chooses what information to share and what support they want." },
            { title: "A safe plan, with consent", text: "FBST agrees a safe contact method and coded referral plan with the person's consent." },
            { title: "Linkage to trusted care", text: "The person is linked to a trusted service for HIV testing, treatment, PrEP, STI care, psychosocial support or protection." },
            { title: "Respectful follow-up", text: "FBST follows up respectfully and uses anonymous feedback to improve service safety." },
          ]}
        />
      </Section>

      <Section tone="deep" eyebrow="Documented 2024-2025 results" title="What SafeLink achieved">
        <StatGrid
          stats={[
            { value: "1,847", label: "community members received HIV prevention and stigma-reduction information" },
            { value: "683", label: "MSM/HSH received peer-led outreach and safe-space support" },
            { value: "436", label: "people referred for HIV testing and counselling" },
            { value: "127", label: "people living with HIV reconnected to treatment or adherence support" },
            { value: "31", label: "peer educators trained" },
            { value: "18", label: "health-service focal persons engaged on confidentiality and non-discrimination" },
            { value: "74", label: "cases involving stigma, violence or disclosure risk documented for safe referral" },
          ]}
        />
      </Section>

      <Section eyebrow="What made it work" title="Trust came before referral">
        <p className="max-w-3xl text-ink/85 leading-relaxed">
          People were more willing to test, return to treatment or ask for support when they
          were approached by peers who understood their fears and protected their privacy.
          The SafeLink approach turns confidentiality, respect and follow-up into practical
          parts of care.
        </p>
      </Section>

      <Section tone="deep" eyebrow="Looking ahead">
        <p className="max-w-3xl text-ink/85 leading-relaxed">
          FBST is strengthening D-WiFI to reach more people, train additional peer navigators,
          improve trusted referral pathways and help service providers strengthen
          confidentiality, respectful communication and accountability.
        </p>
      </Section>

      <Section>
        <CTA
          heading="Are you a health service, HIV organisation, protection actor, donor or community partner interested in safer access to care?"
          text="Work with FBST to help people move from fear to care without exposure or judgement."
          primary={{ label: "Partner on D-WiFI", href: "/partnerships" }}
        />
      </Section>
    </div>
  );
}
