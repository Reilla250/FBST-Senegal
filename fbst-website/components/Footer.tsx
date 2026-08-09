import Link from "next/link";
import { footerNav } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="bg-baobab-dark text-sand mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <span className="block font-display text-xl font-semibold text-baobab mb-3">
            FBST-Senegal
          </span>
          <p className="text-sand/85 text-sm leading-relaxed max-w-sm">
            Fondation La Bonne Santé Pour Tous (FBST-Senegal) is a community-rooted,
            youth-led organisation in Dakar advancing mental wellbeing, education
            inclusion, HIV prevention, confidential referral, psychosocial support
            and protection.
          </p>
        </div>

        <div>
          <span className="block text-xs uppercase tracking-widest text-sand/60 mb-3">
            Quick links
          </span>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sand/85 hover:text-baobab transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="block text-xs uppercase tracking-widest text-sand/60 mb-3">
            Contact
          </span>
          <ul className="space-y-2 text-sm text-sand/85">
            <li>Dakar, Senegal</li>
            <li>Registration No. 978</li>
            <li>
              <a href="mailto:info@fdnlabonnesantepourtous.org" className="hover:text-baobab transition-colors">
                info@fdnlabonnesantepourtous.org
              </a>
            </li>
            <li>
              <a href="tel:+221778577078" className="hover:text-baobab transition-colors">
                +221 77 857 70 78
              </a>
            </li>
            <li>www.fdnlabonnesantepourtous.org</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand/15">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-6 text-xs text-sand/70 leading-relaxed space-y-2">
          <p>
            FBST provides information, peer support, navigation and referral. Clinical and
            emergency services are delivered by qualified providers. We protect confidentiality
            and do not publish participant identities or sensitive referral locations.
          </p>
          <p>© {new Date().getFullYear()} Fondation La Bonne Santé Pour Tous (FBST-Senegal). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
