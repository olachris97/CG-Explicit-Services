import React from "react";
import { ArrowRight, BarChart3, Bot, CheckCircle2, Workflow } from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface HeroProps {
  onScrollTo: (elementId: string) => void;
  onOpenAudit: () => void;
}

const heroImage =
  "https://images.pexels.com/photos/7109243/pexels-photo-7109243.jpeg?cs=srgb&dl=pexels-tiger-lily-7109243.jpg&fm=jpg";

export default function Hero({ onScrollTo, onOpenAudit }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-primary-950 pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute -right-48 -top-48 h-[38rem] w-[38rem] rounded-full bg-secondary-700/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col space-y-6 sm:space-y-7 lg:col-span-6">
            <div className="inline-flex w-fit items-center gap-2 border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-secondary-400" />
              Automation • Data • Business Intelligence
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold text-secondary-300">CG Explicit Services</p>
              <h1 className="font-display text-[2.75rem] font-extrabold leading-[0.94] tracking-[-0.045em] text-white sm:text-5xl lg:text-[60px]">
                Automate.
                <br />
                <span className="text-white">Optimize.</span>
                <br />
                <span className="text-secondary-300">Grow.</span>
              </h1>
            </div>

            <p className="max-w-2xl text-[15px] leading-7 text-slate-300 sm:text-lg sm:leading-8">
              We design automation, analytics and intelligent business systems that remove operational friction, reveal better decisions and create measurable room for growth.
            </p>

            <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center">
              <button
                onClick={onOpenAudit}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-secondary-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-black/20 transition-all hover:bg-secondary-500"
              >
                Get a Free Business Audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onScrollTo("contact")}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white transition-all hover:border-white/40 hover:bg-white/15"
              >
                Book a Consultation
              </button>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3 sm:gap-5 border-t border-white/15 pt-6 sm:pt-7">
              <div>
                <p className="font-display text-xl font-extrabold text-white sm:text-3xl">75%+</p>
                <p className="mt-1 text-[9px] font-bold uppercase leading-4 tracking-[0.08em] text-slate-400 sm:text-xs">Repetitive work reduced</p>
              </div>
              <div className="border-l border-white/15 pl-5">
                <p className="font-display text-xl font-extrabold text-white sm:text-3xl">12%</p>
                <p className="mt-1 text-[9px] font-bold uppercase leading-4 tracking-[0.08em] text-slate-400 sm:text-xs">Average revenue lift</p>
              </div>
              <div className="border-l border-white/15 pl-5">
                <p className="font-display text-xl font-extrabold text-secondary-300 sm:text-3xl">300+</p>
                <p className="mt-1 text-[9px] font-bold uppercase leading-4 tracking-[0.08em] text-slate-400 sm:text-xs">Hours reclaimed / month</p>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-secondary-700/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem] border border-white/15 bg-white/5 p-1.5 sm:p-2 shadow-2xl shadow-black/30">
                <div className="relative aspect-[1/1] sm:aspect-[4/3.35] overflow-hidden rounded-[1.4rem] sm:rounded-[2rem] bg-slate-900">
                  <img src={heroImage} alt="Business professional reviewing analytics" className="h-full w-full object-cover" loading="eager" fetchPriority="high" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-950/65 via-primary-900/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-950/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-300">Business systems, engineered</p>
                    <p className="mt-1 max-w-xs font-display text-lg font-bold leading-tight text-white sm:text-2xl">Turn data and workflows into measurable growth.</p>
                  </div>
                </div>
              </div>

              <Reveal delay={0.3} y={12} className="absolute -left-4 top-8 hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:block sm:-left-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><Workflow className="h-5 w-5" /></div>
                  <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Service</p><p className="text-sm font-bold text-primary-900">Workflow Automation</p></div>
                </div>
              </Reveal>

              <Reveal delay={0.45} y={12} className="absolute -bottom-4 right-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:-bottom-6 sm:right-0 md:-right-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600"><BarChart3 className="h-5 w-5" /></div>
                  <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Focus</p><p className="text-sm font-bold text-primary-900">Data & KPI Dashboards</p></div>
                </div>
              </Reveal>

              <Reveal delay={0.2} y={-10} className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-primary-950/85 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                <Bot className="h-4 w-4 text-secondary-300" /> AI & Automation
              </Reveal>

              <Reveal delay={0.55} y={12} className="absolute bottom-8 left-4 hidden items-center gap-2 rounded-full border border-white/70 bg-white px-3 py-2 text-xs font-semibold text-primary-900 shadow-lg sm:flex">
                <CheckCircle2 className="h-4 w-4 text-secondary-600" /> Revenue Optimization
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
