/**
 * Compose a prefilled mailto: link. No backend is in scope for this build
 * (only the fleet API is used, build spec §00), so request forms submit by
 * opening the visitor's mail client with everything filled in — a real,
 * working path. TODO(§10): wire to a transactional endpoint/email service
 * before launch if a server submission is preferred.
 */
export function buildMailto(
  to: string,
  subject: string,
  fields: Record<string, string | undefined>,
): string {
  const body = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
