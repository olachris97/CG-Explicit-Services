import React from "react";
import ResultsSection from "../components/ResultsSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { Reveal } from "../components/motion/Reveal";
import { Target, Eye, Handshake, LineChart, BrainCircuit, Database, Code2, GraduationCap } from "lucide-react";

export default function AboutPage() {
  const values = [
    { icon: <Target className="w-5 h-5 text-secondary-600" />, title: "Outcome Obsessed", desc: "Every engagement is connected to a business outcome — time saved, visibility gained, costs reduced or revenue opportunities uncovered." },
    { icon: <Eye className="w-5 h-5 text-secondary-600" />, title: "Clarity Over Complexity", desc: "Complex data and technology should make a business easier to run, not harder to understand." },
    { icon: <Handshake className="w-5 h-5 text-secondary-600" />, title: "Built Around the Client", desc: "We work with the systems, people and constraints already inside the business and improve them intelligently." },
    { icon: <LineChart className="w-5 h-5 text-secondary-600" />, title: "Evidence Driven", desc: "Recommendations are grounded in data, analysis and measurable operating realities rather than assumptions." }
  ];

  return (
    <>
      <section className="pt-16 pb-14 section-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-xs font-bold text-secondary-600 tracking-[0.2em] uppercase mb-4">About CG Explicit</p>
            <h1 className="text-[2rem] sm:text-5xl font-display font-extrabold text-slate-950 tracking-[-0.04em] leading-[0.98]">
              Technology should make a business <span className="text-primary-900">clearer, faster and more valuable.</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-8 mt-6 max-w-3xl">
              CG Explicit Services was created to help businesses turn scattered data, repetitive processes and operational bottlenecks into intelligent systems that support better decisions and sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 bg-primary-950 text-white relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-secondary-600/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal y={18} className="lg:col-span-4">
              <div className="border border-white/10 bg-white/[0.04] p-4 sm:p-6 rounded-3xl">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 aspect-[4/5]">
                  <img src="/Chibuikem.jpg" alt="Chibuikem, Founder and Lead Specialist at CG Explicit Services" className="h-full w-full object-cover object-top" loading="lazy" />
                </div>
                <p className="mt-6 text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-300">Founder & Lead Specialist</p>
                <h2 className="text-3xl font-display font-extrabold mt-2">Chibuikem</h2>
                <p className="text-slate-300 text-sm leading-6 mt-4">Automation Specialist • Data & Business Analyst • Data Scientist & ML Engineer</p>
                <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs text-slate-400">
                  <p className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-secondary-300" /> B.Eng. Chemical Engineering</p>
                  <p className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-secondary-300" /> B.Sc. Human Anatomy</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={18} className="lg:col-span-8">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-300 mb-4">The person behind the systems</p>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">Built at the intersection of data, technology and business.</h2>
              <div className="mt-7 space-y-5 text-slate-300 leading-7 text-sm sm:text-base">
                <p>Chibuikem is an experienced data scientist and technology specialist focused on helping organizations solve complex business problems through automation, analytics and intelligent systems.</p>
                <p>His technical work spans machine learning, Power BI, statistical modelling, data mining, predictive analytics and computer vision. He works primarily with Python and SQL, with additional experience in R, and understands the full journey from raw data to a deployed, usable solution.</p>
                <p>He has built end-to-end machine learning pipelines covering data preprocessing, feature engineering, model selection and deployment, as well as computer vision solutions for object detection, image segmentation and classification using frameworks such as TensorFlow, Keras and PyTorch.</p>
                <p>That technical depth is paired with a strong business and analytical mindset: translating complex findings into clear recommendations, practical systems and measurable improvements that decision-makers can actually use.</p>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14">
            {[
              [BrainCircuit, "Machine Learning"], [Database, "Data & BI"], [Code2, "Automation"], [LineChart, "Business Analysis"]
            ].map(([Icon, label], i) => {
              const I = Icon as React.ElementType;
              return <div key={i} className="border border-white/10 bg-white/[0.04] rounded-2xl p-5"><I className="w-5 h-5 text-secondary-300" /><p className="mt-3 text-sm font-semibold">{label}</p></div>;
            })}
          </div>
        </div>
      </section>

      <ResultsSection />

      <section className="py-20 section-maroon-soft border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold text-secondary-600 tracking-[0.2em] uppercase mb-3">What Drives Us</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 tracking-tight">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <Reveal key={idx} delay={idx * 0.08} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 hover:border-secondary-300 hover:shadow-md transition-all duration-300" hover>
                <div className="w-10 h-10 bg-secondary-50 rounded-lg flex items-center justify-center border border-secondary-100">{value.icon}</div>
                <h3 className="text-sm font-bold text-slate-950">{value.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{value.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA variant="dark" eyebrow="Let's Talk" title="See What We'd Build for You" subtitle="Every business has its own operational challenges. Book a free call and we'll help identify where technology can create the most leverage." />
    </>
  );
}
