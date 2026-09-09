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
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-12 pb-20 md:py-24"
    >
      {/* Ambient brand gradients */}
      <div className="absolute -right-48 -top-48 h-[38rem] w-[38rem] rounded-full bg-accent-100/60 blur-3xl" />
      <div className="absolute -bottom-48 -left-48 h-[32rem] w-[32rem] rounded-full bg-secondary-50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Hero copy */}
          <div className="flex flex-col space-y-6 lg:col-span-7">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-xs font-semibold tracking-wide text-primary-800">
              <span className="flex h-2 w-2 rounded-full bg-secondary-500 animate-pulse" />
              Maximize Profitability & Operational Speed
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-[45px] lg:text-[50px]">
              Increase Revenue & Reduce Costs with{" "}
              <span className="bg-gradient-to-r from-accent-600 to-secondary-500 bg-clip-text text-transparent">
                Automation
              </span>{" "}
              and Data-Driven Systems
            </h1>

            <p className="max-w-2xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
              We help businesses streamline workflows, visualize performance, and
              optimize operations for higher profitability. Fill operational leaks
              and scale efficiently.
            </p>

            <div className="flex flex-col items-stretch gap-4 pt-4 sm:flex-row sm:items-center">
              <button
                onClick={onOpenAudit}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-900 px-6 py-3.5 font-semibold text-white shadow-md shadow-primary-900/10 transition-all duration-200 hover:bg-primary-800 hover:shadow-lg"
              >
                Get a Free Business Audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onScrollTo("contact")}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:bg-slate-50"
              >
                Book a Free Consultation
              </button>
            </div>

            {/* Quick proof indicators */}
            <div className="grid max-w-lg grid-cols-3 gap-4 border-t border-slate-100 pt-8">
              <div>
                <p className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">75%+</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 sm:text-xs">
                  Repetitive Work Reduced
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">12%</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 sm:text-xs">
                  Avg Revenue Increase
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-secondary-600 sm:text-3xl">300+</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 sm:text-xs">
                  Hours Reclaimed / Mo
                </p>
              </div>
            </div>
          </div>

          {/* Service-focused image */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent-500/20 via-secondary-500/10 to-orange-accent-500/10 blur-xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-900 p-2 shadow-2xl shadow-primary-900/20">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <img
                    src={heroImage}
                    alt="Business professional reviewing a data analytics dashboard, representing CG Explicit Services' automation and data-driven consulting services"
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-950/65 via-primary-900/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-950/70 to-transparent" />

                  {/* Image caption */}
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-300">
                      CG Explicit Services
                    </p>
                    <p className="mt-1 max-w-xs font-display text-xl font-bold leading-tight text-white sm:text-2xl">
                      Turn data and workflows into measurable growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating service cards */}
              <Reveal delay={0.3} y={12} className="absolute -left-4 top-8 hidden rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur sm:block sm:-left-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <Workflow className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Service</p>
                    <p className="text-sm font-bold text-primary-900">Workflow Automation</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.45} y={12} className="absolute -bottom-5 -right-4 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur sm:-right-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Focus</p>
                    <p className="text-sm font-bold text-primary-900">Data & KPI Dashboards</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2} y={-10} className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-primary-950/75 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                <Bot className="h-4 w-4 text-secondary-300" />
                AI & Automation
              </Reveal>

              <Reveal delay={0.55} y={12} className="absolute bottom-8 left-4 hidden items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3 py-2 text-xs font-semibold text-primary-900 shadow-lg backdrop-blur sm:flex">
                <CheckCircle2 className="h-4 w-4 text-secondary-500" />
                Revenue Optimization
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
