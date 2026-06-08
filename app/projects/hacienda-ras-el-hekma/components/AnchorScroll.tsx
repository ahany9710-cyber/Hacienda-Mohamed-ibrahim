"use client";

import { useEffect } from "react";

const PAGE_ANCHORS = [
  "hero",
  "units",
  "architecture-design",
  "project-zones",
  "location-map",
  "lead-form",
  "inquiry-form",
] as const;

function scrollToAnchor(hash: string, retries = 8) {
  const id = hash.replace(/^#/, "");
  if (!id || !PAGE_ANCHORS.includes(id as (typeof PAGE_ANCHORS)[number])) return;

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (retries > 0) {
    requestAnimationFrame(() => scrollToAnchor(hash, retries - 1));
  }
}

export function AnchorScroll() {
  useEffect(() => {
    const run = () => {
      if (!window.location.hash) return;
      scrollToAnchor(window.location.hash);
    };

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, []);

  return null;
}
