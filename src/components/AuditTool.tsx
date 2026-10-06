import React, { useState } from "react";
import { Cpu, Sparkles, Clock, DollarSign, TrendingUp, HelpCircle, ArrowRight, CheckCircle, RefreshCw, Layers, Clipboard } from "lucide-react";
import { BusinessAuditRequest, BusinessAuditResponse } from "../types";
import { apiFetch } from "../lib/api";

interface AuditToolProps {
  onPreFillBooking: (info: {
    name: string;
    email: string;
    businessType: string;
    problem: string;
    selectedPackage: string;
    auditReportId?: string;
    auditRecommendation?: BusinessAuditResponse;
  }) => void;
  onScrollTo: (elementId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditTool({ onPreFillBooking, onScrollTo, isOpen, onClose }: AuditToolProps) {
  const [formData, setFormData] = useState<BusinessAuditRequest>({
    businessName: "",
    email: "",
    industry: "E-Commerce",
    monthlyRevenue: "45000",
    manualLaborHours: "20",
    bottleneck: "",
    targetOutcome: ""
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [auditResult, setAuditResult] = useState<BusinessAuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const industries = [
    "E-Commerce",
    "Retail & Wholesale",
    "Logistics & Delivery",
    "Professional Services",
    "Health & Medical",
    "Construction & Real Estate",
    "SaaS / Software",
    "Other"
  ];

  const commonBottlenecks = [
    "Manual data entry & copying across 3+ spreadsheets",
    "Inefficient pricing adjustments & margin leaks (no dynamic repricing)",
    "Customer billing, invoicing, and follow-up payment delays",
    "Dispatch scheduling & client service routing bottlenecks",
    "Data silos between CRM, warehouse, and financial bookkeeping",
    "Other operational friction point"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const startLoadingAnimation = () => {
    setLoading(true);
    setLoadingStep(1);
    
    const t1 = setTimeout(() => setLoadingStep(2), 1000);
    const t2 = setTimeout(() => setLoadingStep(3), 2200);
    const t3 = setTimeout(() => setLoadingStep(4), 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.email || !formData.bottleneck) {
      setError("Please provide your business name, email address, and current bottleneck.");
      return;
    }

    setError(null);
    setAuditResult(null);
    const cancelTimers = startLoadingAnimation();

    try {
      const response = await apiFetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to calculate audit metrics.");
      }

      const data: BusinessAuditResponse = await response.json();
      
      // Let the loading step finish nicely
      setTimeout(() => {
        setAuditResult(data);
        setLoading(false);
      }, 4200);

    } catch (err: any) {
      console.error(err);
      setError("Unable to process audit. Please try again.");
      setLoading(false);
    }
  };

  const handleApplyRecommended = () => {
    if (!auditResult) return;
    
    // Pre-fill booking details in the parent state
    onPreFillBooking({
      name: formData.businessName,
      email: formData.email,
      businessType: `${formData.industry} Sector`,
      problem: `[Generated Audit Recommendation] Bottleneck: ${formData.bottleneck}. Recommended System: ${auditResult.dashboardOpportunity}. Custom steps: ${auditResult.customActionSteps.map(s => s.title).join(", ")}.`,
      selectedPackage: auditResult.recommendedPackage,
      auditReportId: auditResult.auditReportId,
      auditRecommendation: auditResult
    });

    // Close audit modal and scroll to contact
    if (onClose) onClose();
    setTimeout(() => {
      onScrollTo("contact");
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/85 backdrop-blur-sm flex justify-center items-start sm:items-center p-0 sm:p-4">
      <div className="bg-white rounded-none sm:rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-100 overflow-hidden relative flex flex-col min-h-full sm:min-h-0 max-h-none sm:max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-primary-950 text-white px-4 py-4 sm:px-8 sm:py-5 flex justify-between items-center shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-xl font-display font-bold tracking-tight pr-3">
              Free AI Business Audit & Value Blueprint
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-xl font-semibold p-2 h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-800"
          >
            &times;
          </button>
        </div>

        {/* Content Container */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-grow overscroll-contain">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl font-semibold">
              {error}
            </div>
          )}

          {!loading && !auditResult && (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-xs sm:text-sm">
                💡 <strong>How it works:</strong> Enter your basic operational metrics below. Our system will analyze your values and use advanced logic to formulate a precise automation, dashboard mapping, and pricing improvement plan.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Business Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Business / Organization Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g. Apex Distribution Ltd"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                  />
                </div>

                {/* Client Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@yourbusiness.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 text-sm"
                  />
                  <p className="text-[10px] text-slate-500">We’ll attach this audit to your client record so the team can use the recommendations during your consultation.</p>
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Industry Sector
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                  >
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Monthly Revenue */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Estimated Monthly Revenue ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-mono text-sm pointer-events-none">$</span>
                    <input
                      type="number"
                      name="monthlyRevenue"
                      required
                      min="1000"
                      max="10000000"
                      value={formData.monthlyRevenue}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Used to estimate pricing arbitrage leaks and top-line scaling multipliers.</p>
                </div>

                {/* Repetitive Task Hours */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Repetitive Labor Hours Spent / Week
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="manualLaborHours"
                      required
                      min="1"
                      max="168"
                      value={formData.manualLaborHours}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-mono"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 text-xs pointer-events-none">hrs / week</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Weekly team hours spent on copying data, double-checking logs, generating manual reports.</p>
                </div>

              </div>

              {/* Operational Bottleneck Selector */}
              <div className="space-y-3">
                <label htmlFor="bottleneck" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Your Main Operational Bottleneck
                </label>
                <select
                  id="bottleneck"
                  name="bottleneck"
                  value={formData.bottleneck}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                >
                  <option value="">Choose the operational issue that affects your business most</option>
                  {commonBottlenecks.map((bText) => (
                    <option key={bText} value={bText}>
                      {bText}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500">Choose the issue that currently creates the most operational friction. You can explain the details during your consultation.</p>
              </div>

              {/* Target Outcome */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Primary Target Outcome / Goal
                </label>
                <input
                  type="text"
                  name="targetOutcome"
                  value={formData.targetOutcome}
                  onChange={handleInputChange}
                  placeholder="e.g. Save 20 hours/week and connect dynamic stock feeds to Shopify store"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 text-slate-500 hover:text-slate-700 text-sm font-semibold hover:bg-slate-50 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto justify-center px-6 py-3 bg-secondary-600 hover:bg-secondary-500 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-secondary-600/15 cursor-pointer"
                >
                  <Cpu className="w-4 h-4" />
                  Generate My System Audit
                </button>
              </div>

            </form>
          )}

          {/* Loading Transition State */}
          {loading && (
            <div className="py-16 flex flex-col justify-center items-center space-y-6 text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                <Sparkles className="w-6 h-6 text-emerald-500 absolute inset-0 m-auto animate-pulse" />
              </div>

              <div className="space-y-2 max-w-sm">
                <h4 className="font-display font-bold text-lg text-slate-900">
                  Formulating Your System Audit
                </h4>
                
                {/* Animated progress subtitles */}
                <div className="h-6 overflow-hidden">
                  <p className={`text-xs text-slate-500 transition-transform duration-500 font-medium ${
                    loadingStep === 1 ? "translate-y-0" :
                    loadingStep === 2 ? "-translate-y-6" :
                    loadingStep === 3 ? "-translate-y-12" : "-translate-y-18"
                  }`}>
                    {loadingStep === 1 && "Step 1: Analyzing repetitive labor overhead leaks..."}
                    {loadingStep === 2 && "Step 2: Assessing pricing structures & margin leaks..."}
                    {loadingStep === 3 && "Step 3: Engineering custom API pipeline mappings..."}
                    {loadingStep === 4 && "Step 4: Finalizing visual KPI dashboard blueprint..."}
                  </p>
                </div>
              </div>

              <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-[4000ms] ease-out w-full" />
              </div>
            </div>
          )}

          {/* Rich Audit Results Dashboard Output */}
          {auditResult && (
            <div className="space-y-8 animate-fade-in">
              
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Audit Successful</p>
                  <p className="text-xs text-emerald-700 font-medium mt-0.5">We have mapped an optimization system for <strong>{formData.businessName}</strong>. See calculated values and operational blueprints below.</p>
                </div>
              </div>

              {/* Big Metrics Display Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">Weekly Hours Saved</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-display font-bold text-slate-900">{auditResult.estimatedTimeSavingsHours}</span>
                    <span className="text-xs text-slate-500">Hours</span>
                  </div>
                  <span className="text-[9px] text-emerald-600 font-bold bg-emerald-100/60 px-1.5 py-0.5 rounded font-mono block mt-2 w-fit">
                    ~75% Saved
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">Monthly Time Reclaimed</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-display font-bold text-slate-900">${auditResult.estimatedMonthlyLaborSavings.toLocaleString()}</span>
                    <span className="text-xs text-slate-500">value</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium block mt-2">
                    Recouped labor overhead
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">Annual Savings</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-display font-bold text-slate-900">${auditResult.estimatedAnnualLaborSavings.toLocaleString()}</span>
                  </div>
                  <span className="text-[9px] text-emerald-600 font-bold bg-emerald-100/60 px-1.5 py-0.5 rounded font-mono block mt-2 w-fit">
                    Direct margin boost
                  </span>
                </div>

                <div className="bg-emerald-900 text-white p-4 rounded-xl border border-emerald-850 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 opacity-10">
                    <TrendingUp className="w-24 h-24" />
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-300 block uppercase">Topline Revenue Lift</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-display font-bold text-emerald-400">+${auditResult.estimatedMonthlyRevenueIncrease.toLocaleString()}</span>
                    <span className="text-xs text-emerald-200">/ mo</span>
                  </div>
                  <span className="text-[9px] text-emerald-300 font-medium block mt-2">
                    Pricing gap recovered ({auditResult.revenueOptimizationPotentialPercent}%)
                  </span>
                </div>

              </div>

              {/* Analytical Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Bottleneck Analysis & Package */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Operational Leakage Analysis
                    </h5>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {auditResult.bottleneckAnalysis}
                    </p>
                  </div>

                  {/* Dynamic Custom Action Steps */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Custom System Recommendations
                    </h5>
                    
                    <div className="space-y-3">
                      {auditResult.customActionSteps.map((step, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                          <div className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 font-mono">
                            {idx + 1}
                          </div>
                          <div>
                            <h6 className="text-sm font-bold text-slate-900">{step.title}</h6>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.description}</p>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase mt-2 inline-block">
                              Impact: {step.impact}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

                {/* Right Column: Dashboard Opportunity Blueprint & Recommended Package */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Recommended Package Panel */}
                  <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 shadow">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">RECOMMENDED OFFER</span>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-display font-black tracking-tight">
                        {auditResult.recommendedPackage} Package
                      </span>
                      <span className="px-2.5 py-0.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-full">
                        PROPOSED MATCH
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Based on your weekly manual workload of <strong>{formData.manualLaborHours} hours</strong> and <strong>${parseFloat(formData.monthlyRevenue).toLocaleString()}/mo</strong> revenue scale, we recommend our {auditResult.recommendedPackage} framework. This provides full end-to-end integration to completely delete your bottlenecks.
                    </p>
                  </div>

                  {/* Dashboard Blueprint Card */}
                  <div className="bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-600" />
                      <h6 className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Dashboard Blueprint</h6>
                    </div>
                    <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                      {auditResult.dashboardOpportunity}
                    </p>
                    <p className="text-[10px] text-emerald-700 italic">
                      *Fully responsive, cloud-connected visual interfaces mapped specifically to your operational data streams.
                    </p>
                  </div>

                  {/* Final Summary Card */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 italic">
                    "{auditResult.summary}"
                  </div>

                </div>

              </div>

              {/* Action row */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => setAuditResult(null)}
                  className="text-xs text-slate-500 hover:text-slate-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Run audit with different metrics
                </button>

                <button
                  onClick={handleApplyRecommended}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm shadow-md transition-all cursor-pointer"
                >
                  Apply Audit & Book Call
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
