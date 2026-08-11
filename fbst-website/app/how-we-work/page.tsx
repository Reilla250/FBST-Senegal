import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { BulletList, Card } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How We Work",
  description: "The principles behind every FBST-Senegal program and referral pathway.",
};

const principles = [
  ["Community-led", "People most affected by stigma and exclusion help shape our language, activities, referral choices, feedback and improvement. We do not design solutions from a distance."],
  ["Confidential and consent-based", "People choose what to share, how they wish to be contacted and whether they want a referral. We collect only the information needed for the agreed support."],
  ["Focused on the whole person", "Health, mental wellbeing, education, family relationships, safety and social conditions are connected. We therefore look at the person's full situation and help identify a realistic next step."],
  ["Built on trusted partnerships", "FBST does not create unnecessary parallel services. We strengthen links between communities and qualified health, education, psychosocial, social and protection services."],
  ["Practical and respectful", "Our work uses clear language, safe conversations, peer support, individual planning, referral, accompaniment and follow-up. We avoid blame, pity and public exposure."],
  ["Always learning", "We use anonymous feedback, referral data, activity records and community reviews to identify what is working, what feels unsafe and what must change."],
];

export default function HowWeWorkPage() {
  return (
    <div>
      <PageHero slug="how-we-work" eyebrow="How we work" heading="Six principles behind every conversation.">
        The same approach carries across every program: listen first, protect privacy, and
        strengthen the paths that already exist rather than build new ones from a distance.
      </PageHero>

      <Section>
        <div className="grid sm:grid-cols-2 gap-6">
          {principles.map(([title, text]) => (
            <Card key={title} title={title}>{text}</Card>
          ))}
        </div>
      </Section>

      <Section tone="deep" eyebrow="What FBST does not do">
        <BulletList
          items={[
            "We do not diagnose or prescribe.",
            "We do not force people to disclose HIV status, sexual orientation, pregnancy, mental-health concerns or personal history.",
            "We do not publish participant identities, safe-space locations or sensitive referral details.",
            "We do not promise a service that has not been confirmed and activated.",
            "We do not replace emergency, clinical or specialist services.",
          ]}
        />
      </Section>
    </div>
  );
}
