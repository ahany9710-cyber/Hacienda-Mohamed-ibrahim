import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";

export function SeoJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "هاسيندا راس الحكمة — Palm Hills",
    alternateName: [
      "Hacienda Ras El Hekma",
      "Palm Hills Hacienda Ras El Hekma",
      "مشروع هاسيندا راس الحكمة",
      "Hacienda Palm Hills",
    ],
    description: HACIENDA.location.description,
    url: "https://hacienda-ras-el-hekma.com/projects/hacienda-ras-el-hekma",
    parentOrganization: {
      "@type": "Organization",
      name: "Palm Hills Developments",
      alternateName: ["بالم هيلز", "Palm Hills Egypt", "شركة Palm Hills"],
    },
    areaServed: {
      "@type": "Place",
      name: "Ras El Hekma, North Coast, Egypt",
      alternateName: [
        "راس الحكمة",
        "الساحل الشمالي",
        "Palm Hills North Coast",
        "Palm Hills Sahel",
      ],
    },
    keywords: HACIENDA.seo.keywords.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
