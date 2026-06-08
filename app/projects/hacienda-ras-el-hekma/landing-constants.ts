import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";

export const CALL_HREF = `tel:+${HACIENDA.PHONE}`;
export const WA_HREF = (preset: keyof typeof HACIENDA.whatsappPresets = "default") =>
  `/r/hh-wa?t=${preset}`;
export const WA_MSG = (msg: string) => `/r/hh-wa?msg=${encodeURIComponent(msg)}`;

export const PHONE_DISPLAY = "+20 100 890 0076";

export const LEAD_FORM_HREF = "#lead-form";

export function scrollToLeadForm() {
  const el = document.getElementById("lead-form");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function navigateToLeadForm(e?: { preventDefault(): void }) {
  e?.preventDefault();
  scrollToLeadForm();
}

export const UNIT_TYPES_LABEL =
  "شقة، شاليه، توين هاوس، فيلا، Branded Residences";

export const ZONES = HACIENDA.sisterProjects.map((zone) => ({
  id: zone.id,
  name: zone.nameAr,
  tags:
    zone.id === "bay"
      ? ["Hacienda Bay", "هاسيندا باي", "بالم هيلز"]
      : zone.id === "white"
        ? [
            "قرية هاسيندا ويست",
            "Hacienda West",
            "هاسيندا ويست الساحل الشمالي",
          ]
        : zone.id === "blue"
          ? [
              "هاسيندا ووترز راس الحكمة",
              "Hacienda Waters",
              "Palm Hills North Coast",
            ]
          : ["Hacienda Red", "هاسيندا ريد", "Palm Hills"],
  description:
    zone.id === "bay"
      ? "Hacienda Bay — وجهة ساحلية ضمن منظومة Hacienda Palm Hills على البحر المتوسط، بإطلالات مائية ومرافق متكاملة في راس الحكمة."
      : zone.id === "white"
        ? "قرية هاسيندا ويست الساحل الشمالي (Hacienda West Ras El Hekma) — أسلوب حياة ساحلي راقٍ ضمن مشروع هاسيندا راس الحكمة. للأسعار وHacienda West brochure تواصل مع فريق المبيعات."
        : zone.id === "blue"
          ? "هاسيندا ووترز راس الحكمة (Hacienda Waters North Coast) — مجتمع بحري بمعايير بالم هيلز. اطلب Hacienda Waters master plan والتفاصيل عبر النموذج."
          : "هاسيندا ريد (Hacienda Red Developer) — تجربة سكنية فاخرة على الشاطئ ضمن منظومة هاسيندا المتكاملة من Palm Hills Egypt.",
  image: zone.photo,
}));

export const FAQS = [
  {
    question: "هل التقسيط متاح؟",
    answer: `نعم. خطة السداد في هاسيندا راس الحكمة من بالم هيلز (Palm Hills): ${HACIENDA.paymentPlan.downPayment} مع ${HACIENDA.paymentPlan.installment}. فريق المبيعات يساعدك في اختيار الخطة المناسبة لميزانيتك.`,
  },
  {
    question: "ما هو جدول التسليم؟",
    answer: `${HACIENDA.delivery} — حسب مادة الإطلاق الرسمية من بالم هيلز. للتفاصيل الدقيقة والمراحل الحالية تواصل مع مستشار المبيعات.`,
  },
  {
    question: "ما أنواع الوحدات المتاحة؟",
    answer: `التشكيلة تشمل ${UNIT_TYPES_LABEL} ضمن مشروع Palm Hills Hacienda Ras El Hekma. الأسعار تبدأ من ${HACIENDA.prices.apartment} للشقق و${HACIENDA.prices.chalet} للشاليهات — حسب المرحلة والخطة.`,
  },
  {
    question: "ما نوع التشطيب؟",
    answer: `${HACIENDA.finishingNote} — وحدات جاهزة للسكن بمعايير بالم هيلز على الساحل الشمالي.`,
  },
  {
    question: "أين يقع مشروع هاسيندا راس الحكمة؟",
    answer: `${HACIENDA.location.description} للمزيد عن Hacienda Ras El Hekma location وHacienda West location تواصل معنا.`,
  },
  {
    question: "ما علاقة هاسيندا ويست وهاسيندا ووترز بالمشروع؟",
    answer:
      "هاسيندا راس الحكمة هو المشروع الرئيسي على كيلو ٢٣٨. قرية هاسيندا ويست الساحل الشمالي (Hacienda West North Coast) وهاسيندا ووترز راس الحكمة (Hacienda Waters) وهاسيندا باي (Hacienda Bay) ضمن منظومة Hacienda Palm Hills من شركة بالم هيلز مصر.",
  },
  {
    question: "كيف أحصل على بروشور هاسيندا ويست أو Hacienda Waters؟",
    answer:
      "سجّل بياناتك في نموذج الاستفسار بالأسفل لتحصل على البروشور، Hacienda West brochure، وHacienda Waters master plan مع أحدث الأسعار وخطط السداد من فريق Palm Hills.",
  },
  {
    question: "هل المشروع من شركة Palm Hills؟",
    answer:
      "نعم. مشروع هاسيندا راس الحكمة (Palm Hills Hacienda Ras El Hekma) مطوّر من بالم هيلز (Palm Hills Egypt) بالشراكة مع ميران هيلز — من أبرز مطوري العقارات في مصر والساحل الشمالي.",
  },
  {
    question: "كيف يمكنني زيارة الموقع؟",
    answer: "custom" as const,
  },
] as const;
