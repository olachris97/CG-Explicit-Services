import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Reveal } from "./motion/Reveal";

interface ConsultationCTAProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  variant?: "dark" | "light" | "emerald";
  buttonLabel?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

const VARIANT_STYLES = {
  dark: {
    section: "section-maroon text-white",
    eyebrow: "text-secondary-100",
    subtitle: "text-white/80",
    button: "bg-white hover:bg-slate-100 text-black shadow-secondary-950/10",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20"
  },
  light: {
    section: "bg-white text-slate-900 border-t border-slate-100",
    eyebrow: "text-emerald-600",
    subtitle: "text-slate-500",
    button: "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10",
    secondary: "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
  },
  emerald: {
    section: "section-maroon text-white",
    eyebrow: "text-secondary-100",
    subtitle: "text-white/80",
    button: "bg-white hover:bg-slate-100 text-black shadow-secondary-950/10",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20"
}
} as const;

export default function ConsultationCTA({
  eyebrow,
  title,
  subtitle,
  variant = "light",
  buttonLabel = "Book a Free Consultation Call",
  secondaryLabel,
  secondaryTo
}: ConsultationCTAProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <section className={`py-16 ${styles.section}`}>
      <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        {eyebrow && (
          <p className={`text-xs font-bold tracking-widest uppercase ${styles.eyebrow}`}>
            {eyebrow}
          </p>
        )}
        <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className={`text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed ${styles.subtitle}`}>
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link
            to="/contact"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold rounded-xl text-sm transition-all shadow-md cursor-pointer ${styles.button}`}
          >
            <Calendar className="w-4 h-4" />
            {buttonLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
          {secondaryLabel && secondaryTo && (
            <Link
              to={secondaryTo}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold rounded-xl text-sm transition-all cursor-pointer ${styles.secondary}`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
