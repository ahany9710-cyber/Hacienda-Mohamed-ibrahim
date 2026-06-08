import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";

export function SeoContext() {
  return (
    <section
      className="ph-seo-context w-full px-4 sm:px-6 lg:px-8 pb-10 md:pb-14 bg-sand"
      aria-label="معلومات إضافية عن المشروع"
    >
      <div className="container mx-auto max-w-3xl">
        <details className="ph-seo-details">
          <summary>{HACIENDA.seo.detailsSummary}</summary>
          <div className="ph-seo-details-body">
            {HACIENDA.seo.contextParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
