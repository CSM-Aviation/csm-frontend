/**
 * Renders a JSON-LD <script>. Server component; safe because the payload is our
 * own structured-data object (no user input).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
