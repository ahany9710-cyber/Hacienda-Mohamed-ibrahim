/* =========================================================
   HACIENDA v2 — integrations (Formspree, WhatsApp, popup)
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
    popupSuccessTitle: "وصلنا طلبك بنجاح",
    popupSuccessBody: "هيتواصل معاك فريق المبيعات قريب جداً.",
  },
  en: {
    callLabel: "Call us",
    nameRequired: "Please enter your name",
    phoneRequired: "Mobile number is required",
    phoneInvalid: "Enter a valid phone number (at least 11 digits, with or without country code)",
    submitting: "Sending…",
    project: "Hacienda Ras El Hekma",
    formError: "Could not send — try WhatsApp",
    popupSuccessTitle: "We received your request",
    popupSuccessBody: "Our sales team will contact you shortly.",
  },
};

const STR = I18N[LOCALE];

const CONFIG = {
  WHATSAPP_NUMBER: "201159452508",
  LEAD_ENDPOINT: "https://formspree.io/f/mkoeyvew",
  TEL_HREF: "tel:+201159452508",
  POPUP_SCROLL_THRESHOLD: 0.75,
  POPUP_DELAY_MS: 15000,
  WA_PRESETS: {
    default: "السلام عليكم — مهتم بـ هاسيندا راس الحكمة، محتاج تفاصيل أكتر",
    form_followup: "مهتم بـ هاسيندا راس الحكمة، لسه بعت استمارة — ياريت التفاصيل والأسعار.",
  },
};

const POPUP_STORAGE_KEY = "hh_lead_popup_seen";
const LEAD_SUBMITTED_KEY = "hh_lead_submitted";
const MIN_SCROLL_ROOM_PX = 120;

let popupDisposeTriggers = null;

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

function shouldSkipPopup() {
  try {
    if (sessionStorage.getItem(LEAD_SUBMITTED_KEY) === "1") return true;
    if (sessionStorage.getItem(POPUP_STORAGE_KEY) === "1") return true;
  } catch (_) {}
  return false;
}

function markLeadSubmitted() {
  try {
    sessionStorage.setItem(LEAD_SUBMITTED_KEY, "1");
  } catch (_) {}
  popupDisposeTriggers?.();
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
    el.setAttribute("href", waUrl(preset));
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

function setupLeadForm({ formId, successId, source, ctaId, compact = false, onSuccess }) {
  const form = document.getElementById(formId);
  if (!form) return;

  const successPanel = successId ? document.getElementById(successId) : null;
  const prefix = formId === "popup-lead-form" ? "pf" : "f";
  const errPrefix = formId === "popup-lead-form" ? "err-pf" : "err";

  const fields = {
    name: form.querySelector(`#${prefix}-name`),
    phone: form.querySelector(`#${prefix}-phone`),
    altPhone: compact ? null : form.querySelector(`#${prefix}-alt`),
    unitType: compact ? null : form.querySelector(`#${prefix}-unit`),
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
        if (formId === "popup-lead-form") {
          form.hidden = true;
          successPanel.hidden = false;
          onSuccess?.();
        } else {
          form.style.display = "none";
          successPanel.style.display = "block";
          const rect = successPanel.getBoundingClientRect();
          window.scrollTo({ top: window.scrollY + rect.top - 120, behavior: "smooth" });
        }
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

function setupLeadPopup() {
  const popup = document.getElementById("lead-popup");
  if (!popup) return null;

  let opened = false;
  let timerId = null;
  const scrollOpts = { passive: true };
  const leadSection = document.getElementById("lead");

  function disposeTriggers() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    window.removeEventListener("scroll", onScrollCheck, scrollOpts);
  }

  function closePopup() {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lead-popup-open");
    trackCta("popup_close");
    try {
      sessionStorage.setItem(POPUP_STORAGE_KEY, "1");
    } catch (_) {}
    setTimeout(() => {
      popup.hidden = true;
    }, 350);
  }

  function isNearLeadForm() {
    if (!leadSection) return false;
    return leadSection.getBoundingClientRect().top < window.innerHeight * 0.85;
  }

  function openPopup(trigger, { force = false } = {}) {
    if (opened) return;
    if (!force && (shouldSkipPopup() || isNearLeadForm())) return;

    opened = true;
    disposeTriggers();

    if (!force) {
      try {
        sessionStorage.setItem(POPUP_STORAGE_KEY, "1");
      } catch (_) {}
    }

    popup.hidden = false;
    popup.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => popup.classList.add("is-open"));
    document.body.classList.add("lead-popup-open");
    trackCta(`popup_open_${trigger}`);

    const firstInput = popup.querySelector("input");
    setTimeout(() => firstInput?.focus(), 350);
  }

  popup.querySelectorAll("[data-popup-close]").forEach((el) => {
    el.addEventListener("click", closePopup);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("is-open")) closePopup();
  });

  function getScrollDepth() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const scrollHeight = doc.scrollHeight - window.innerHeight;
    if (scrollHeight <= MIN_SCROLL_ROOM_PX) return 0;
    return scrollTop / scrollHeight;
  }

  function onScrollCheck() {
    if (isNearLeadForm()) {
      disposeTriggers();
      return;
    }
    if (getScrollDepth() >= CONFIG.POPUP_SCROLL_THRESHOLD) {
      openPopup("scroll");
    }
  }

  popupDisposeTriggers = disposeTriggers;

  const params = new URLSearchParams(window.location.search);
  const forcePopup = params.get("popup") === "1" || window.location.hash === "#popup";

  if (forcePopup) {
    try {
      sessionStorage.removeItem(POPUP_STORAGE_KEY);
      sessionStorage.removeItem(LEAD_SUBMITTED_KEY);
    } catch (_) {}
    setTimeout(() => openPopup("preview", { force: true }), 400);
  } else if (!shouldSkipPopup()) {
    window.addEventListener("scroll", onScrollCheck, scrollOpts);
    onScrollCheck();
    timerId = setTimeout(() => {
      if (!isNearLeadForm()) openPopup("timer");
      else disposeTriggers();
    }, CONFIG.POPUP_DELAY_MS);
  }

  return { closePopup, disposeTriggers, openPopup };
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

  const popupApi = setupLeadPopup();
  setupLeadForm({
    formId: "popup-lead-form",
    successId: "popup-lead-success",
    source: "hacienda_popup",
    ctaId: "form_submit_popup",
    compact: true,
    onSuccess: () => {
      setTimeout(() => popupApi?.closePopup?.(), 2800);
    },
  });
});
