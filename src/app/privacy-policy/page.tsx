import type { Metadata } from "next";
import { privacy, type PrivacyBlock, type ListItem } from "@/content/privacy";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBand } from "@/components/layout/SectionBand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CSM Aviation collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

function renderListItem(item: ListItem, key: number) {
  if (typeof item === "string") {
    return (
      <li key={key} className="text-body text-ink-soft">
        {item}
      </li>
    );
  }
  return (
    <li key={key} className="text-body text-ink-soft">
      {item.label && <span className="font-semibold text-ink">{item.label} </span>}
      {item.text}
    </li>
  );
}

function Block({ block }: { block: PrivacyBlock }) {
  switch (block.type) {
    case "h3":
      return <h3 className="mt-s4 font-display text-h3 font-semibold text-ink">{block.text}</h3>;
    case "inShort":
      return (
        <p className="border-l-2 border-gold pl-s4 text-body italic text-ink-soft">
          <span className="font-semibold not-italic text-saddle">In Short:</span> {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="flex list-disc flex-col gap-s2 pl-s5">
          {block.items.map((item, i) => renderListItem(item, i))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-small">
            <thead>
              <tr className="border-b border-line">
                {block.columns.map((col) => (
                  <th key={col} className="py-s3 pr-s4 align-top font-semibold text-ink">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-line align-top">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={
                        c === 0
                          ? "py-s3 pr-s4 font-medium text-ink"
                          : "py-s3 pr-s4 text-ink-soft"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "p":
    default:
      return (
        <p className="whitespace-pre-line text-body text-ink-soft">
          {block.label && <span className="font-semibold text-ink">{block.label} </span>}
          {block.text}
        </p>
      );
  }
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`Last updated ${privacy.updated}.`}
      />

      <SectionBand tone="light">
        <div className="flex max-w-measure flex-col gap-s5">
          {/* Privacy notice preamble */}
          {privacy.intro.map((para, i) => (
            <p key={i} className="text-body text-ink-soft">
              {para}
            </p>
          ))}

          {privacy.sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-s7 flex flex-col gap-s4">
              <h2 className="font-display text-h2 font-semibold text-ink">{section.heading}</h2>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}
        </div>
      </SectionBand>
    </>
  );
}
