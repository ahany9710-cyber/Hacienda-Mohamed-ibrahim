/* =========================================================
   HACIENDA v2 — integrations (Formspree, WhatsApp)
   ========================================================= */

const LOCALE = document.documentElement.lang === "en" ? "en" : "ar";

const I18N = {
  ar: {
    callLabel: "اتصل بنا",
    nameRequired: "من فضلك اكتب اسمك",
    phoneRequired: "رقم الموبايل مطلوب",
    phoneInvalid: "أدخل رقم هاتف صحيح (١١ رقم على الأقل، مع أو بدون كود الدولة)",
    submitting: "جاري الإرسال…",
    project: "هاسيندا راس الحكمة",
    formError: "تعذر الإرسال — جرّب واتساب",
  },
  en: {
    callLabel: "Call us",
    nameRequired: "Please enter your name",
    phoneRequired: "Mobile number is required",
    phoneInvalid: "Enter a valid phone number (at least 11 digits, with or without country code)",
    submitting: "Sending…",
    project: "Hacienda Ras El Hekma",
    formError: "Could not send — try WhatsApp",
  },
};

const STR = I18N[LOCALE];

const CONFIG = {
  WHATSAPP_NUMBER: "201008900076",
  LEAD_ENDPOINT: "https://formspree.io/f/mkoeyvew",
  TEL_HREF: "tel:+201008900076",
  WA_PRESETS: {
    default: "السلام عليكم — مهتم بـ هاسيندا راس الحكمة، محتاج تفاصيل أكتر",
    form_followup: "مهتم بـ هاسيندا راس الحكمة، لسه بعت استمارة — ياريت التفاصيل والأسعار.",
  },
};

const LEAD_SUBMITTED_KEY = "hh_lead_submitted";

function waUrl(presetKey, customMsg) {
  const msg = customMsg || CONFIG.WA_PRESETS[presetKey] || CONFIG.WA_PRESETS.default;
  return `/r/hh-wa?msg=${encodeURIComponent(msg)}`;
}

window.hhWaUrl = waUrl;

function trackCta(id) {
  console.log("[cta]", id);
}

function trackFormLead(source) {
  console.log("[lead]", source);
}

function markLeadSubmitted() {
  try {
    sessionStorage.setItem(LEAD_SUBMITTED_KEY, "1");
  } catch (_) {}
}

const CALL_LABEL = STR.callLabel;

function hydrateCallLabels() {
  document.querySelectorAll(".call-label").forEach((el) => {
    el.textContent = CALL_LABEL;
  });
  document.querySelectorAll("[data-tel]").forEach((el) => {
    el.setAttribute("href", CONFIG.TEL_HREF);
    el.setAttribute("aria-label", CALL_LABEL);
  });
}

function setupLangToggle() {
  document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.langSwitch;
      if (target) window.location.href = target;
    });
  });
}

function hydrateLinks(root = document) {
  root.querySelectorAll("[data-wa]").forEach((el) => {
    const preset = el.dataset.wa || "default";
    el.setAttribute("href", waUrl(preset, el.dataset.waMsg));
    if (el.dataset.waBound) return;
    el.dataset.waBound = "1";
    const cta = el.dataset.cta;
    el.addEventListener("click", () => cta && trackCta(cta));
  });
}

function hydrateLinksPage() {
  hydrateCallLabels();
  hydrateLinks(document);

  document.querySelectorAll("[data-cta]").forEach((el) => {
    if (el.dataset.wa || el.dataset.tel || el.dataset.ctaCall || el.dataset.ctaBound) return;
    el.dataset.ctaBound = "1";
    el.addEventListener("click", () => trackCta(el.dataset.cta));
  });

  document.querySelectorAll("[data-cta-call]").forEach((el) => {
    if (el.dataset.ctaCallBound) return;
    el.dataset.ctaCallBound = "1";
    el.addEventListener("click", () => trackCta(el.dataset.ctaCall));
  });
}

function normalizePhoneInput(raw) {
  return String(raw || "").trim().replace(/\s/g, "");
}

function phoneDigitCount(phone) {
  return phone.replace(/\D/g, "").length;
}

function isValidPhoneInput(phone) {
  return phoneDigitCount(phone) >= 11;
}

function setupLeadForm({ formId, successId, source, ctaId }) {
  const form = document.getElementById(formId);
  if (!form) return;

  const successPanel = successId ? document.getElementById(successId) : null;
  const prefix = formId === "lead-form-bottom" ? "fb" : "f";
  const errPrefix = formId === "lead-form-bottom" ? "err-fb" : "err";

  const fields = {
    name: form.querySelector(`#${prefix}-name`),
    phone: form.querySelector(`#${prefix}-phone`),
    altPhone: form.querySelector(`#${prefix}-alt`),
    unitType: form.querySelector(`#${prefix}-unit`),
  };
  const errs = {
    name: form.querySelector(`#${errPrefix}-name`),
    phone: form.querySelector(`#${errPrefix}-phone`),
    form: form.querySelector(`#${errPrefix}-form`) || form.querySelector("#err-form"),
  };
  const submitBtn = form.querySelector(".form-submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (errs.name) errs.name.textContent = "";
    if (errs.phone) errs.phone.textContent = "";
    if (errs.form) errs.form.textContent = "";

    const name = fields.name?.value.trim() || "";
    const phone = normalizePhoneInput(fields.phone?.value);
    const alt = normalizePhoneInput(fields.altPhone?.value);
    let ok = true;

    if (!name) {
      if (errs.name) errs.name.textContent = STR.nameRequired;
      ok = false;
    }
    if (!phone) {
      if (errs.phone) errs.phone.textContent = STR.phoneRequired;
      ok = false;
    } else if (!isValidPhoneInput(phone)) {
      if (errs.phone) errs.phone.textContent = STR.phoneInvalid;
      ok = false;
    } else if (alt && !isValidPhoneInput(alt)) {
      if (errs.phone) errs.phone.textContent = STR.phoneInvalid;
      ok = false;
    }
    if (!ok) return;

    submitBtn.disabled = true;
    const labelEl = submitBtn.querySelector("span");
    const originalLabel = labelEl?.textContent || submitBtn.textContent;
    if (labelEl) labelEl.textContent = STR.submitting;

    const payload = {
      name,
      phone,
      unit_type: fields.unitType?.value || "غير محدد",
      project: STR.project,
      source,
      locale: LOCALE,
    };
    if (alt) payload.alt_phone = alt;

    try {
      const res = await fetch(CONFIG.LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Bad response");

      trackFormLead(source);
      trackCta(ctaId);
      markLeadSubmitted();

      if (successPanel) {
        form.style.display = "none";
        successPanel.style.display = "block";
        const rect = successPanel.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + rect.top - 120, behavior: "smooth" });
      }
    } catch {
      const msg = STR.formError;
      if (errs.phone) errs.phone.textContent = msg;
      else if (errs.form) errs.form.textContent = msg;
    } finally {
      submitBtn.disabled = false;
      if (labelEl) labelEl.textContent = originalLabel;
    }
  });
}

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href").slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  const top = target.getBoundingClientRect().top + window.scrollY - 60;
  window.scrollTo({ top, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", () => {
  setupLangToggle();
  hydrateLinksPage();

  setupLeadForm({
    formId: "lead-form",
    successId: "lead-success",
    source: "hacienda_home",
    ctaId: "form_submit",
  });

  setupLeadForm({
    formId: "lead-form-bottom",
    successId: "lead-bottom-success",
    source: "hacienda_home_bottom",
    ctaId: "form_submit_bottom",
  });
});
