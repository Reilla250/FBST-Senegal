import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact and Confidential Support",
  description: "Start a safe, confidential conversation with FBST-Senegal.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero slug="contact" eyebrow="Contact" heading="Start with a safe conversation.">
        Contact FBST for general information, confidential referral support, partnership
        discussions, safeguarding concerns or institutional enquiries. You do not need to
        describe sensitive personal information in the first message.
      </PageHero>

      <Section>
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-800 dark:text-blue-400 mb-3">
                Official contact details
              </p>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-slate-400 dark:text-slate-500">Organisation</dt>
                  <dd className="font-medium">Fondation La Bonne Santé Pour Tous (FBST-Senegal)</dd>
                </div>
                <div>
                  <dt className="text-slate-400 dark:text-slate-500">Location</dt>
                  <dd className="font-medium">Dakar, Senegal</dd>
                </div>
                <div>
                  <dt className="text-slate-400 dark:text-slate-500">Email</dt>
                  <dd className="font-medium">
                    <a href="mailto:info@fdnlabonnesantepourtous.org" className="text-blue-800 dark:text-blue-400 hover:underline">
                      info@fdnlabonnesantepourtous.org
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 dark:text-slate-500">Telephone</dt>
                  <dd className="font-medium">
                    <a href="tel:+221778577078" className="text-blue-800 dark:text-blue-400 hover:underline">
                      +221 77 857 70 78
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 dark:text-slate-500">Website</dt>
                  <dd className="font-medium">www.fdnlabonnesantepourtous.org</dd>
                </div>
                <div>
                  <dt className="text-slate-400 dark:text-slate-500">Registration number</dt>
                  <dd className="font-medium">978</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 p-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              FBST provides information, peer support, navigation and referral. We do not
              provide emergency response, diagnosis or prescribing through the website. For
              urgent medical or safety needs, contact the nearest qualified service.
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
