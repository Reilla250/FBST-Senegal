import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { Card, ButtonRow } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Partner, fund, volunteer or request support from FBST-Senegal.",
};

export default function GetInvolvedPage() {
  return (
    <div>
      <PageHero slug="get-involved" eyebrow="Get involved" heading="There are several safe ways to work with FBST.">
        Whether you lead an institution, fund community work, want to volunteer, or need to
        make a referral yourself — there is a starting point below.
      </PageHero>

      <Section>
        <div className="grid sm:grid-cols-2 gap-6">
          <Card title="Partner with us">
            Schools, health services, community organisations, public institutions,
            civil-society groups and technical partners can work with FBST to strengthen safe
            support and referral pathways in Dakar.
          </Card>
          <Card title="Fund community-led impact">
            Grants, institutional support and responsible in-kind contributions can help FBST
            expand youth mental-health support, school-return pathways, HIV stigma reduction,
            peer navigation, safeguarding, referral quality and community accountability.
          </Card>
          <Card title="Volunteer or become a peer leader">
            FBST may engage volunteers and peer leaders when there is a defined role,
            appropriate screening, training, supervision and safeguarding. Peer roles are based
            on trust and lived experience, but they do not replace professional services.
          </Card>
          <Card title="Refer someone or request support">
            A young person, caregiver, school, health provider or community organisation may
            contact FBST to discuss information, referral or partnership. The person seeking
            support should be involved in the decision wherever it is safe and appropriate.
          </Card>
        </div>
      </Section>

      <Section tone="deep" eyebrow="Support our work">
        <p className="max-w-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Use only the approved contribution or donation channel published by FBST. Do not send
          money to an individual account or an unverified link.
        </p>
        <ButtonRow
          buttons={[
            { label: "Partner with us", href: "/partnerships" },
            { label: "Request support", href: "/contact", variant: "outline" },
            { label: "Support our work", href: "/contact", variant: "outline" },
          ]}
        />
      </Section>
    </div>
  );
}
