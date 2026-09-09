import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onScrollTo: (elementId: string) => void;
  onOpenAudit: () => void;
}

const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How We Work" },
  { to: "/about", label: "About Us" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" }
];

export default function Navbar({ onOpenAudit }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block w-full text-base font-semibold py-3 border-b border-slate-100 transition-colors ${
      isActive ? "text-emerald-600" : "text-slate-800 hover:text-emerald-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center cursor-pointer" onClick={() => setIsMenuOpen(false)}>
            <img src="/logo.png" alt="CG Explicit Services" className="h-9 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAudit}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-emerald-200 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              Free Business Audit
            </button>
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              Book Consultation
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex sm:hidden items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-t border-slate-100 bg-white ${
          isMenuOpen ? "max-h-[28rem]" : "max-h-0 border-t-0"
        }`}
      >
        <div className="px-4 pb-6">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={mobileNavLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <div className="flex flex-col gap-3 pt-5">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenAudit();
              }}
              className="inline-flex items-center justify-center px-4 py-3 border border-emerald-200 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              Free Business Audit
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
