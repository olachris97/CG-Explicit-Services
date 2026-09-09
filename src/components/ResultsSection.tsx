import React, { useState } from "react";
import { TrendingUp, ShieldCheck, Percent, HelpCircle, ArrowRight, Layers, Sparkles } from "lucide-react";
import { Reveal } from "./motion/Reveal";

export default function ResultsSection() {
  const [activeCase, setActiveCase] = useState<number>(0);
  const [arbitrageVol, setArbitrageVol] = useState<number>(80000);
  const [marginHole, setMarginHole] = useState<number>(4.5); // 4.5% margin leak

  const arbitrageGain = Math.round(arbitrageVol * (marginHole / 100));

  const caseStudies = [
    {
      company: "Apex Distribution (Wholesale & E-Commerce)",
      bottleneck: "Manual pricing adjustments across 1,400 SKUs on 3 marketplaces, taking 18 hours/week",
      action: "Built real-time scraping and automated dynamic repricing engines connecting to an inventory database",
      before: {
        hours: "18 hrs / week manual updates",
        revenue: "$112,000 / mo sales volume",
        error: "6.2% error rate (sold under cost due to cost-shifting lags)"
      },
      after: {
        hours: "0.5 hrs / week checkups (97% Reclaimed)",
        revenue: "$129,500 / mo sales volume (15.6% Captured)",
        error: "0% pricing errors (Fully systemized)"
      },
      summary: "CG solved Apex's pricing lag. Cost adjustments flow automatically within 60 seconds of supplier notifications."
    },
    {
      company: "Vanguard Care Solutions (Health & Logistics)",
      bottleneck: "Admin coordinators spend 24 hours/week tracking caregiver dispatch on custom spreadsheets",
      action: "Created a unified CRM-connected dashboard mapping live availability, schedules, and caregiver utilization",
      before: {
        hours: "24 hrs / week dispatch updates",
        revenue: "$85,000 / mo billing volume",
        error: "Frequent booking collisions and scheduling data-silos"
      },
      after: {
        hours: "3 hrs / week automated syncs",
        revenue: "$96,000 / mo billing volume (utilization optimized)",
        error: "Comprehensive real-time dashboard visibility"
      },
      summary: "Consolidated five distinct data streams into one single source of truth. Leadership now makes dispatch decisions instantly."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Why Choose Us Section (About) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* About Text */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase">
              Who We Are
            </h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Why Choose Us
            </h3>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
              We don't deal in hand-waving growth summaries. Our engineering is built on an intensive background in <strong>arbitrage modeling and data optimization</strong>. We understand pricing behaviors, inventory slippages, and high-frequency transactions.
            </p>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
              By applying arbitrage rigor to standard business operations, we identify hidden friction points and leakages that traditional generalist agencies completely miss. We are obsessed with measurable numbers:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Reveal delay={0} className="flex items-start gap-3" hover>
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 border border-emerald-100">
                  <Percent className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Arbitrage & Pricing Depth</h4>
                  <p className="text-xs text-slate-500 mt-1">Our specific edge lies in identifying minute margin leaks and building logic to capture them.</p>
                </div>
              </Reveal>

              <Reveal delay={0.08} className="flex items-start gap-3" hover>
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 border border-emerald-100">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Purely Measurable Metrics</h4>
                  <p className="text-xs text-slate-500 mt-1">No vanity metrics. Everything we ship focuses on hours saved and dollars captured.</p>
                </div>
              </Reveal>
            </div>

            {/* Interactive Arbitrage Demo Box */}
            <Reveal delay={0.1} y={28} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold font-mono text-emerald-600 uppercase bg-emerald-100/60 px-2.5 py-0.5 rounded-full">
                  THE ARBITRAGE ADVANTAGE
                </span>
                <span className="text-slate-400 text-[10px] font-mono">MARGIN GAIN CALCULATOR</span>
              </div>
              
              <p className="text-xs text-slate-500">
                See how reclaiming just a small margin leak (e.g. pricing lag or purchase discrepancies) cascades across your current transaction volume:
              </p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Monthly Transaction/Sales Volume:</span>
                    <span>${arbitrageVol.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={arbitrageVol}
                    onChange={(e) => setArbitrageVol(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Identified Margin Leak/Lag Gap:</span>
                    <span>{marginHole}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={marginHole}
                    onChange={(e) => setMarginHole(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center bg-white/40 -mx-6 -mb-6 p-6 rounded-b-2xl">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Recoverable Leak/Mo:</span>
                  <span className="text-xl font-display font-bold text-emerald-600">${arbitrageGain.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Annual Hidden Cash Reclaimed:</span>
                  <span className="text-lg font-display font-bold text-slate-900">${(arbitrageGain * 12).toLocaleString()}</span>
                </div>
              </div>
            </Reveal>

          </div>

          {/* About Visual: What You Can Expect Case Studies */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.1} y={28} className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                What You Can Expect
              </h4>
              <p className="text-xl font-display font-bold text-white tracking-tight mb-6">
                Direct Operational Transitions
              </p>

              {/* Case Tabs Selector */}
              <div className="flex gap-2 p-1 bg-slate-950 rounded-xl mb-6">
                {caseStudies.map((cs, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCase(idx)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all text-center ${
                      activeCase === idx
                        ? "bg-slate-800 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Case {idx + 1}
                  </button>
                ))}
              </div>

              {/* Active Case Details */}
              <div className="space-y-6 transition-all duration-300">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                    CLIENT METRICS PROFILE
                  </span>
                  <h5 className="text-md font-display font-bold text-slate-100 mt-2">
                    {caseStudies[activeCase].company}
                  </h5>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-slate-400 leading-relaxed">
                    <strong className="text-slate-200 font-medium">The Bottleneck:</strong> {caseStudies[activeCase].bottleneck}
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    <strong className="text-slate-200 font-medium">CG Optimization:</strong> {caseStudies[activeCase].action}
                  </p>
                </div>

                {/* Before / After Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div className="space-y-1 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                    <span className="text-[9px] font-bold text-red-400 tracking-wider uppercase block">BEFORE</span>
                    <p className="text-[11px] text-slate-300 font-medium">{caseStudies[activeCase].before.hours}</p>
                    <p className="text-[11px] text-slate-300 font-medium">{caseStudies[activeCase].before.revenue}</p>
                    <p className="text-[10px] text-slate-500 italic mt-0.5">{caseStudies[activeCase].before.error}</p>
                  </div>

                  <div className="space-y-1 bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/20">
                    <span className="text-[9px] font-bold text-emerald-400 tracking-wider uppercase block">AFTER CG SYSTEMS</span>
                    <p className="text-[11px] text-emerald-100 font-bold">{caseStudies[activeCase].after.hours}</p>
                    <p className="text-[11px] text-emerald-100 font-bold">{caseStudies[activeCase].after.revenue}</p>
                    <p className="text-[10px] text-emerald-400/80 italic mt-0.5">{caseStudies[activeCase].after.error}</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic font-normal bg-slate-950 p-3 rounded-lg border border-slate-850">
                  "{caseStudies[activeCase].summary}"
                </p>
              </div>

            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
