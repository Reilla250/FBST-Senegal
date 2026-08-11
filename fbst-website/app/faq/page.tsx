import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import FaqAccordion from "@/components/FaqAccordion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ | FBST Senegal",
  description: "Frequently asked questions about FBST Senegal services, privacy, and contact.",
};

const faqs: [string, string][] = [
  ["What is FBST?", "FBST-Senegal is a community-based, youth-led nonprofit organisation in Dakar working on youth mental health, school return, HIV prevention, peer navigation, psychosocial support, protection and safe access to services."],
  ["Does FBST provide clinical treatment?", "No. FBST provides information, peer support, navigation, referral and follow-up. Testing, diagnosis, prescribing and clinical treatment are provided by authorised health professionals and facilities."],
  ["Who can contact FBST?", "Young people, adults, caregivers, schools, health providers, community organisations, donors and partners may contact FBST. Support depends on the request, current capacity and available referral pathways."],
  ["Will my information be confidential?", "FBST collects only the information needed for the agreed purpose and restricts access to sensitive data. Confidentiality may have limits when someone is in immediate danger or safeguarding action is legally or ethically required."],
  ["Do I need to disclose my HIV status, sexual orientation or mental-health concern?", "No. You do not have to disclose sensitive information publicly or in the first contact. An authorised team member will explain what information is needed before a referral or support plan is agreed."],
  ["What is a peer navigator?", "A peer navigator is a trained and supervised community member who listens, explains options, supports safe referral and follows up respectfully. Peer navigators do not diagnose, prescribe or replace professionals."],
  ["What is NOUVEAU DÉPART?", "NOUVEAU DÉPART is FBST's successfully piloted youth mental-health and school-return pathway for young people facing distress, stigma, school dropout, difficult reintegration, early pregnancy or social exclusion."],
  ["What is D-WiFI?", "Dakar Without Fear Initiative is FBST's HIV stigma-reduction and safe-care project. It is built on successful SafeLink work using trusted peers, coded referrals, psychosocial support, treatment follow-up, protection pathways and community feedback."],
  ["What does “successful project” mean on this website?", "It means the project or the approach behind it has documented pilot or implementation results. It does not automatically mean that every proposed expansion has already received funding."],
  ["Can my organisation partner with FBST?", "Yes. FBST welcomes suitable partnerships with schools, health services, civil-society organisations, public institutions, funders and technical partners that share our safeguarding and confidentiality standards."],
  ["Can I donate online?", "Use only an official donation or contribution channel published and verified by FBST. Never send funds through an unverified personal account or link."],
];

export default function FaqPage() {
  return (
    <div>
      <PageHero slug="faq" eyebrow="FAQ" heading="Frequently asked questions.">
        Straight answers about how FBST works, what confidentiality means in practice, and how
        to get in touch.
      </PageHero>

      <Section>
        <FaqAccordion faqs={faqs} />
      </Section>
    </div>
  );
}
