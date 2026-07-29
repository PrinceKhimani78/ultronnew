/**
 * Serialises a schema.org object into a `<script type="application/ld+json">`.
 *
 * A native `<script>` rather than `next/script`: JSON-LD is data, not executable
 * code, and does not want a loading strategy.
 *
 * `<` is escaped to its unicode form. Without it, a content string containing
 * `</script>` would close the tag early and turn structured data into an XSS
 * vector — the copy in `content/` is trusted today, but this component will
 * eventually be handed database-backed blog content.
 */

type JsonLdProps = {
  /** A schema.org object, including its `@context` and `@type`. */
  schema: Record<string, unknown>;
};

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}
