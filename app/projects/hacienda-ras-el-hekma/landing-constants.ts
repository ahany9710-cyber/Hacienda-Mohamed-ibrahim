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
  tags: ["هاسيندا راس الحكمة", "راس الحكمة", "بالم هيلز"],
  description:
    zone.id === "bay"
      ? "هاسيندا باي — وجهة ساحلية ضمن منظومة هاسيندا على البحر المتوسط، بإطلالات مائية ومرافق متكاملة."
      : zone.id === "white"
        ? "هاسيندا وايت — أسلوب حياة ساحلي راقٍ ضمن مشروع هاسيندا راس الحكمة على كيلو ٢٣٨."
        : zone.id === "blue"
          ? "هاسيندا بلو — مجتمع بحري بمعايير بالم هيلز، ضمن أكبر مدينة ساحلية مسوّرة على راس الحكمة."
          : "هاسيندا ريد — تجربة سكنية فاخرة على الشاطئ ضمن منظومة هاسيندا المتكاملة.",
  image: zone.photo,
}));

export const FAQS = [
  {
    question: "هل التقسيط متاح؟",
    answer: `نعم. خطة السداد في هاسيندا راس الحكمة: ${HACIENDA.paymentPlan.downPayment} مع ${HACIENDA.paymentPlan.installment}. فريق المبيعات يساعدك في اختيار الخطة المناسبة لميزانيتك.`,
  },
  {
    question: "ما هو جدول التسليم؟",
    answer: `${HACIENDA.delivery} — حسب مادة الإطلاق الرسمية من بالم هيلز. للتفاصيل الدقيقة والمراحل الحالية تواصل مع مستشار المبيعات.`,
  },
  {
    question: "ما أنواع الوحدات المتاحة؟",
    answer: `التشكيلة تشمل ${UNIT_TYPES_LABEL}. الأسعار تبدأ من ${HACIENDA.prices.apartment} للشقق و${HACIENDA.prices.chalet} للشاليهات — حسب المرحلة والخطة.`,
  },
  {
    question: "ما نوع التشطيب؟",
    answer: `${HACIENDA.finishingNote} — وحدات جاهزة للسكن بمعايير بالم هيلز على الساحل الشمالي.`,
  },
  {
    question: "أين يقع المشروع؟",
    answer: `${HACIENDA.location.description}`,
  },
  {
    question: "كيف يمكنني زيارة الموقع؟",
    answer: "custom" as const,
  },
] as const;
