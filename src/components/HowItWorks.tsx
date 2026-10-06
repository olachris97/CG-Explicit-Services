import React from "react";
import { ClipboardList, Code, LineChart, ArrowRight } from "lucide-react";
import { Reveal } from "./motion/Reveal";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Audit",
      desc: "We analyze your current systems, manual workflows, spreadsheet logjams, and historical revenue performance to identify major margin leaks and time drains.",
      icon: <ClipboardList className="w-6 h-6 text-emerald-600" />,
      outcome: "Identifies core optimization areas and potential savings blueprint."
    },
    {
      num: "02",
      title: "Build",
      desc: "We implement custom cloud automation triggers, design real-time data pipelines, and develop high-performance dynamic visualization consoles.",
      icon: <Code className="w-6 h-6 text-emerald-600" />,
      outcome: "Deploy fully working automated systems & interactive visual dashboards."
    },
    {
      num: "03",
      title: "Optimize",
      desc: "We refine, monitor, and continuously adjust pricing models, operational rules, and pipeline configs to squeeze out maximum profit and system speed.",
      icon: <LineChart className="w-6 h-6 text-emerald-600" />,
      outcome: "Maximum long-term compounding results + 100% operational clarity."
    }
  ];

  return (
    <section id="process" className="py-20 section-navy-soft border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">
            The 3-Stage Blueprint
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Diagnose. Build. Improve.
          </p>
          <p className="text-slate-500 text-base sm:text-lg mt-4">
            Every engagement turns a clearly identified bottleneck into a working system, then keeps improving it with measurable data.
          </p>
        </div>

        {/* 3 Step Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[15%] right-[15%] h-[2px] bg-slate-200 -z-10" />

          {steps.map((step, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="h-full" hover>
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col relative h-full">

                {/* Timeline bubble & icon */}
                <div className="flex justify-between items-center mb-6">
                  <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                    {step.icon}
                  </div>
                  <span className="font-display font-black text-4xl text-slate-200 select-none">
                    {step.num}
                  </span>
                </div>

                {/* Step info */}
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {step.desc}
                </p>

                {/* Highlighted Outcome */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50 mt-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Focus Outcome</span>
                  <span className="text-xs font-medium text-slate-700">{step.outcome}</span>
                </div>

              </div>
            </Reveal>
          ))}

        </div>

      </div>
    </section>
  );
}
