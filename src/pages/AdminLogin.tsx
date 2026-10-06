import React, { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await apiFetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to sign in");
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-950 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(113,56,232,.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,47,104,.16),transparent_35%)]" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <img src="/logo.png" alt="CG Explicit Services" className="h-12 w-auto" />
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl border border-white/10 p-7 sm:p-9">
          <div className="w-12 h-12 rounded-2xl bg-accent-50 text-accent-600 flex items-center justify-center mb-5">
            <LockKeyhole className="w-6 h-6" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-accent-600">Restricted area</p>
          <h1 className="text-3xl font-black text-primary-500 mt-2">Admin sign in</h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">Manage consultations, inquiries and website leads from one secure workspace.</p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block">
              <span className="text-xs font-bold text-primary-500">Admin email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="username" required className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-100" placeholder="admin@cgexplicitservices.com" />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-primary-500">Password</span>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" required className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-100" placeholder="••••••••" />
            </label>

            {error && <div className="rounded-xl bg-secondary-50 border border-secondary-100 px-4 py-3 text-sm text-secondary-700">{error}</div>}

            <button disabled={loading} className="w-full rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-bold py-3.5 flex items-center justify-center gap-2 transition-colors">
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-100 p-3.5">
            <ShieldCheck className="w-4 h-4 text-accent-600 mt-0.5 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-relaxed">Admin sessions are stored in an HttpOnly cookie and expire automatically after 8 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
