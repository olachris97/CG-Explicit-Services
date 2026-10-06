import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuditTool from "./components/AuditTool";
import { ContactInquiry } from "./types";
import { Mail, Phone, MapPin } from "lucide-react";

// Maps the old "scroll to section id" names to real page routes.
const SECTION_ROUTES: Record<string, string> = {
  hero: "/",
  home: "/",
  services: "/services",
  process: "/how-it-works",
  about: "/about",
  pricing: "/pricing",
  contact: "/contact"
};

export interface LayoutOutletContext {
  onOpenAudit: () => void;
  onNavigateSection: (sectionId: string) => void;
  preFilledInquiry: ContactInquiry | null;
  onPreFillClear: () => void;
  selectedPackage: string;
  onSelectPackage: (packageName: string) => void;
}

export default function Layout() {
  const [isAuditOpen, setIsAuditOpen] = useState<boolean>(false);
  const [preFilledInquiry, setPreFilledInquiry] = useState<ContactInquiry | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>("Growth");

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top whenever the route changes so navigating to a new page
  // always starts the reader at the top of that page's content.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  // Replaces the old in-page "scroll to element" behavior: now it
  // navigates to the dedicated page for that section instead.
  const onNavigateSection = (sectionId: string) => {
    const path = SECTION_ROUTES[sectionId] || "/";
    navigate(path);
  };

  const handlePreFillBooking = (info: {
    name: string;
    email: string;
    businessType: string;
    problem: string;
    selectedPackage: string;
    auditReportId?: string;
    auditRecommendation?: ContactInquiry["auditRecommendation"];
  }) => {
    setPreFilledInquiry(info);
    setSelectedPackage(info.selectedPackage);
  };

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackage(packageName);
    setPreFilledInquiry((prev) => ({
      name: prev?.name || "",
      email: prev?.email || "",
      businessType: prev?.businessType || "E-Commerce",
      problem: prev?.problem || "",
      selectedPackage: packageName,
      auditReportId: prev?.auditReportId,
      auditRecommendation: prev?.auditRecommendation
    }));
  };

  const context: LayoutOutletContext = {
    onOpenAudit: () => setIsAuditOpen(true),
    onNavigateSection,
    preFilledInquiry,
    onPreFillClear: () => setPreFilledInquiry(null),
    selectedPackage,
    onSelectPackage: handleSelectPackage,
    };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <Navbar onScrollTo={onNavigateSection} onOpenAudit={() => setIsAuditOpen(true)} />

      {/* Routed page content */}
      <main className="flex-grow">
        <Outlet context={context} />
      </main>

      {/* Footer */}
      <footer className="bg-primary-950 text-slate-400 border-t border-primary-900 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-slate-900">

            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <Link to="/" className="flex items-center cursor-pointer w-fit">
                <img src="/logo.png" alt="CG Explicit Services" className="h-10 w-auto" />
              </Link>
              <p className="text-xs text-slate-400 font-normal leading-relaxed max-w-sm">
                We design and engineer bespoke workflow automations, real-time metrics dashboards, and custom pricing arbitrage algorithms to plug margin leaks, scale transactions, and maximize net profits.
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-200 tracking-wider uppercase block">SOLUTIONS</span>
                <ul className="space-y-1.5 text-xs">
                  <li><Link to="/services" className="hover:text-blue-400 transition-colors">Workflow Automation</Link></li>
                  <li><Link to="/services" className="hover:text-blue-400 transition-colors">KPI Visual Dashboards</Link></li>
                  <li><Link to="/services" className="hover:text-blue-400 transition-colors">Revenue Optimization</Link></li>
                  <li><Link to="/about" className="hover:text-blue-400 transition-colors">Pricing Arbitrage</Link></li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-200 tracking-wider uppercase block">COMPANY</span>
                <ul className="space-y-1.5 text-xs">
                  <li><Link to="/about" className="hover:text-blue-400 transition-colors">Why Choose Us</Link></li>
                  <li><Link to="/how-it-works" className="hover:text-blue-400 transition-colors">How We Work</Link></li>
                  <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Service Packages</Link></li>
                  <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Consultations</Link></li>
                </ul>
              </div>
            </div>

            {/* Direct Contact Info */}
            <div className="md:col-span-3 space-y-3.5">
              <span className="text-[10px] font-bold text-slate-200 tracking-wider uppercase block">DIRECT OFFICE</span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>sales@cgexplicitservices.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>+1 303-720-6109</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="leading-5">36 South 18th Avenue, Suite D<br />Brighton CO 80601<br />US</span>
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] text-slate-500 gap-4">
            <p>© 2026 CG Explicit Services. All Rights Reserved. Engineered with mathematical pricing rigor.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Link to="/terms" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
              <Link to="/sla" className="hover:text-slate-200 transition-colors">SLA Agreement</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Free Audit AI Tool Dialog (available globally, on every page) */}
      <AuditTool
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        onPreFillBooking={(info) => {
          handlePreFillBooking(info);
        }}
        onScrollTo={onNavigateSection}
      />
    </div>
  );
}
