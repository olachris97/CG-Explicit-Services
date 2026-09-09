import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import { Reveal } from "../components/motion/Reveal";
import { LayoutOutletContext } from "../Layout";
import {
  Cpu,
  BarChart3,
  TrendingUp,
  ClipboardList,
  Code,
  LineChart,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Percent,
  Sparkles,
  Calendar,
  Zap,
  Clock,
  Users,
  ExternalLink
} from "lucide-react";

export default function Home() {
  const { onOpenAudit, onNavigateSection } = useOutletContext<LayoutOutletContext>();

  return (
    <>
      <Hero onScrollTo={onNavigateSection} onOpenAudit={onOpenAudit} />

      {/* ============ BUSINESS OUTCOMES ============ */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold text-secondary-600 tracking-widest uppercase mb-3">Built for Better Operations</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-900 tracking-tight">
                Turn operational friction into measurable performance.
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed">
                We do more than automate tasks. We connect the workflows, data, and decisions behind your business so your team can move faster with fewer blind spots.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary-900 hover:text-secondary-600 transition-colors">
                Explore our solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Zap, title: "Less Manual Work", text: "Replace repetitive steps with reliable automated workflows." },
                { icon: BarChart3, title: "Clearer Decisions", text: "Bring the metrics your team needs into one useful view." },
                { icon: TrendingUp, title: "Stronger Margins", text: "Find pricing and process gaps that quietly cost you money." }
              ].map(({ icon: Icon, title, text }, idx) => (
                <Reveal key={title} delay={idx * 0.08} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 transition-all duration-300 hover:shadow-md hover:border-secondary-200" hover>
                  <div className="w-10 h-10 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-primary-900">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SUMMARY ============ */}
      <section id="services-summary" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Reveal delay={0} className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-emerald-300 transition-all duration-300 group hover:shadow-md" hover>
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-3">
                Workflow Automation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automate repetitive processes, reduce manual work and human error, and improve day-to-day operational efficiency.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-emerald-300 transition-all duration-300 group hover:shadow-md" hover>
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-3">
                Data Visualization & Dashboards
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Real-time KPI dashboards that track live performance metrics and remove data silos for leadership teams.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-emerald-300 transition-all duration-300 group hover:shadow-md" hover>
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-3">
                Revenue Optimization
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Analyze pricing models, identify margin gaps, and implement proactive, data-driven pricing rules.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold rounded-xl text-sm transition-all shadow-sm cursor-pointer"
            >
              See All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book a Free Consultation Call
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TALENT HIRE ============ */}
      <section className="py-20 bg-primary-950 text-white relative overflow-hidden">
        <div className="absolute -left-24 -top-24 w-72 h-72 bg-orange-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal delay={0} y={16} className="lg:col-span-8 space-y-5">
              <div className="w-12 h-12 bg-orange-accent-500/15 text-orange-accent-400 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-xs font-bold text-orange-accent-400 tracking-widest uppercase">
                Beyond Automation
              </h2>
              <p className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
                We Also Handle Talent Hire
              </p>
              <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                Need skilled people, not just smarter systems? Through our partner platform HiresExact, we help you source and hire vetted remote talent to run and scale the workflows we build for you.
              </p>
            </Reveal>
            <Reveal delay={0.12} y={16} className="lg:col-span-4 flex lg:justify-end">
              <a
                href="https://hiresexact.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-accent-500 hover:bg-orange-accent-600 text-primary-950 font-bold rounded-xl text-sm transition-all shadow-md shadow-orange-accent-500/20 cursor-pointer whitespace-nowrap"
              >
                Hire Talent on HiresExact
                <ExternalLink className="w-4 h-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ DELIVERY APPROACH ============ */}
      <section id="process-summary" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold text-secondary-600 tracking-widest uppercase mb-3">A Clear Delivery Model</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-900 tracking-tight">
                From bottleneck to working system.
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed">
                We start with the problem, build around your existing operation, and measure what changes. You always know what is being fixed, why it matters, and what comes next.
              </p>
              <Link to="/how-it-works" className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-xl text-sm font-semibold transition-all">
                See our full process <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { num: "01", title: "Diagnose", text: "Map the workflow, data, and constraints before recommending anything." },
                { num: "02", title: "Build", text: "Connect the right tools and automate the work that slows your team down." },
                { num: "03", title: "Improve", text: "Use real performance data to refine the system and capture more value." }
              ].map((step, idx) => (
                <Reveal key={step.num} delay={idx * 0.08} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:shadow-md hover:border-secondary-200" hover>
                  <span className="text-xs font-mono font-bold text-secondary-600">{step.num}</span>
                  <h3 className="text-lg font-display font-bold text-primary-900 mt-3">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-2">{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICING SUMMARY ============ */}
      <section id="pricing-summary" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">
              Investment
            </h2>
            <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Service Packages
            </p>
            <p className="text-slate-500 text-base sm:text-lg mt-4 font-normal">
              We price strictly on ROI, not hours. Select the scale that matches your operation, or book a free call to get a custom recommendation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Reveal delay={0} className="h-full">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <h3 className="text-lg font-display font-black text-slate-900 uppercase tracking-wide">Starter</h3>
                  <p className="text-2xl font-display font-black text-slate-900">$300 – $500</p>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    Ideal for micro-businesses looking to eliminate their single heaviest manual workflow leak.
                  </p>
                </div>
                <div className="mt-6 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-center">
                  <span className="text-xs font-bold text-emerald-700">Deletes 5-10 hrs of manual work / week</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="h-full">
              <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500 ring-2 ring-emerald-500/10 shadow-xl scale-105 flex flex-col justify-between relative h-full">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  MOST POPULAR
                </span>
                <div className="space-y-4">
                  <h3 className="text-lg font-display font-black text-slate-900 uppercase tracking-wide">Growth</h3>
                  <p className="text-2xl font-display font-black text-slate-900">$800 – $1,500</p>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    Perfect for growing operations needing interconnected automations and real-time visual consoles.
                  </p>
                </div>
                <div className="mt-6 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-center">
                  <span className="text-xs font-bold text-emerald-700">Saves 15-25 hrs/week + recovers pricing leaks</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="h-full">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <h3 className="text-lg font-display font-black text-slate-900 uppercase tracking-wide">Premium</h3>
                  <p className="text-2xl font-display font-black text-slate-900">$2,500+</p>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    End-to-end operational optimization system engineered for enterprise-ready workflows.
                  </p>
                </div>
                <div className="mt-6 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-center">
                  <span className="text-xs font-bold text-emerald-700">Full custom-engineered operational engine</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold rounded-xl text-sm transition-all shadow-sm cursor-pointer"
            >
              Compare All Packages
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book a Free Consultation Call
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHAT TO EXPECT ON THE CALL ============ */}
      <section id="contact-summary" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase">
                Get Connected
              </h2>
              <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Ready to Optimize Your Business?
              </p>
              <p className="text-slate-500 text-base font-normal leading-relaxed">
                Select a convenient slot on our scheduler to lock in a completely free, live 30-minute system audit consultation. Let's trace your revenue leakage points together.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/10 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book a Free Consultation Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Reveal delay={0} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2" hover>
                <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">30 Minutes</h4>
                <p className="text-xs text-slate-500 leading-relaxed">A focused live call, no lengthy sales pitch.</p>
              </Reveal>
              <Reveal delay={0.08} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2" hover>
                <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Zero Obligation</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Completely free — no cost, no contracts.</p>
              </Reveal>
              <Reveal delay={0.16} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2" hover>
                <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Real Recommendations</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Leave with a concrete plan, not vague advice.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA BANNER ============ */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-slate-900 opacity-90" />
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h3 className="text-3xl sm:text-4xl font-display font-black tracking-tight leading-none">
            Start with a Risk-Free Systems Blueprint
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Before you spend a single dollar, let us map your systems completely. We outline exactly where your leaks are, estimate weekly hours saved, and deliver a visual mockup completely free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              onClick={onOpenAudit}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              Launch Free System Audit
            </button>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl text-sm transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book a Free Consultation Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
