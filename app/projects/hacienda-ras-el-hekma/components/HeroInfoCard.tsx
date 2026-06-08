"use client";

import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";
import {
  LEAD_FORM_HREF,
  navigateToLeadForm,
  scrollToLeadForm,
  UNIT_TYPES_LABEL,
} from "../landing-constants";

function PdfIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6M9 16h6"
      />
    </svg>
  );
}

export function HeroInfoCard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10">
      <div className="container mx-auto max-w-3xl">
        <div className="ph-card overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-y divide-[rgba(27,58,75,0.14)]">
            <div className="p-3 md:p-4 text-center md:text-right flex flex-col justify-center">
              <p className="ph-mono-label mb-1">مساحة المشروع</p>
              <p className="ph-serif text-base md:text-lg text-terracotta">
                {HACIENDA.masterplan.acres.toLocaleString("ar-EG")} فدان
              </p>
            </div>
            <div className="p-3 md:p-4 text-center md:text-right flex flex-col justify-center">
              <p className="ph-mono-label mb-1">انواع الوحدات</p>
              <p className="text-base md:text-lg font-medium text-ink">
                {UNIT_TYPES_LABEL}
              </p>
            </div>
            <div className="p-3 md:p-4 flex flex-row flex-wrap justify-center md:justify-end items-center gap-1.5">
              <button
                type="button"
                onClick={scrollToLeadForm}
                className="ph-btn ph-btn-ink min-w-[8rem] py-2 px-3 text-xs whitespace-nowrap"
              >
                مهتم
              </button>
              <a
                href={LEAD_FORM_HREF}
                onClick={navigateToLeadForm}
                className="ph-btn ph-btn-primary min-w-[8rem] py-2 px-3 text-xs whitespace-nowrap"
              >
                <PdfIcon />
                احصل على البروشور
              </a>
            </div>
            <div className="p-3 md:p-4 text-center md:text-right flex flex-col justify-center">
              <p className="ph-mono-label mb-1">
                {HACIENDA.hero.infoCardDisney.label}
              </p>
              <p className="ph-serif text-base md:text-lg text-terracotta">
                {HACIENDA.hero.infoCardDisney.value}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
