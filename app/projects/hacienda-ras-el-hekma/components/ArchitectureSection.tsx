"use client";

import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";
import { scrollToLeadForm } from "../landing-constants";

export function ArchitectureSection() {
  return (
    <section
      id="architecture-design"
      className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-sand"
    >
      <div className="container mx-auto text-center max-w-3xl">
        <p className="ph-eyebrow justify-center mb-4">
          <span lang="en">Architecture</span>
          <span className="sep" aria-hidden="true" />
          <span>بالم هيلز</span>
        </p>
        <h2 className="ph-h2 mb-4" lang="en">
          Architecture & Design
        </h2>
        <p className="ph-lede mb-4">
          {HACIENDA.sections.architecture.ledeAr}
        </p>
        <p className="ph-lede mb-8 text-ink/80">
          {HACIENDA.masterplan.description}
        </p>
        <button
          type="button"
          onClick={scrollToLeadForm}
          className="ph-btn ph-btn-primary px-8 py-4"
        >
          Make an Inquiry
        </button>
      </div>
    </section>
  );
}
