"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";
import { scrollToLeadForm } from "../landing-constants";

const CAROUSEL_UNIT_ORDER = [
  "chalet",
  "ultra_villa",
  "twin",
  "branded",
] as const;

const listings = CAROUSEL_UNIT_ORDER.map((unitId) => {
  const unit = HACIENDA.units.find((u) => u.id === unitId)!;
  return {
    id: unit.id,
    name: unit.typeAr,
    nameEn: unit.type,
    area: unit.typeAr,
    image: HACIENDA.homepageUnitImages[unitId],
    imageAlt: unit.imageAlt,
    eoiAmount: HACIENDA.eoiBooking,
    tagline: `${HACIENDA.projectName} | كيلو ٢٣٨ راس الحكمة`,
    downpayment: HACIENDA.paymentPlan.downPayment,
    installment: HACIENDA.paymentPlan.installment,
    delivery: HACIENDA.delivery,
    finishing: HACIENDA.finishingNote,
    priceRange: HACIENDA.prices[unit.priceKey],
  };
});

export function UnitsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextListing = () => {
    setCurrentIndex((prev) => (prev + 1) % listings.length);
  };

  const prevListing = () => {
    setCurrentIndex((prev) => (prev - 1 + listings.length) % listings.length);
  };

  const goToIndex = (index: number) => setCurrentIndex(index);

  const currentListing = listings[currentIndex];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 md:pb-12 lg:pb-20">
      <div className="container mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <p className="ph-eyebrow justify-center mb-3" lang="en">
            Units
          </p>
          <h2 className="ph-h2 mb-3 md:mb-4">
            شاليهات و فيلات كاملة التشطيب
          </h2>
          <p className="ph-lede mb-3 md:mb-4">
            {HACIENDA.shoreline.description}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sand border border-[rgba(27,58,75,0.14)] rounded">
            <span className="ph-mono-label text-terracotta normal-case tracking-wider">
              الوحدة المميزة {currentIndex + 1} من {listings.length}
            </span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <button
            type="button"
            onClick={prevListing}
            className="absolute left-0 sm:left-2 md:left-4 lg:left-2 top-1/2 -translate-y-1/2 z-30 bg-bone rounded-full p-3 sm:p-4 md:p-5 active:bg-sand transition-all duration-200 active:scale-95 border border-[rgba(27,58,75,0.14)] active:border-terracotta min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="الوحدة السابقة"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-terracotta"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={nextListing}
            className="absolute right-0 sm:right-2 md:right-4 lg:right-2 top-1/2 -translate-y-1/2 z-30 bg-bone rounded-full p-3 sm:p-4 md:p-5 active:bg-sand transition-all duration-200 active:scale-95 border border-[rgba(27,58,75,0.14)] active:border-terracotta min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="الوحدة التالية"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-terracotta"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="relative overflow-hidden px-12 sm:px-16 md:px-20 lg:px-12">
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1 lg:max-w-5xl lg:mx-auto xl:max-w-6xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={(_, { offset, velocity }) => {
                      const swipe = Math.abs(offset.x) * velocity.x;
                      if (swipe < -3000) nextListing();
                      else if (swipe > 3000) prevListing();
                    }}
                    className="ph-card ph-frame p-4 sm:p-6 md:p-8 lg:p-10 cursor-grab active:cursor-grabbing touch-none"
                  >
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-3 pb-3 border-b border-[rgba(27,58,75,0.14)]">
                      <svg
                        className="w-5 h-5 text-ink"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        />
                      </svg>
                      <span className="ph-mono-label normal-case tracking-normal">
                        اسحب يميناً أو يساراً
                      </span>
                      <svg
                        className="w-5 h-5 text-terracotta"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      <div className="order-1 md:order-1">
                        <div
                          className="ph-unit-thumb aspect-[4/3] rounded overflow-hidden bg-sand min-h-[200px] w-full relative ph-img-zoom"
                          style={{
                            backgroundImage: `url('${currentListing.image}')`,
                          }}
                          role="img"
                          aria-label={currentListing.imageAlt}
                        />
                      </div>

                      <div className="flex flex-col justify-center order-2 md:order-2">
                        <div className="mb-2 flex flex-wrap gap-2">
                          <span className="ph-mono-label inline-block px-3 py-1.5 bg-sand text-terracotta rounded normal-case tracking-wider">
                            الوحدة {currentIndex + 1}
                          </span>
                          <span
                            className="ph-eco-en inline-block px-3 py-1.5 bg-pearl text-ink/70 rounded"
                            lang="en"
                          >
                            {currentListing.nameEn}
                          </span>
                        </div>
                        <h3 className="ph-h3 text-xl sm:text-2xl md:text-3xl mb-2 mt-2">
                          {currentListing.name}
                        </h3>
                        <div className="ph-unit-eoi mb-4">
                          <span className="ph-unit-eoi-label" lang="en">
                            EOI
                          </span>
                          <span className="ph-unit-eoi-amount">
                            {currentListing.eoiAmount}
                          </span>
                        </div>
                        <p className="text-terracotta font-medium mb-4 text-sm sm:text-base">
                          {currentListing.tagline}
                        </p>

                        <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                          {[
                            ["المقدم", currentListing.downpayment],
                            ["خطة التقسيط", currentListing.installment],
                            ["تاريخ التسليم", currentListing.delivery],
                            ["نوع التشطيب", currentListing.finishing],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="flex items-center justify-between py-2 border-b border-[rgba(27,58,75,0.14)]"
                            >
                              <span className="ph-mono-label normal-case tracking-normal text-sm sm:text-base">
                                {label}
                              </span>
                              <span className="font-medium text-ink text-sm sm:text-base">
                                {value}
                              </span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between py-2">
                            <span className="ph-mono-label normal-case tracking-normal text-sm sm:text-base">
                              السعر
                            </span>
                            <span className="ph-serif text-terracotta text-sm sm:text-base">
                              {currentListing.priceRange}
                            </span>
                          </div>
                        </div>

                        <motion.button
                          type="button"
                          onClick={scrollToLeadForm}
                          whileTap={{ scale: 0.97 }}
                          className="ph-btn ph-btn-primary w-full py-4 sm:py-5 text-base sm:text-lg min-h-[52px]"
                        >
                          طلب التفاصيل
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="ph-carousel-dots mt-6 md:mt-8">
            {listings.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToIndex(index)}
                aria-label={`الانتقال إلى الوحدة ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              >
                <span />
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={prevListing}
              className="ph-btn ph-btn-ghost flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base min-h-[48px] min-w-[120px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span>السابق</span>
            </button>
            <button
              type="button"
              onClick={nextListing}
              className="ph-btn ph-btn-ghost flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base min-h-[48px] min-w-[120px]"
            >
              <span>التالي</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
