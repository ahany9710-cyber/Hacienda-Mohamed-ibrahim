"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";
import { scrollToLeadForm, ZONES } from "../landing-constants";

export function ZonesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % ZONES.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + ZONES.length) % ZONES.length);

  const goToIndex = (index: number) => setCurrentIndex(index);
  const currentZone = ZONES[currentIndex];

  return (
    <section
      id="project-zones"
      className="w-full px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 md:pb-12 lg:pb-20 bg-pearl"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <p className="ph-eyebrow mb-2">
              <span lang="en">Zones</span>
              <span className="sep" aria-hidden="true" />
              <span>Palm Hills</span>
            </p>
            <h2 className="ph-h2 mb-2" lang="en">
              Project Zones
            </h2>
            <p className="ph-lede">
              {HACIENDA.sections.zones.lede}
            </p>
          </div>
          <motion.button
            type="button"
            onClick={scrollToLeadForm}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="ph-btn ph-btn-primary px-6 py-3 whitespace-nowrap"
          >
            استكشف المناطق ←
          </motion.button>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <button
            type="button"
            onClick={prev}
            className="absolute lg:right-2 right-0 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 md:p-5 bg-bone rounded-full border border-[rgba(27,58,75,0.14)] hover:border-terracotta active:border-terracotta transition-all min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="السابق"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute lg:left-2 left-0 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 md:p-5 bg-bone rounded-full border border-[rgba(27,58,75,0.14)] hover:border-terracotta active:border-terracotta transition-all min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="التالي"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative overflow-hidden px-12 sm:px-16 md:px-20 lg:px-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -500) next();
                  else if (swipe > 500) prev();
                }}
                className="w-full max-w-7xl mx-auto cursor-grab active:cursor-grabbing"
              >
                <div className="ph-card ph-frame overflow-hidden p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                    <div className="order-2 md:order-1 flex flex-col justify-between">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {currentZone.tags.map((tag) => (
                          <span
                            key={tag}
                            className={
                              tag === "بالم هيلز" || tag === HACIENDA.projectName
                                ? "ph-mono-label px-3 py-1.5 rounded bg-sand text-terracotta normal-case tracking-wider"
                                : "ph-mono-label px-3 py-1.5 rounded text-ink/50 normal-case tracking-wider"
                            }
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="ph-h3 text-2xl sm:text-3xl lg:text-4xl mb-4">
                        {currentZone.name}
                      </h3>

                      <p className="ph-lede text-base sm:text-lg lg:text-xl mb-6 flex-grow">
                        {currentZone.description}
                      </p>

                      <button
                        type="button"
                        onClick={scrollToLeadForm}
                        className="ph-btn ph-btn-primary w-full py-4 px-6 text-lg"
                      >
                        احصل على مزيد من التفاصيل
                      </button>
                    </div>

                    <div className="order-1 md:order-2">
                      <div className="aspect-[4/3] rounded overflow-hidden bg-sand relative ph-img-zoom">
                        <Image
                          src={currentZone.image}
                          alt={currentZone.name}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="ph-carousel-dots mt-6">
              {ZONES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToIndex(i)}
                  aria-label={`الانتقال إلى المنطقة ${i + 1}`}
                  aria-current={i === currentIndex ? "true" : "false"}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
