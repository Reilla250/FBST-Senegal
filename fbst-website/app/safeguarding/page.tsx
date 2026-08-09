import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { BulletList } from "@/components/ui";

export const metadata: Metadata = {
  title: "Safeguarding, Confidentiality and Privacy",
  description: "How FBST-Senegal protects the people who contact, participate in or work with the organisation.",
};

export default function SafeguardingPage() {
  return (
    <div>
      <PageHero slug="safeguarding" eyebrow="Safeguarding & privacy" heading="Safety, dignity, consent and confidentiality — in every program.">
        FBST is committed to protecting every person who contacts, participates in or works
        with our organisation.
      </PageHero>

      <Section eyebrow="What we protect">
        <BulletList
          items={[
            "Names and contact details",
            "Mental-health and psychosocial information",
            "HIV status, treatment information and health history",
            "Sexual orientation, gender identity and relationship information",
            "Pregnancy, school history and family circumstances",
            "Information about violence, blackmail, forced disclosure or protection needs",
            "Safe-space locations and sensitive referral contacts",
          ]}
        />
      </Section>

      <Section tone="deep" eyebrow="How we protect people">
        <BulletList
          items={[
            "We explain confidentiality and its safety limits before collecting sensitive information.",
            "We use informed consent and age-appropriate assent.",
            "We collect only the minimum information needed.",
            "We use coded or anonymised records whenever possible.",
            "We restrict access to sensitive information.",
            "We refer serious protection or medical concerns through approved pathways.",
            "We do not publish personal stories or photographs without clear consent and a safeguarding review.",
          ]}
        />
      </Section>

      <Section eyebrow="Children and young people">
        <p className="max-w-3xl text-ink/85 leading-relaxed">
          Children and young people receive age-appropriate information, consent or assent
          processes, safe participation options and referral when there is risk of violence,
          exploitation, severe distress, abuse or self-harm. Peer leaders never manage
          high-risk cases alone.
        </p>
      </Section>

      <Section tone="deep" eyebrow="How to raise a concern">
        <p className="max-w-3xl text-ink/85 leading-relaxed">
          A person may raise a safeguarding, privacy or service-quality concern confidentially
          through FBST&rsquo;s approved contact channel. Concerns should be acknowledged,
          handled by authorised staff and referred when specialist action is required.
        </p>
      </Section>

      <Section>
        <div className="rounded-2xl border border-baobab/30 bg-baobab/10 p-6 sm:p-8 max-w-3xl">
          <p className="font-display text-lg font-semibold text-baobab mb-2">Emergency note</p>
          <p className="text-ink/85 leading-relaxed">
            FBST is not an emergency service. If someone is in immediate danger or requires
            urgent medical care, contact the nearest qualified health facility or local
            emergency service.
          </p>
        </div>
      </Section>
    </div>
  );
}
