import React, { useState } from "react";
import { Cpu, BarChart3, TrendingUp, CheckCircle2, Sliders, Sparkles } from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface ServicesProps {
  onScrollTo?: (elementId: string) => void;
  onOpenAudit: () => void;
}

export default function Services({ onScrollTo, onOpenAudit }: ServicesProps) {
  // Simulator State variables
  const [hours, setHours] = useState<number>(20);
  const [revenue, setRevenue] = useState<number>(75000);
  const [marginLeak, setMarginLeak] = useState<string>("medium");

  // Multipliers/Logic for simulator
  const laborRate = 35; // average fully loaded hourly cost
  const currentLaborCost = hours * 4.33 * laborRate; // Monthly
  const postLaborCost = hours * 0.25 * 4.33 * laborRate; // 75% saved

  let leakPercent = 0.08;
  if (marginLeak === "low") leakPercent = 0.04;
  if (marginLeak === "high") leakPercent = 0.13;

  const revenueLeaked = revenue * leakPercent;
  const revenueOptimized = revenueLeaked * 0.85; // 85% recovered via dynamic repricing/automation

  const totalMonthlyBenefit = (currentLaborCost - postLaborCost) + revenueOptimized;
  const totalAnnualBenefit = totalMonthlyBenefit * 12;

  return (
    <section id="services" className="py-20 section-navy-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">
            Our Expertise
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            What We Do
          </p>
          <p className="text-slate-500 text-base sm:text-lg mt-4 font-normal">
            We focus on tangible outcomes: reducing weekly labor hours, uncovering hidden revenue leaks, and rendering critical KPIs in crystal clear dashboards.
          </p>
        </div>

        {/* 3 Clear Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Offer 1 */}
          <Reveal delay={0} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-emerald-300 transition-all duration-300 group hover:shadow-md" hover>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
              Workflow Automation
            </h3>
            <ul className="space-y-2.5 mb-6 text-sm text-slate-600 font-normal">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Automate repetitive business processes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Reduce manual work and human error</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Improve operational efficiency</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-200/50 mt-auto">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Expected Outcome</span>
              <span className="text-sm font-semibold text-emerald-700 mt-1 block">Save time + reduce labor costs significantly</span>
            </div>
          </Reveal>

          {/* Offer 2 */}
          <Reveal delay={0.08} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-emerald-300 transition-all duration-300 group hover:shadow-md" hover>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
              Data Visualization & Dashboards
            </h3>
            <ul className="space-y-2.5 mb-6 text-sm text-slate-600 font-normal">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Build real-time KPI dashboards</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Track live performance metrics</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Remove data silos for key leadership</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-200/50 mt-auto">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Expected Outcome</span>
              <span className="text-sm font-semibold text-emerald-700 mt-1 block">Better visibility = better decisions</span>
            </div>
          </Reveal>

          {/* Offer 3 */}
          <Reveal delay={0.16} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-emerald-300 transition-all duration-300 group hover:shadow-md" hover>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
              Revenue Optimization
            </h3>
            <ul className="space-y-2.5 mb-6 text-sm text-slate-600 font-normal">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Analyze pricing models and current demand</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Identify margin gaps and pricing leakages</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Implement proactive data-driven pricing rules</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-200/50 mt-auto">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Expected Outcome</span>
              <span className="text-sm font-semibold text-emerald-700 mt-1 block">Increase revenue & operating profit margins</span>
            </div>
          </Reveal>

        </div>

        {/* Dynamic KPI Dashboard Simulator Widget */}
        <Reveal delay={0} y={30} className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Control Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-800 rounded-lg text-xs font-mono text-emerald-400">
                <Sliders className="w-3.5 h-3.5" />
                INTERACTIVE PERFORMANCE SIMULATOR
              </div>

              <h4 className="text-2xl font-display font-bold tracking-tight text-white">
                Visualize Optimization Potential
              </h4>
              <p className="text-slate-400 text-sm font-normal">
                Adjust the toggles to represent your business's current parameters and see how visual pipelines and automated optimization capture lost margins in real-time.
              </p>

              {/* Slider 1: Labor Hours */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300">Manual Overhead (Weekly Hours)</label>
                  <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {hours} Hours
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-[10px] text-slate-500">Repetitive admin tasks: manual copying, routing, invoicing, reporting.</p>
              </div>

              {/* Slider 2: Monthly Revenue */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300">Monthly Topline Revenue</label>
                  <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    ${revenue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="250000"
                  step="5000"
                  value={revenue}
                  onChange={(e) => setRevenue(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Selector 3: Pricing Leakage */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">Current Pricing Margin Gaps</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "low", label: "Minor (4%)", desc: "Stable prices" },
                    { key: "medium", label: "Moderate (8%)", desc: "No dynamic math" },
                    { key: "high", label: "Severe (13%)", desc: "Arbitrage leaks" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setMarginLeak(item.key)}
                      className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${
                        marginLeak === item.key
                          ? "bg-emerald-600/20 border-emerald-500 text-emerald-400"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[9px] text-slate-500 font-normal block mt-0.5">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live Dashboard Output */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">LIVE REVENUE SIMULATION</span>
                </div>
                <span className="text-slate-500 text-[10px] font-mono">ID: CG_CALC_V2</span>
              </div>

              {/* Visualized Metric Difference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase block">BEFORE OPTIMIZATION</span>
                  <div className="mt-2 space-y-1.5">
                    <p className="text-xs text-slate-400">Monthly Labor Loss: <strong className="text-red-400">${Math.round(currentLaborCost).toLocaleString()}</strong></p>
                    <p className="text-xs text-slate-400">Leaked Revenue/Mo: <strong className="text-red-400">${Math.round(revenueLeaked).toLocaleString()}</strong></p>
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                      <span className="text-[10px] text-slate-400 font-medium">Inefficient Overhead:</span>
                      <span className="text-red-400 font-mono text-sm font-bold">${Math.round(currentLaborCost + revenueLeaked).toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1 bg-emerald-500/10 text-emerald-400 text-[8px] font-mono rounded-bl font-semibold">RECOMMENDED</div>
                  <span className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase block">CG POWERED SYSTEMS</span>
                  <div className="mt-2 space-y-1.5">
                    <p className="text-xs text-emerald-200">New Labor Cost: <strong className="text-emerald-400">${Math.round(postLaborCost).toLocaleString()}</strong></p>
                    <p className="text-xs text-emerald-200">Recovered Leaks: <strong className="text-emerald-400">+${Math.round(revenueOptimized).toLocaleString()}/mo</strong></p>
                    <div className="pt-2 border-t border-emerald-500/10 flex justify-between items-baseline">
                      <span className="text-[10px] text-emerald-300 font-medium">New Saved Profit:</span>
                      <span className="text-emerald-400 font-mono text-base font-extrabold">+${Math.round(totalMonthlyBenefit).toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphical Bar */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Relative Operational Waste</span>
                <div className="relative h-6 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center">
                  {/* Current Waste percentage */}
                  <div className="bg-red-500/10 text-red-400 text-[10px] font-semibold font-mono h-full flex items-center justify-center px-3" style={{ width: "100%" }}>
                    Before CG: 100% Leak & Hours
                  </div>
                  <div className="absolute left-0 top-0 h-full bg-emerald-50 text-white text-[10px] font-semibold font-mono flex items-center justify-center transition-all duration-500" style={{ width: `${Math.round(100 - (postLaborCost + (revenueLeaked - revenueOptimized)) / (currentLaborCost + revenueLeaked) * 100)}%` }}>
                    {Math.round(100 - (postLaborCost + (revenueLeaked - revenueOptimized)) / (currentLaborCost + revenueLeaked) * 100)}% Reclaimed
                  </div>
                </div>
              </div>

              {/* Annualized Projection */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-emerald-400 font-mono font-bold text-xs uppercase tracking-widest block flex items-center gap-1 justify-center sm:justify-start">
                    <Sparkles className="w-3.5 h-3.5" />
                    Projected Annual Business Value Recouped
                  </span>
                  <span className="text-slate-400 text-xs mt-1 block">Recoup manual time as productive capacity + capture dynamic pricing.</span>
                </div>
                <div className="text-center sm:text-right">
                  <span className="text-3xl font-display font-bold text-white block">
                    ${totalAnnualBenefit.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded uppercase mt-1 inline-block">
                    Pure Margin Gain
                  </span>
                </div>
              </div>

              {/* Link CTA */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-2 gap-4">
                <span className="text-xs text-slate-500">Want a highly specific breakdown of these metrics for your unique industry?</span>
                <button
                  onClick={onOpenAudit}
                  className="w-full sm:w-auto text-xs font-semibold px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all text-center cursor-pointer"
                >
                  Generate Precise AI Audit
                </button>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
