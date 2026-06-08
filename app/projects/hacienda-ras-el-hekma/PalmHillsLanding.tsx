"use client";

import "../../../public/prototype/fonts/fonts.css";
import "./editorial.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HeroInfoCard } from "./components/HeroInfoCard";
import { UnitsCarousel } from "./components/UnitsCarousel";
import { ArchitectureSection } from "./components/ArchitectureSection";
import { ZonesCarousel } from "./components/ZonesCarousel";
import { LocationSection } from "./components/LocationSection";
import { LeadForm } from "./components/LeadForm";
import { FAQ } from "./components/FAQ";
import { SeoContext } from "./components/SeoContext";
import { Footer } from "./components/Footer";
import { FloatingActionBar } from "./components/FloatingActionBar";
import { AnchorScroll } from "./components/AnchorScroll";

export function PalmHillsLanding() {
  return (
    <div className="ph-edit min-h-screen bg-sand">
      <AnchorScroll />
      <Header />
      <main>
        <Hero />
        <HeroInfoCard />
        <UnitsCarousel />
        <ArchitectureSection />
        <ZonesCarousel />
        <LocationSection />
        <LeadForm />
        <FAQ />
        <SeoContext />
      </main>
      <Footer />
      <FloatingActionBar />
    </div>
  );
}
