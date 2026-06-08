import type { Metadata } from "next";
import { PalmHillsLanding } from "./PalmHillsLanding";

export const metadata: Metadata = {
  title: { absolute: "هاسيندا راس الحكمة — بالم هيلز · الساحل الشمالي" },
  description:
    "إطلاق هاسيندا راس الحكمة من بالم هيلز على كيلو ٢٣٨ راس الحكمة: شاطئ ٤.٨ كم، خليجين طبيعيين، وحدات بفيو بحري. تواصل واتساب أو اتصل بنا.",
  openGraph: {
    title: "هاسيندا راس الحكمة — بالم هيلز · الساحل الشمالي",
    description:
      "هاسيندا راس الحكمة: ١٬٤٠٠ فدان، شاطئ ٤.٨ كم، تقسيط حتى ١٠ سنوات، وتشطيب فُل فينِش.",
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
      <PalmHillsLanding />
    </>
  );
}
