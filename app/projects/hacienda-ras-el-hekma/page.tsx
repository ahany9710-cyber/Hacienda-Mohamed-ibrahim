import type { Metadata } from "next";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";
import { PalmHillsLanding } from "./PalmHillsLanding";
import { SeoJsonLd } from "./SeoJsonLd";

export const metadata: Metadata = {
  title: { absolute: "هاسيندا راس الحكمة — بالم هيلز · الساحل الشمالي" },
  description:
    "مشروع هاسيندا راس الحكمة (Hacienda Ras El Hekma) من Palm Hills Egypt على الساحل الشمالي — هاسيندا ويست، هاسيندا ووترز، هاسيندا باي. شاطئ ٤.٨ كم، تقسيط حتى ١٠ سنوات، EOI من ٢٥٠ ألف جنيه.",
  keywords: [...HACIENDA.seo.keywords],
  openGraph: {
    title: "هاسيندا راس الحكمة — Palm Hills North Coast",
    description:
      "Hacienda Ras El Hekma location: كيلو ٢٣٨ راس الحكمة. Palm Hills Hacienda Ras El Hekma — وحدات، أسعار، وبروشور هاسيندا ويست وHacienda Waters.",
    images: [
      {
        url: "/hacienda/brochure/hero-render.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/prototype/fonts/reemkufi_2sDcZGJLip7W2J7v7wQzbWW5Kb8VZBHR.woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/prototype/fonts/ibmplexsansarabic_Qw3CZRtWPQCuHme67tEYUIx3Kh0PHR9N6Ys43PW5fslBEg0.woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/prototype/fonts/fraunces_6NU78FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxC9TeP2Xz5c.woff2"
        crossOrigin="anonymous"
      />
      <SeoJsonLd />
      <PalmHillsLanding />
    </>
  );
}
