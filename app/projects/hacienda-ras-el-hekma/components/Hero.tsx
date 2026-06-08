"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";
import { scrollToLeadForm } from "../landing-constants";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="hero" className="w-full">
      <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden ph-frame ph-frame-hero">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -inset-[12%] will-change-transform"
            initial={false}
            animate={
              prefersReducedMotion
                ? { scale: 1, x: "0%", y: "0%" }
                : {
                    scale: [1.04, 1.16, 1.08],
                    x: ["0%", "-5%", "3%"],
                    y: ["0%", "-3%", "1.5%"],
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 22,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }
            }
          >
            <Image
              src={HACIENDA.shoreline.image}
              alt={HACIENDA.shoreline.imageAlt}
              fill
              priority
              className="object-cover object-center scale-110"
              sizes="100vw"
            />
          </motion.div>
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 90% 70% at 50% 45%, rgba(27,58,75,0.72) 0%, rgba(27,58,75,0.28) 100%)",
              "linear-gradient(180deg, rgba(27,58,75,0.45) 0%, rgba(27,58,75,0.35) 40%, rgba(27,58,75,0.78) 100%)",
            ].join(", "),
          }}
        />

        <span
          className="ph-mono-label absolute top-6 right-6 md:top-10 md:right-10 text-bone/70 hidden sm:block"
          dir="ltr"
          lang="en"
        >
          Palm Hills
        </span>
        <span
          className="ph-mono-label absolute bottom-6 left-6 md:bottom-10 md:left-10 text-bone/70 hidden sm:block"
          dir="ltr"
          lang="en"
        >
          Ras El Hekma
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center px-4"
          >
            <p className="ph-eyebrow justify-center mb-4 text-terracotta">
              {HACIENDA.hero.eyebrow}
            </p>
            <h1 className="ph-hero-ar mb-2">
              {HACIENDA.hero.headlineDark}
            </h1>
            <p className="ph-hero-en mb-4" dir="ltr" lang="en">
              {HACIENDA.hero.headlineAccent}
            </p>
            <p className="ph-hero-sub mb-6 max-w-2xl mx-auto" dir="ltr" lang="en">
              — {HACIENDA.hero.taglineEn} —
            </p>
            <p className="ph-hero-desc mb-4">
              {HACIENDA.hero.valueProp}
            </p>
            <p className="ph-mono-label justify-center mb-8 text-bone/75 normal-case tracking-wider">
              {HACIENDA.hero.trustLine}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                type="button"
                onClick={scrollToLeadForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="ph-btn ph-btn-primary px-8 py-4 text-lg"
              >
                استكشف الوحدات
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-bone/80"
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
