"use client";

import Image from "next/image";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";

export function LocationSection() {
  return (
    <section
      id="location-map"
      className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-pearl"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-right">
            <p className="ph-eyebrow justify-center lg:justify-start mb-4">
              <span className="num">/ 05</span>
              <span lang="en">Accessibility</span>
              <span className="sep" aria-hidden="true" />
              <span className="ar">الموقع</span>
            </p>

            <h2 className="ph-h2 mb-5">
              على شاطئ{" "}
              <span className="ph-serif-accent">راس الحكمة</span>
            </h2>

            <div className="ph-location-meta justify-center lg:justify-start mb-6">
              <span className="ph-location-chip">{HACIENDA.projectName}</span>
              <span className="ph-location-chip ph-location-chip-accent">
                كيلو ٢٣٨
              </span>
            </div>

            <p className="ph-lede mb-8 max-w-xl mx-auto lg:mx-0 lg:ms-0 lg:me-auto">
              {HACIENDA.location.description}
            </p>

            <div
              className="flex flex-wrap justify-center lg:justify-start gap-3"
              aria-label="المسافات"
            >
              {HACIENDA.location.distances.map((d) => (
                <div key={d.label} className="ph-distance">
                  <span className="km" dir="ltr">
                    {d.km} km
                  </span>
                  <span className="lbl">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="aspect-[4/3] lg:min-h-[320px] rounded overflow-hidden bg-sand relative ph-frame ph-location-map">
              <Image
                src={HACIENDA.location.image}
                alt={HACIENDA.location.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
