"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";
import { CALL_HREF, FAQS, PHONE_DISPLAY, WA_HREF } from "../landing-constants";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-sand">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="ph-eyebrow justify-center mb-3" lang="en">
            FAQ
          </p>
          <h2 className="ph-h2 mb-4">
            الأسئلة الشائعة
          </h2>
          <p className="ph-lede">
            {HACIENDA.sections.faq.lede}
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="ph-card overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-right flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="ph-h3 text-lg pl-4">
                  {faq.question}
                </span>
                <motion.svg
                  className="w-5 h-5 text-terracotta flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 ph-lede text-right">
                      {faq.answer === "custom" ? (
                        <>
                          <p className="mb-4">
                            يمكنك جدولة زيارة للموقع بالاتصال بنا على{" "}
                            <a
                              href={CALL_HREF}
                              className="text-terracotta font-semibold hover:underline"
                            >
                              {PHONE_DISPLAY}
                            </a>{" "}
                            أو التواصل معنا عبر واتساب. سيقوم فريق المبيعات
                            لدينا بترتيب وقت مناسب لك لزيارة العقار والإجابة على
                            أي أسئلة قد تكون لديك.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={CALL_HREF}
                              className="ph-btn ph-btn-primary inline-flex items-center gap-2 px-6 py-3"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              اتصل الآن
                            </a>
                            <a
                              href={WA_HREF("default")}
                              className="ph-btn ph-btn-wa inline-flex items-center gap-2 px-6 py-3"
                            >
                              واتساب
                            </a>
                          </div>
                        </>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
