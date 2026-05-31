import { Phone } from "lucide-react";
import { site } from "@/content/site";

/**
 * Always-available Call action on mobile (§02): the 24/7 promise should never
 * be more than a tap away. A floating, ≥44px near-square action, hidden once
 * the desktop nav (with its own CTA) appears.
 */
export function MobileCallBar() {
  return (
    <a
      href={site.phone.href}
      aria-label={`Call CSM Aviation, ${site.phone.display}`}
      className="fixed bottom-s5 right-s5 z-40 flex h-12 items-center gap-s2 rounded-md bg-petrol px-s4 text-paper-on-dark shadow-float transition-colors duration-fast hover:bg-petrol-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus lg:hidden"
    >
      <Phone size={20} strokeWidth={1.75} />
      <span className="text-body font-semibold">Call</span>
    </a>
  );
}
