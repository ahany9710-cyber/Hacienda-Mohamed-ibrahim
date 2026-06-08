"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";
import {
  CALL_HREF,
  LEAD_FORM_HREF,
  navigateToLeadForm,
  WA_HREF,
} from "../landing-constants";

export function Footer() {
  return (
    <footer className="bg-ink text-bone/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/hacienda/logos/palm-hills-official.png"
              alt="بالم هيلز"
              width={160}
              height={40}
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="ph-serif text-terracotta text-xl mb-3">Palm Hills</p>
            <p className="leading-relaxed text-bone/60">
              {HACIENDA.projectName}: أول مدينة ساحلية مسوّرة من بالم هيلز على
              كيلو ٢٣٨ راس الحكمة — {HACIENDA.masterplan.acres.toLocaleString("ar-EG")}{" "}
              فدان، شاطئ {HACIENDA.masterplan.shorelineKm} كم على المتوسط.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="ph-mono-label text-bone mb-4">اتصل بنا</h4>
            <div className="flex flex-col gap-3 items-start">
              <a
                href={CALL_HREF}
                className="ph-footer-call"
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
                <span>اتصل بنا</span>
              </a>
              <a
                href={WA_HREF("footer")}
                className="btn btn-wa"
                aria-label="تواصل واتساب"
              >
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="ph-mono-label text-bone mb-4">روابط سريعة</h4>
            <div className="space-y-3">
              <a
                href={LEAD_FORM_HREF}
                onClick={navigateToLeadForm}
                className="block text-bone/60 hover:text-terracotta transition-colors text-right"
              >
                تحميل البروشور
              </a>
              <a
                href={CALL_HREF}
                className="block text-bone/60 hover:text-terracotta transition-colors text-right"
              >
                اتصل الآن
              </a>
              <a
                href={WA_HREF("default")}
                className="block text-bone/60 hover:text-terracotta transition-colors text-right"
              >
                محادثة واتساب
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-bone/10 text-center text-sm text-bone/50"
        >
          <p>&copy; {new Date().getFullYear()} بالم هيلز. جميع الحقوق محفوظة.</p>
          <p className="mt-2 ph-mono-label normal-case tracking-normal">
            إخلاء المسؤولية: جميع المعلومات المقدمة قابلة للتغيير. يرجى الاتصال
            بنا للحصول على أحدث الأسعار والتوفر.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
