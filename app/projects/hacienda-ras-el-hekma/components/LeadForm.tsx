"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";
import { CALL_HREF, WA_HREF } from "../landing-constants";
import { FORMSPREE_LEAD_ENDPOINT } from "@/lib/formspree";
import { isValidEgyptPhone, normalizePhone } from "@/lib/validation";

const UNIT_OPTIONS = [
  "غير محدد",
  "فيلا فائقة الفخامة",
  "توين هاوس",
  "شاليه",
  "شقة",
  "Branded Residences",
] as const;

interface FormData {
  fullName: string;
  phoneNumber: string;
  confirmPhoneNumber: string;
  interestedProject: string;
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  form?: string;
}

export function LeadForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    confirmPhoneNumber: "",
    interestedProject: "غير محدد",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "الاسم مطلوب";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "رقم الموبايل مطلوب";
    } else if (!isValidEgyptPhone(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "رقم هاتف صحيح مطلوب (مصر، السعودية، البحرين، الإمارات، قطر)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    const payload: Record<string, string> = {
      phone: normalizePhone(formData.phoneNumber) || formData.phoneNumber.trim(),
      name: formData.fullName.trim(),
      project_slug: HACIENDA.slug,
      project_name: HACIENDA.projectName,
      source: "hacienda-monte-landing",
      unit_interest: formData.interestedProject,
      _subject: `استفسار بالم هيلز — ${formData.fullName} — ${HACIENDA.projectName}`,
    };
    if (formData.confirmPhoneNumber.trim()) {
      payload.additional_phone = formData.confirmPhoneNumber.trim();
    }

    try {
      const res = await fetch(FORMSPREE_LEAD_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok) {
        const msg =
          (typeof data.error === "string" && data.error) ||
          Object.values(data.errors ?? {})[0] ||
          "تعذر إرسال النموذج. حاول مرة أخرى.";
        setErrors({ form: msg });
        return;
      }

      router.push("/thank-you");
    } catch {
      setErrors({
        form: "حدث خطأ في الاتصال. تحقق من الإنترنت وحاول مجدداً.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="lead-form"
      className="ph-lead-section w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 scroll-mt-24"
    >
      <div className="wrap max-w-6xl mx-auto">
        <div className="lead-grid">
          <div className="lead-copy">
            <p className="ph-eyebrow mb-4">
              <span className="num">/ 10</span>
              <span lang="en">Reserve</span>
              <span className="sep" aria-hidden="true" />
              <span className="ar">سجّل اهتمامك</span>
            </p>
            <h2 className="ph-h2">
              سجل معنا و احصل على البروشور و{" "}
              <span className="ph-serif-accent">خصم اللونش</span>
            </h2>
            <p className="ph-lede mt-5">
              هيرد عليك فريق المبيعات في خلال دقايق — أو كمّل المحادثة على
              واتساب لو محتاج رد أسرع.
            </p>
            <div className="trust-line">
              <span>رد سريع</span>
              <span className="bar" aria-hidden="true" />
              <span>خصوصية تامة ١٠٠٪</span>
            </div>
            <div className="lead-alt">
              <a className="btn btn-wa" href={WA_HREF("default")}>
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.088 5.972L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span>واتساب</span>
              </a>
              <a
                className="btn btn-ghost-dark"
                href={CALL_HREF}
                aria-label="اتصل بنا"
              >
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="call-label">اتصل بنا</span>
              </a>
            </div>
          </div>

          <form className="form-card" onSubmit={handleSubmit} noValidate>
            <h3 className="form-head">
              ٤ معلومات بس — وفريقنا في انتظار اتصالك
            </h3>

            <div className="field">
              <label htmlFor="f-name">
                <span className="ar">الاسم</span>
                <span className="req">*</span>
              </label>
              <input
                type="text"
                id="f-name"
                name="name"
                placeholder="الاسم الكامل"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                disabled={isSubmitting}
              />
              <div className="err">{errors.fullName ?? ""}</div>
            </div>

            <div className="field">
              <label htmlFor="f-phone">
                <span className="ar">رقم الموبايل</span>
                <span className="req">*</span>
              </label>
              <input
                type="tel"
                id="f-phone"
                name="phone"
                inputMode="tel"
                dir="ltr"
                placeholder="+201012345678"
                autoComplete="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                disabled={isSubmitting}
              />
              <div className="err">{errors.phoneNumber ?? ""}</div>
            </div>

            <div className="field">
              <label htmlFor="f-alt">
                <span className="ar">رقم آخر للتواصل</span>
                <span className="opt">(اختياري)</span>
              </label>
              <input
                type="tel"
                id="f-alt"
                name="alt_phone"
                inputMode="tel"
                dir="ltr"
                placeholder="+9665XXXXXXXX"
                value={formData.confirmPhoneNumber}
                onChange={(e) =>
                  handleChange("confirmPhoneNumber", e.target.value)
                }
                disabled={isSubmitting}
              />
              <div className="err" />
            </div>

            <div className="field">
              <label htmlFor="f-unit">
                <span className="ar">نوع الوحدة</span>
              </label>
              <select
                id="f-unit"
                name="unit_type"
                value={formData.interestedProject}
                onChange={(e) =>
                  handleChange("interestedProject", e.target.value)
                }
                disabled={isSubmitting}
              >
                {UNIT_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {errors.form ? <div className="err">{errors.form}</div> : null}

            <button
              type="submit"
              className="btn btn-primary lg block form-submit form-submit-cta"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting
                  ? "جاري الإرسال..."
                  : "سجّل واحصل على موقع مميز على الماستر بلان"}
              </span>
            </button>

            <p className="form-privacy">بياناتك في أمان — للتواصل المباشر فقط</p>
          </form>
        </div>
      </div>
    </section>
  );
}
