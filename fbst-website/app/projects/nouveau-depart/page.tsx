import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import StatGrid from "@/components/StatGrid";
import StepList from "@/components/StepList";
import { BulletList, CTA } from "@/components/ui";

export const metadata: Metadata = {
  title: "NOUVEAU DÉPART",
  description: "FBST-Senegal's successfully piloted youth mental-health and school-return project in Dakar.",
};

export default function NouveauDepartPage() {
  return (
    <div>
      <PageHero slug="projects/nouveau-depart" eyebrow="Successful project" heading="A difficult season should not decide a young person's whole future.">
        NOUVEAU DÉPART is FBST&rsquo;s successfully piloted youth mental-health and
        school-return project in Dakar. It supports young people aged 10 to 24 who face
        psychosocial distress, mental-health stigma, school dropout, difficult reintegration,
        early pregnancy, young motherhood, harassment, poverty, disability or social isolation.
      </PageHero>

      <Section eyebrow="About the project" title="Language that never labels">
        <p className="max-w-3xl text-ink/85 leading-relaxed">
          The project uses simple, non-medicalising language centred on wellbeing, confidence,
          safety, listening and the future. It does not label young people. It helps them find
          support, rebuild trust and take a realistic step toward education and wellbeing.
        </p>
      </Section>

      <Section tone="deep" eyebrow="Who the project supports">
        <BulletList
          items={[
            "Young people who have left school or are at risk of dropping out",
            "Young people returning to school after a difficult period",
            "Pregnant students and young mothers",
            "Young people experiencing shame, isolation, harassment or family rejection",
            "Young people living with disability, poverty or other barriers",
          ]}
        />
      </Section>

      <Section eyebrow="How it works" title="A confidential, five-step pathway">
        <StepList
          steps={[
            { title: "Confidential identification", text: "Through schools, peers, community relays, mothers' groups, social services and health services." },
            { title: "Wellbeing circles", text: "On stress, shame, self-worth, help-seeking, harassment, safety and hope." },
            { title: "Individual plans", text: "Covering wellbeing, family mediation, school return or retention, protection and referral." },
            { title: "School-family-community dialogue", text: "To reduce blame and create safer support around the young person." },
            { title: "Safe referral", text: "To qualified mental-health, health, education, social or protection services when needed." },
          ]}
        />
      </Section>

      <Section tone="deep" eyebrow="Documented 2024 pilot results" title="What the pilot achieved">
        <StatGrid
          stats={[
            { value: "210", label: "young people aged 10-24 enrolled in the pilot" },
            { value: "181", label: "completed the main pathway — an 86% completion rate" },
            { value: "69%", label: "of completers improved their psychosocial wellbeing" },
            { value: "63%", label: "reported less shame, isolation or perceived stigma" },
            { value: "74%", label: "reported stronger social support" },
            { value: "48%", label: "of out-of-school or returning young people (82 of 170) made verified progress toward education" },
            { value: "63%", label: "of pregnant students or young mothers (25 of 40) maintained or restored an education connection" },
            { value: "81%", label: "of 52 trained teachers, educators and community relays improved knowledge or attitudes" },
            { value: "27", label: "sensitive cases involving stigma, harassment, distress or protection needs identified and referred" },
          ]}
        />
      </Section>

      <Section eyebrow="Why it connected" title="Strengths, choices and a future">
        <p className="max-w-3xl text-ink/85 leading-relaxed">
          Young people were not reduced to a mental-health label, pregnancy or school failure.
          They were treated as people with strengths, choices and a future. The language of
          wellbeing, trust and hope made it easier to ask for help without shame.
        </p>
      </Section>

      <Section tone="deep" eyebrow="Looking ahead">
        <p className="max-w-3xl text-ink/85 leading-relaxed">
          FBST is working to expand and strengthen NOUVEAU DÉPART while protecting its human,
          confidential and youth-led character. Future growth will focus on quality,
          safeguarding, stronger measurement, school and community adoption, and sustainable
          referral pathways.
        </p>
      </Section>

      <Section>
        <CTA
          heading="Are you a school, community organisation, donor or technical partner interested in youth mental health and dignified school return?"
          text="Partner with FBST to help more young people rebuild confidence and opportunity."
          primary={{ label: "Partner on NOUVEAU DÉPART", href: "/partnerships" }}
        />
      </Section>
    </div>
  );
}
