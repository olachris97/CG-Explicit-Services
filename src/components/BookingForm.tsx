import React, { useState } from "react";
import { Calendar, Clock, Sparkles, Send, CheckCircle2, User, Mail, Briefcase, AlertCircle } from "lucide-react";
import { ContactInquiry, ConsultationBooking } from "../types";
import { apiFetch } from "../lib/api";
import { Reveal } from "./motion/Reveal";

interface BookingFormProps {
  preFilledInquiry: ContactInquiry | null;
  onPreFillClear: () => void;
}

export default function BookingForm({ preFilledInquiry, onPreFillClear }: BookingFormProps) {
  // Booking availability: show the next five weekdays as quick picks,
  // with a native calendar picker for any other date.
  const getDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isWeekday = (date: Date) => date.getDay() !== 0 && date.getDay() !== 6;

  const buildAvailableDates = () => {
    const result: { day: string; dateNum: string; fullDate: string; label: string }[] = [];
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);

    while (result.length < 5) {
      if (isWeekday(cursor)) {
        result.push({
          day: cursor.toLocaleDateString("en-US", { weekday: "short" }),
          dateNum: String(cursor.getDate()),
          fullDate: getDateKey(cursor),
          label: cursor.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        });
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    return result;
  };

  const dates = buildAvailableDates();
  const times = ["09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

  const todayKey = getDateKey(new Date());
  const maxDateValue = new Date();
  maxDateValue.setDate(maxDateValue.getDate() + 90);
  const maxDate = getDateKey(maxDateValue);

  const [selectedDate, setSelectedDate] = useState<string>(dates[0]?.fullDate || todayKey);
  const [selectedTime, setSelectedTime] = useState<string>("11:00 AM");

  // Form input fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "E-Commerce",
    problem: "",
    selectedPackage: "Growth"
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state if parents pre-fill
  React.useEffect(() => {
    if (preFilledInquiry) {
      setFormData({
        name: preFilledInquiry.name || "",
        email: preFilledInquiry.email || "",
        businessType: preFilledInquiry.businessType || "E-Commerce",
        problem: preFilledInquiry.problem || "",
        selectedPackage: preFilledInquiry.selectedPackage || "Growth"
      });
    }
  }, [preFilledInquiry]);

  const formatSelectedDate = (value: string) =>
    new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

  const handleDateChange = (value: string) => {
    if (!value) return;
    const picked = new Date(`${value}T12:00:00`);
    if (!isWeekday(picked)) {
      setErrorMsg("Please choose a weekday (Monday to Friday).");
      return;
    }
    setErrorMsg(null);
    setSelectedDate(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.problem) {
      setErrorMsg("Please provide your name, email, and describe your business problem.");
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      // 1. Submit consultation booking
      const bookRes = await apiFetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          date: selectedDate,
          time: selectedTime,
          businessType: formData.businessType,
          problem: formData.problem,
          auditReportId: preFilledInquiry?.auditReportId,
          auditRecommendation: preFilledInquiry?.auditRecommendation
        })
      });

      // 2. Submit formal contact inquiry
      const contactRes = await apiFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          businessType: formData.businessType,
          problem: formData.problem,
          selectedPackage: formData.selectedPackage,
          auditReportId: preFilledInquiry?.auditReportId,
          auditRecommendation: preFilledInquiry?.auditRecommendation
        })
      });

      if (!bookRes.ok || !contactRes.ok) {
        throw new Error("Form submission failure");
      }

      setSuccessMsg(`Success! Your 1-on-1 systems audit call is booked for ${formatSelectedDate(selectedDate)} at ${selectedTime}. We'll follow up at ${formData.email} with the consultation details.`);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        businessType: "E-Commerce",
        problem: "",
        selectedPackage: "Growth"
      });
      onPreFillClear(); // clear global prefill
      
    } catch (err) {
      console.error(err);
      setErrorMsg("Unable to book consultation. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 section-navy-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">
            Get Connected
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Ready to Optimize Your Business?
          </p>
          <p className="text-slate-500 text-base sm:text-lg mt-4 font-normal">
            Select a convenient slot on our scheduler to lock in a completely free, live 30-minute system audit consultation. Let's trace your revenue leakage points together.
          </p>
        </div>

        {/* Dual Booking Widget Card */}
        <Reveal y={28} className="bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 p-4 sm:p-10 shadow-lg max-w-5xl mx-auto">
          {successMsg ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-lg">
                <h3 className="font-display font-bold text-2xl text-slate-900">Consultation Locked In</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{successMsg}</p>
              </div>
              <button
                onClick={() => setSuccessMsg(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-all cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Side: Calendly Style Selector (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-display font-bold text-md text-slate-900 uppercase tracking-wide">
                    1. Select Date & Time Slot
                  </h4>
                </div>

                {/* Quick date selector + full calendar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Available dates
                    </span>
                    <span className="text-[10px] text-slate-400">Mon–Fri</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {dates.map((d) => (
                      <button
                        key={d.fullDate}
                        type="button"
                        onClick={() => handleDateChange(d.fullDate)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                          selectedDate === d.fullDate
                            ? "bg-emerald-600 border-emerald-500 text-white font-bold shadow-md shadow-emerald-600/10"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-[9px] uppercase font-semibold block">{d.day}</span>
                        <span className="text-md font-display font-bold mt-0.5 block">{d.dateNum}</span>
                      </button>
                    ))}
                  </div>

                  <div className="rounded-xl border border-dashed border-slate-300 bg-white p-3">
                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                      <span>
                        <span className="block text-xs font-bold text-slate-800">Need another date?</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">
                          Open the calendar and choose a weekday within the next 90 days.
                        </span>
                      </span>
                      <div className="relative shrink-0">
                        <Calendar className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="date"
                          value={selectedDate}
                          min={todayKey}
                          max={maxDate}
                          onChange={(e) => handleDateChange(e.target.value)}
                          className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          aria-label="Choose another consultation date"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                {/* Time selector */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block tracking-wider">Available Times (UTC-7)</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {times.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          selectedTime === t
                            ? "bg-slate-900 border-slate-800 text-white font-bold"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Slot Recap */}
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-center gap-3.5">
                  <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">Selected slot</span>
                    <span className="text-xs font-bold text-slate-800">
                      {formatSelectedDate(selectedDate)} @ {selectedTime} (Virtual Meeting Details Provided)
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Contact info fields (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-display font-bold text-md text-slate-900 uppercase tracking-wide">
                      2. Submit Your Details
                    </h4>
                  </div>
                  {preFilledInquiry && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      PRE-FILLED BY AUDIT
                    </span>
                  )}
                </div>

                {errorMsg && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Your Name / Business Representative</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Carter"
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Email Address</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@carterretail.com"
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Business Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Business / Workflow Type</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                        <Briefcase className="w-4 h-4" />
                      </span>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="E-Commerce">E-Commerce Operation</option>
                        <option value="Logistics">Logistics & Supply Chain</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="SaaS / Agency">SaaS / Agency</option>
                        <option value="Healthcare">Healthcare & Clinical</option>
                        <option value="Other Sector">Other Sector</option>
                      </select>
                    </div>
                  </div>

                  {/* Package */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Proposed Package Level</label>
                    <select
                      name="selectedPackage"
                      value={formData.selectedPackage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Starter">Starter Package ($300 – $500)</option>
                      <option value="Growth">Growth Package ($800 – $1,500)</option>
                      <option value="Premium">Premium Package ($2,500+)</option>
                      <option value="Custom (From Audit)">Audit Recommended Systems Plan</option>
                    </select>
                  </div>

                </div>

                {/* Problem Statement */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                    Describe your primary manual bottleneck / problem to solve
                  </label>
                  <textarea
                    name="problem"
                    required
                    rows={4}
                    value={formData.problem}
                    onChange={handleInputChange}
                    placeholder="Describe exactly what takes up your team's time (e.g., copying invoice lines into accounting every Friday, manually updating marketplace inventory, or tracking driver locations)..."
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Submit Row */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  {preFilledInquiry && (
                    <button
                      type="button"
                      onClick={onPreFillClear}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Clear Pre-filled Details
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/10 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Lock In Appointment
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>

            </form>
          )}
        </Reveal>

      </div>
    </section>
  );
}
