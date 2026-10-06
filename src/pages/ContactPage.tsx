import React from "react";
import { useOutletContext } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { Reveal } from "../components/motion/Reveal";
import { LayoutOutletContext } from "../Layout";
import { Clock, Zap, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const { preFilledInquiry, onPreFillClear } = useOutletContext<LayoutOutletContext>();

  return (
    <>
      {/* Intro Banner */}
      <section className="pt-16 pb-8 section-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-xs font-bold text-emerald-600 tracking-widest uppercase">
            Contact
          </h1>
          <p className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Book a Free Consultation Call
          </p>
          <p className="text-slate-600 text-base sm:text-lg font-normal max-w-2xl mx-auto">
            Pick a slot below to lock in a completely free, live 30-minute systems audit consultation with our team.
          </p>
        </div>
      </section>

      {/* What to expect strip */}
      <section className="pb-4 section-navy-soft">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Reveal delay={0} className="bg-white p-5 rounded-2xl border border-slate-100 space-y-2" hover>
              <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                <Clock className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">30 Minutes</h4>
              <p className="text-xs text-slate-500 leading-relaxed">A focused live call, no lengthy sales pitch.</p>
            </Reveal>
            <Reveal delay={0.08} className="bg-white p-5 rounded-2xl border border-slate-100 space-y-2" hover>
              <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                <Zap className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Zero Obligation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Completely free — no cost, no contracts.</p>
            </Reveal>
            <Reveal delay={0.16} className="bg-white p-5 rounded-2xl border border-slate-100 space-y-2" hover>
              <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Real Recommendations</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Leave with a concrete plan, not vague advice.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Original booking + contact form */}
      <BookingForm
        preFilledInquiry={preFilledInquiry}
        onPreFillClear={onPreFillClear}
      />

      {/* Direct contact details */}
      <section className="pb-20 section-maroon">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal y={20} className="bg-primary-950 text-white rounded-3xl p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email</span>
                <span className="text-sm font-semibold">sales@cgexplicitservices.com</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone</span>
                <span className="text-sm font-semibold">+1 303-720-6109</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Office</span>
                <span className="text-sm font-semibold leading-5">36 South 18th Avenue, Suite D<br />Brighton CO 80601<br />US</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
