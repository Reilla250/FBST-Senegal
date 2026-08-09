import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { BulletList, Card, CTA } from "@/components/ui";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Partner with FBST-Senegal on youth wellbeing, HIV prevention, protection and service quality.",
};

export default function PartnershipsPage() {
  return (
    <div>
      <PageHero slug="partnerships" eyebrow="Partnerships" heading="Stronger pathways require trusted partners.">
        FBST works with organisations that share our commitment to dignity, confidentiality,
        community leadership and practical results. We welcome partnerships that strengthen
        youth wellbeing, education return, HIV prevention, treatment continuity, protection
        and service quality.
      </PageHero>

      <Section>
        <div className="grid sm:grid-cols-2 gap-6">
          <Card title="Education and youth partners">
            Schools, education authorities, orientation services, youth organisations,
            community relays, mothers&rsquo; groups and social services can help identify young
            people safely, reduce stigma, support school return and strengthen referral
            pathways.
          </Card>
          <Card title="Health and HIV partners">
            Health facilities, HIV programs, public-health structures, community-health
            organisations and trained providers can strengthen confidential testing referral,
            treatment continuity, PrEP and STI information, psychosocial support and respectful
            service delivery.
          </Card>
          <Card title="Protection and psychosocial partners">
            Legal-aid, protection, mental-health, social-service and safeguarding actors help
            ensure that people facing violence, blackmail, forced disclosure, severe distress,
            abuse or exploitation receive appropriate specialist support.
          </Card>
          <Card title="Donors and technical partners">
            Funders and technical partners can support program quality, scale, evidence,
            safeguarding, digital security, monitoring, peer training and sustainable
            community-to-service pathways.
          </Card>
        </div>
      </Section>

      <Section tone="deep" eyebrow="Ways to partner">
        <BulletList
          items={[
            "Fund or co-design a project",
            "Provide technical assistance or training",
            "Host or strengthen a referral pathway",
            "Support school or community activities",
            "Improve service confidentiality and accessibility",
            "Contribute equipment, venues or professional time",
            "Support research, monitoring or learning",
          ]}
        />
      </Section>

      <Section eyebrow="Our partnership promise">
        <p className="max-w-3xl text-slate-600 dark:text-slate-300 leading-relaxed">
          We define roles clearly, protect participant information, share only anonymised
          learning, avoid duplication and keep community safety at the centre of every
          partnership.
        </p>
      </Section>

      <Section>
        <CTA heading="Discuss a partnership" primary={{ label: "Discuss a partnership", href: "/contact" }} />
      </Section>
    </div>
  );
}
