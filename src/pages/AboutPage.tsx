import React from "react";
import ResultsSection from "../components/ResultsSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { Reveal } from "../components/motion/Reveal";
import { Target, Eye, Handshake, LineChart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-5 h-5 text-emerald-600" />,
      title: "Outcome Obsessed",
      desc: "We don't ship dashboards for the sake of dashboards — every deliverable ties back to hours saved or margin recovered."
    },
    {
      icon: <Eye className="w-5 h-5 text-emerald-600" />,
      title: "Radical Transparency",
      desc: "You see the before-and-after numbers on every engagement. No vague progress reports, just verifiable results."
    },
    {
      icon: <Handshake className="w-5 h-5 text-emerald-600" />,
      title: "Partnership, Not Vendor",
      desc: "We stay close after launch to make sure the systems we build keep compounding value for your team."
    },
    {
      icon: <LineChart className="w-5 h-5 text-emerald-600" />,
      title: "Arbitrage-Grade Rigor",
      desc: "Our pricing and optimization logic is built with the same discipline used in high-frequency arbitrage modeling."
    }
  ];

  return (
    <>
      {/* Intro Banner */}
      <section className="pt-16 pb-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-xs font-bold text-emerald-600 tracking-widest uppercase">
            About Us
          </h1>
          <p className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            The Team Behind the Systems
          </p>
          <p className="text-slate-600 text-base sm:text-lg font-normal max-w-2xl mx-auto">
            CG Explicit Services was built on a simple premise: most businesses are leaking time and money through manual processes and pricing gaps that nobody is watching. We watch them, and we fix them.
          </p>
        </div>
      </section>

      {/* Original Why Choose Us + case studies + arbitrage calculator */}
      <ResultsSection />

      {/* Core Values */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">
              What Drives Us
            </h2>
            <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Our Core Values
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <Reveal key={idx} delay={idx * 0.08} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-3 hover:border-emerald-200 hover:shadow-md transition-all duration-300" hover>
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
                  {value.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{value.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{value.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA
        variant="dark"
        eyebrow="Let's Talk"
        title="See What We'd Build for You"
        subtitle="Every business has its own leaks. Book a free call and we'll tell you exactly what we'd tackle first for yours."
      />
    </>
  );
}
