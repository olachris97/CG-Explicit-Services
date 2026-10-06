import React from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface PricingSectionProps {
  onSelectPackage: (packageName: string) => void;
  onScrollTo: (elementId: string) => void;
  selectedPackage?: string;
}

export default function PricingSection({ onSelectPackage, onScrollTo, selectedPackage }: PricingSectionProps) {
  const packages = [
    {
      name: "Starter",
      price: "$300 – $500",
      description: "Ideal for micro-businesses looking to eliminate their single heaviest manual workflow leak.",
      features: [
        "In-depth manual business audit",
        "Single workflow automation (e.g. lead routing)",
        "OR basic analytics data dashboard",
        "Standard documentation & handoff",
        "7 days of post-launch adjustment support"
      ],
      popular: false,
      outcome: "Deletes 5-10 hours of manual work / week"
    },
    {
      name: "Growth",
      price: "$800 – $1,500",
      description: "Perfect for growing operations needing advanced, interconnected automated tasks and real-time visual consoles.",
      features: [
        "Full business audit & process mapping",
        "Advanced multi-step workflow automations",
        "Custom, live visual data KPI dashboard",
        "Arbitrage & pricing leak revenue insights",
        "CRM & financial databases integration",
        "30 days of ongoing technical support"
      ],
      popular: true,
      outcome: "Saves 15-25 hours/week + recovers pricing leaks"
    },
    {
      name: "Premium",
      price: "$2,500+",
      description: "End-to-end operational optimization system engineered for enterprise-ready automatic workflows.",
      features: [
        "End-to-end business optimization review",
        "Unlimited workflow automation paths",
        "Multiple high-performance live dashboards",
        "Automated pricing arbitrage models",
        "Legacy system integrations & custom API bridges",
        "Ongoing monthly support & system audits"
      ],
      popular: false,
      outcome: "Full custom-engineered operational engine"
    }
  ];

  const handleSelect = (pName: string) => {
    onSelectPackage(pName);
    onScrollTo("contact");
  };

  return (
    <section id="pricing" className="py-20 section-navy-soft border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">
            Investment
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Service Packages
          </p>
          <p className="text-slate-500 text-base sm:text-lg mt-4 font-normal">
            We price strictly on ROI, not hours. Select the scale that matches your operation, or complete our free AI Audit to generate a customized proposal.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {packages.map((pkg, idx) => {
            const isChosen = selectedPackage === pkg.name;

            return (
              <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <div
                  className={`bg-white rounded-3xl p-8 border transition-all duration-300 relative flex flex-col justify-between h-full ${
                    pkg.popular
                      ? "border-emerald-500 ring-2 ring-emerald-500/10 shadow-xl scale-105 z-10 md:-translate-y-2"
                      : "border-slate-100 hover:border-slate-300 hover:shadow-md shadow-sm"
                  } ${isChosen ? "border-emerald-500 bg-emerald-50/10" : ""}`}
                >
                  {/* Popular Pill */}
                  {pkg.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary-600 text-white font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      MOST POPULAR
                    </span>
                  )}

                  {/* Info block */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-display font-black text-slate-900 uppercase tracking-wide">
                        {pkg.name}
                      </h3>
                      <p className="text-slate-500 text-xs mt-1 min-h-[32px] font-medium leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="py-4 border-y border-slate-100 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-display font-black text-slate-900">
                        {pkg.price}
                      </span>
                      <span className="text-slate-400 text-xs font-semibold">flat rate</span>
                    </div>

                    <ul className="space-y-3.5">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-xs text-slate-600 leading-relaxed font-normal">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button & Outcome Block */}
                  <div className="mt-8 space-y-4">

                    {/* Outcome Pill */}
                    <div className="bg-emerald-50 p-2.5 rounded-xl border border-secondary-100 text-center">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">Expected ROI Focus</span>
                      <span className="text-xs font-bold text-secondary-700 mt-0.5 block">{pkg.outcome}</span>
                    </div>

                    <button
                      onClick={() => handleSelect(pkg.name)}
                      className={`w-full py-3 px-4 font-semibold rounded-xl text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        pkg.popular
                          ? "bg-secondary-600 hover:bg-secondary-500 text-white shadow-md shadow-emerald-600/10"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      } ${isChosen ? "ring-2 ring-offset-2 ring-emerald-500" : ""}`}
                    >
                      Select {pkg.name} Package
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              </Reveal>
            );
          })}

        </div>

        {/* Free Audit Link */}
        <div className="mt-12 text-center bg-white p-6 rounded-2xl border border-slate-100 max-w-2xl mx-auto shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-bold text-slate-900 text-sm block">Not sure which package is right?</span>
            <span className="text-xs text-slate-500 mt-0.5 block">Let our AI system calculate your exact workflow hours and leaks instantly.</span>
          </div>
          <button
            onClick={() => handleSelect("Custom (From Audit)")}
            className="text-xs font-semibold text-secondary-700 bg-secondary-50 hover:bg-secondary-100 px-4 py-2 rounded-xl transition-all cursor-pointer border border-secondary-100"
          >
            Run Free Systems Audit
          </button>
        </div>

      </div>
    </section>
  );
}
