import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Successful Projects",
  description: "NOUVEAU DÉPART and Dakar Without Fear Initiative (D-WiFI) — FBST-Senegal's two flagship pathways.",
};

export default function ProjectsIndexPage() {
  return (
    <div>
      <PageHero slug="projects" eyebrow="Successful projects" heading="Two pathways, one commitment to safety.">
        NOUVEAU DÉPART focuses on youth mental wellbeing and dignified education return.
        Dakar Without Fear Initiative (D-WiFI) focuses on HIV stigma, confidential referral
        and continuity of care. The two projects are separate, but both are built on the same
        belief: trust comes before referral.
      </PageHero>

      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="NOUVEAU DÉPART">
            A successfully piloted youth mental-health and school-return pathway for young
            people aged 10 to 24 who face distress, stigma, school dropout, difficult
            reintegration, early pregnancy or social exclusion.
            <div className="mt-4">
              <Link href="/projects/nouveau-depart" className="text-baobab font-semibold text-sm hover:underline">
                Explore NOUVEAU DÉPART →
              </Link>
            </div>
          </Card>
          <Card title="Dakar Without Fear Initiative (D-WiFI)">
            An evidence-backed HIV stigma-reduction and safe-care pathway built on FBST&rsquo;s
            successful 2024-2025 SafeLink work with men who have sex with men (MSM/HSH), people
            living with HIV and other vulnerable communities.
            <div className="mt-4">
              <Link href="/projects/dakar-without-fear" className="text-baobab font-semibold text-sm hover:underline">
                Explore D-WiFI &rarr;
              </Link>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
