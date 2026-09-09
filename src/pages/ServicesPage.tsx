import React from "react";
import { useOutletContext } from "react-router-dom";
import Services from "../components/Services";
import ConsultationCTA from "../components/ConsultationCTA";
import { Reveal } from "../components/motion/Reveal";
import { LayoutOutletContext } from "../Layout";
import { Cpu, ShieldCheck, Gauge, PlugZap } from "lucide-react";

export default function ServicesPage() {
  const { onOpenAudit, onNavigateSection } = useOutletContext<LayoutOutletContext>();

  const whyPoints = [
    {
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
      title: "Built for Your Stack",
      desc: "Every automation and dashboard is engineered around the tools you already use — no rip-and-replace migrations."
    },
    {
      icon: <Gauge className="w-5 h-5 text-emerald-600" />,
      title: "Measured, Not Guessed",
      desc: "We benchmark hours saved and dollars recovered before and after launch, so results are always verifiable."
    },
    {
      icon: <PlugZap className="w-5 h-5 text-emerald-600" />,
      title: "Fast Time-to-Value",
      desc: "Most engagements go from audit to a live, working system in a matter of weeks, not quarters."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: "Supported After Launch",
      desc: "Every package includes a post-launch support window so your new systems keep running cleanly."
    }
  ];

  const faqs = [
    {
      q: "Do I need technical staff to work with you?",
      a: "No. We handle the engineering end-to-end — audit, build, and deployment — and hand off clear documentation your team can actually use."
    },
    {
      q: "How long does a typical service engagement take?",
      a: "Starter engagements are usually live within 1-2 weeks. Growth and Premium builds typically run 3-6 weeks depending on integration complexity."
    },
    {
      q: "Can you work with our existing software and spreadsheets?",
      a: "Yes. Most of our automation work connects directly into existing CRMs, spreadsheets, inventory tools, and financial systems rather than replacing them."
    },
    {
      q: "What happens after the systems are built?",
      a: "You get documentation, a handoff walkthrough, and a defined support window. Ongoing monitoring and adjustments are available on Growth and Premium packages."
    }
  ];

  return (
    <>
      {/* Intro Banner */}
      <section className="pt-16 pb-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-xs font-bold text-emerald-600 tracking-widest uppercase">
            Services
          </h1>
          <p className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Systems Engineered for Growth
          </p>
          <p className="text-slate-600 text-base sm:text-lg font-normal max-w-2xl mx-auto">
            From eliminating repetitive busywork to surfacing the numbers that actually run your business, every engagement is built around one goal: measurable operational leverage.
          </p>
        </div>
      </section>

      {/* Original full Services section (offers + simulator) */}
      <Services onScrollTo={onNavigateSection} onOpenAudit={onOpenAudit} />

      {/* Why our services work */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">
              Our Approach
            </h2>
            <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Why It Works
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPoints.map((point, idx) => (
              <Reveal key={idx} delay={idx * 0.08} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-3 hover:border-emerald-200 hover:shadow-md transition-all duration-300" hover>
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
                  {point.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{point.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{point.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">
              Common Questions
            </h2>
            <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Services FAQ
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
        variant="dark"
        eyebrow="Next Step"
        title="Let's Map Your Services Roadmap"
        subtitle="Tell us what's eating up your team's time and we'll show you exactly which service fits — starting with a free, no-pressure call."
      />
    </>
  );
}
