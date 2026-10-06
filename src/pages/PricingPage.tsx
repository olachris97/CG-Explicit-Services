import React from "react";
import { useOutletContext } from "react-router-dom";
import PricingSection from "../components/PricingSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { Reveal } from "../components/motion/Reveal";
import { LayoutOutletContext } from "../Layout";

export default function PricingPage() {
  const { onSelectPackage, onNavigateSection, selectedPackage } = useOutletContext<LayoutOutletContext>();

  const faqs = [
    {
      q: "Is this a one-time fee or a subscription?",
      a: "All three packages are flat, one-time engagement fees for the audit, build, and initial support window. Ongoing monitoring is available as an optional add-on for Growth and Premium clients."
    },
    {
      q: "What if I'm not sure which package fits my business?",
      a: "Run our free AI-powered audit or book a consultation call — we'll recommend a package based on your actual labor hours and revenue scale, not guesswork."
    },
    {
      q: "Can I upgrade my package later?",
      a: "Yes. Many clients start with Starter or Growth and expand into Premium as more of their operations move onto automated systems."
    },
    {
      q: "Do you offer payment plans?",
      a: "For Growth and Premium engagements, milestone-based payment schedules are available. Ask about this during your consultation call."
    }
  ];

  return (
    <>
      {/* Intro Banner */}
      <section className="pt-16 pb-8 section-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-xs font-bold text-emerald-600 tracking-widest uppercase">
            Pricing
          </h1>
          <p className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Simple, ROI-First Packages
          </p>
          <p className="text-slate-600 text-base sm:text-lg font-normal max-w-2xl mx-auto">
            No hourly billing, no vague retainers. Every package is priced against the hours and revenue it's built to recover.
          </p>
        </div>
      </section>

      {/* Original packages grid */}
      <PricingSection
        onSelectPackage={onSelectPackage}
        onScrollTo={onNavigateSection}
        selectedPackage={selectedPackage}
      />

      {/* FAQ */}
      <section className="py-20 section-maroon-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">
              Common Questions
            </h2>
            <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Pricing FAQ
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.06} y={14} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA
        variant="emerald"
        eyebrow="Still Deciding?"
        title="Get a Package Recommendation, Free"
        subtitle="Book a free 30-minute consultation and we'll tell you exactly which package fits your operation — no pressure, no obligation."
      />
    </>
  );
}
