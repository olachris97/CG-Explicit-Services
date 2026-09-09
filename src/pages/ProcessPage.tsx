import React from "react";
import HowItWorks from "../components/HowItWorks";
import ConsultationCTA from "../components/ConsultationCTA";
import { Reveal } from "../components/motion/Reveal";
import { Calendar, Search, Hammer, TrendingUp, MessageSquare } from "lucide-react";

export default function ProcessPage() {
  const timeline = [
    {
      icon: <Calendar className="w-5 h-5 text-emerald-600" />,
      week: "Week 0",
      title: "Free Consultation Call",
      desc: "We learn about your operations, current bottlenecks, and goals in a focused 30-minute call."
    },
    {
      icon: <Search className="w-5 h-5 text-emerald-600" />,
      week: "Week 1",
      title: "Deep-Dive Audit",
      desc: "We map your workflows, systems, and revenue data to pinpoint exactly where time and money are leaking."
    },
    {
      icon: <Hammer className="w-5 h-5 text-emerald-600" />,
      week: "Weeks 2-4",
      title: "Build & Integrate",
      desc: "Automations, dashboards, and pricing logic get built and connected to your existing tools."
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-600" />,
      week: "Launch",
      title: "Handoff & Training",
      desc: "You get documentation and a walkthrough so your team can operate the new systems confidently."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      week: "Ongoing",
      title: "Monitor & Optimize",
      desc: "We track performance and continue refining pricing rules and automation logic for compounding gains."
    }
  ];

  return (
    <>
      {/* Intro Banner */}
      <section className="pt-16 pb-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-xs font-bold text-emerald-600 tracking-widest uppercase">
            Our Process
          </h1>
          <p className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            From First Call to a Better-Running System
          </p>
          <p className="text-slate-600 text-base sm:text-lg font-normal max-w-2xl mx-auto">
            A clear, measurable engagement built around discovery, implementation, and continuous improvement — without vague roadmaps or open-ended retainers.
          </p>
        </div>
      </section>

      {/* Original 3-step blueprint */}
      <HowItWorks />

      {/* Detailed timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">
              Engagement Timeline
            </h2>
            <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              What to Expect, Step by Step
            </p>
          </div>

          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.06} y={16} className="flex gap-5 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300" hover>
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{item.week}</span>
                  <h3 className="text-base font-display font-bold text-slate-900 mt-0.5">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA
        variant="emerald"
        eyebrow="Ready When You Are"
        title="Your Process Starts With One Call"
        subtitle="The audit, build, and optimize cycle begins the moment you book your free consultation. No commitment required to get a clear plan."
      />
    </>
  );
}
