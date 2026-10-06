import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronDown, Clock3, Download, ExternalLink, LayoutDashboard, LogOut, Mail, Menu, MessageSquareText, RefreshCw, Search, ShieldCheck, Trash2, Users, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";
import { AuditRecord, BusinessAuditResponse, ConsultationBooking, ContactInquiry } from "../types";

type InquiryStatus = "new" | "contacted" | "qualified" | "closed";
type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

type AdminData = {
  submissions: ContactInquiry[];
  audits: AuditRecord[];
  bookings: (ConsultationBooking & { status?: BookingStatus; createdAt?: string })[];
  stats: { totalInquiries: number; newInquiries: number; totalBookings: number; pendingBookings: number; confirmedBookings: number; completedBookings: number };
  recentActivity: { type: string; id: string; name: string; email: string; status: string; at: string }[];
};

const emptyData: AdminData = { submissions: [], audits: [], bookings: [], stats: { totalInquiries: 0, newInquiries: 0, totalBookings: 0, pendingBookings: 0, confirmedBookings: 0, completedBookings: 0 }, recentActivity: [] };

const inquiryStatuses: InquiryStatus[] = ["new", "contacted", "qualified", "closed"];
const bookingStatuses: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function StatusBadge({ status }: { status?: string }) {
  const styles: Record<string, string> = {
    new: "bg-accent-50 text-accent-700 border-accent-100",
    contacted: "bg-orange-accent-50 text-orange-accent-700 border-orange-accent-100",
    qualified: "bg-primary-50 text-primary-700 border-primary-100",
    closed: "bg-slate-100 text-slate-600 border-slate-200",
    pending: "bg-orange-accent-50 text-orange-accent-700 border-orange-accent-100",
    confirmed: "bg-accent-50 text-accent-700 border-accent-100",
    completed: "bg-primary-50 text-primary-700 border-primary-100",
    cancelled: "bg-secondary-50 text-secondary-700 border-secondary-100"
  };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles[status || ""] || "bg-slate-100 text-slate-600 border-slate-200"}`}>{status || "unknown"}</span>;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<AdminData>(emptyData);
  const [activeTab, setActiveTab] = useState<"overview" | "inquiries" | "bookings">("overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [selected, setSelected] = useState<{ type: "inquiry" | "booking"; id: string } | null>(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiFetch("/api/admin/data");
      if (response.status === 401) { navigate("/admin/login", { replace: true }); return; }
      if (!response.ok) throw new Error("Could not load dashboard data");
      setData(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load dashboard data");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const logout = async () => {
    await apiFetch("/api/admin/logout", { method: "POST" });
    navigate("/admin/login", { replace: true });
  };

  const updateStatus = async (type: "inquiry" | "booking", id: string, status: string) => {
    const endpoint = type === "inquiry" ? `/api/admin/inquiries/${id}` : `/api/admin/bookings/${id}`;
    const response = await apiFetch(endpoint, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (response.status === 401) return navigate("/admin/login", { replace: true });
    if (!response.ok) return setError("Unable to update status");
    await fetchData();
  };

  const removeItem = async (type: "inquiry" | "booking", id: string) => {
    if (!window.confirm("Delete this record permanently?")) return;
    const endpoint = type === "inquiry" ? `/api/admin/inquiries/${id}` : `/api/admin/bookings/${id}`;
    const response = await apiFetch(endpoint, { method: "DELETE" });
    if (!response.ok) return setError("Unable to delete record");
    setSelected(null);
    await fetchData();
  };

  const inquiries = useMemo(() => data.submissions.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || [item.name, item.email, item.businessType, item.problem, item.selectedPackage].some((v) => String(v || "").toLowerCase().includes(q));
    const matchesStatus = statusFilter === "all" || (item as ContactInquiry & { status?: string }).status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [data.submissions, search, statusFilter]);

  const bookings = useMemo(() => data.bookings.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || [item.name, item.email, item.businessType, item.problem, item.date].some((v) => String(v || "").toLowerCase().includes(q));
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [data.bookings, search, statusFilter]);

  const selectedRecord = selected ? (selected.type === "inquiry" ? data.submissions.find((x) => x.id === selected.id) : data.bookings.find((x) => x.id === selected.id)) : null;
  const selectedAudits = selectedRecord ? data.audits.filter((audit) => audit.email.toLowerCase() === selectedRecord.email.toLowerCase()) : [];

  const exportCsv = (type: "inquiries" | "bookings") => {
    const rows = type === "inquiries" ? data.submissions.map((x) => [x.name, x.email, x.businessType, x.selectedPackage, x.problem, (x as ContactInquiry & { status?: string }).status || "new", x.submittedAt || ""]) : data.bookings.map((x) => [x.name, x.email, x.businessType, x.date, x.time, x.problem, x.status || "pending"]);
    const header = type === "inquiries" ? ["Name", "Email", "Business Type", "Package", "Problem", "Status", "Submitted At"] : ["Name", "Email", "Business Type", "Date", "Time", "Problem", "Status"];
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `cg-explicit-${type}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const navItems = [{ id: "overview", label: "Overview", icon: LayoutDashboard }, { id: "inquiries", label: "Inquiries", icon: MessageSquareText }, { id: "bookings", label: "Bookings", icon: CalendarDays }] as const;

  return (
    <div className="min-h-screen bg-[#f7f7fa] text-primary-500 flex">
      <aside className={`${mobileNav ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary-950 text-white transition-transform duration-200 flex flex-col`}>
        <div className="h-20 px-5 flex items-center border-b border-white/10"><img src="/logo.png" alt="CG Explicit Services" className="h-9 w-auto" /></div>
        <div className="p-4 flex-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/40 mb-3">Workspace</p>
          <nav className="space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setActiveTab(id); setMobileNav(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${activeTab === id ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}><Icon className="w-4 h-4" />{label}</button>)}
          </nav>
          <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-4"><div className="flex items-center gap-2 text-xs font-bold"><ShieldCheck className="w-4 h-4 text-secondary-400" /> Secure admin</div><p className="text-[10px] text-white/45 mt-2 leading-relaxed">Protected by an HttpOnly session cookie. Records persist on the server.</p></div>
        </div>
        <div className="p-4 border-t border-white/10 space-y-1"><Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5"><ExternalLink className="w-4 h-4" /> View website</Link><button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5"><LogOut className="w-4 h-4" /> Sign out</button></div>
      </aside>

      {mobileNav && <button className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}

      <main className="min-w-0 flex-1">
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3"><button onClick={() => setMobileNav(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100"><Menu className="w-5 h-5" /></button><div><p className="text-[10px] uppercase tracking-[.2em] font-bold text-accent-600">CG Explicit Services</p><h1 className="font-black text-xl sm:text-2xl">Admin dashboard</h1></div></div>
          <div className="flex items-center gap-2"><button onClick={fetchData} disabled={loading} className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50" title="Refresh"><RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /></button><button onClick={logout} className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50"><LogOut className="w-3.5 h-3.5" /> Sign out</button></div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto">
          {error && <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-secondary-100 bg-secondary-50 px-4 py-3 text-sm text-secondary-700"><span>{error}</span><button onClick={() => setError("")}><X className="w-4 h-4" /></button></div>}

          {activeTab === "overview" && <>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
              {[{ label: "Total inquiries", value: data.stats.totalInquiries, sub: `${data.stats.newInquiries} new`, icon: MessageSquareText }, { label: "Consultations", value: data.stats.totalBookings, sub: `${data.stats.pendingBookings} pending`, icon: CalendarDays }, { label: "Confirmed", value: data.stats.confirmedBookings, sub: "Upcoming / active", icon: CheckCircle2 }, { label: "Completed", value: data.stats.completedBookings, sub: "Consultations done", icon: Users }].map(({ label, value, sub, icon: Icon }) => <div key={label} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5"><div className="flex justify-between items-start"><div><p className="text-xs font-semibold text-slate-500">{label}</p><p className="text-2xl sm:text-3xl font-black mt-2">{value}</p><p className="text-[10px] text-slate-400 mt-1">{sub}</p></div><div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center"><Icon className="w-5 h-5" /></div></div></div>)}
            </div>

            <div className="grid xl:grid-cols-[1.4fr_.9fr] gap-5 mt-5">
              <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden"><div className="p-5 border-b border-slate-100 flex items-center justify-between"><div><h2 className="font-black">Recent activity</h2><p className="text-xs text-slate-500 mt-1">Latest inquiries and consultation bookings</p></div><button onClick={() => setActiveTab("inquiries")} className="text-xs font-bold text-accent-600">View inquiries</button></div><div className="divide-y divide-slate-100">{data.recentActivity.length === 0 ? <div className="p-8 text-center text-sm text-slate-400">No activity yet.</div> : data.recentActivity.map((item) => <button key={`${item.type}-${item.id}`} onClick={() => { setActiveTab(item.type === "booking" ? "bookings" : "inquiries"); setSelected({ type: item.type as "inquiry" | "booking", id: item.id }); }} className="w-full text-left p-4 hover:bg-slate-50 flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center shrink-0">{item.type === "booking" ? <CalendarDays className="w-4 h-4" /> : <Mail className="w-4 h-4" />}</div><div className="min-w-0 flex-1"><p className="text-sm font-bold truncate">{item.name}</p><p className="text-[11px] text-slate-500 truncate">{item.type === "booking" ? "Consultation booking" : "New inquiry"} · {item.email}</p></div><div className="text-right shrink-0"><StatusBadge status={item.status} /><p className="text-[10px] text-slate-400 mt-1">{formatDate(item.at)}</p></div></button>)}</div></section>
              <section className="bg-primary-950 text-white rounded-2xl p-6"><div className="flex items-center gap-2 text-secondary-400 text-xs font-bold uppercase tracking-wider"><Clock3 className="w-4 h-4" /> Pipeline snapshot</div><h2 className="text-2xl font-black mt-4">Keep every lead moving.</h2><p className="text-sm text-white/60 mt-2 leading-relaxed">Use statuses to track where each prospect is in your sales process, then export records whenever you need a spreadsheet.</p><div className="mt-6 space-y-3">{[["New inquiries", data.stats.newInquiries], ["Pending bookings", data.stats.pendingBookings], ["Confirmed bookings", data.stats.confirmedBookings]].map(([label, value]) => <div key={label as string} className="flex items-center justify-between py-2 border-b border-white/10"><span className="text-xs text-white/60">{label}</span><span className="font-black">{value}</span></div>)}</div></section>
            </div>
          </>}

          {(activeTab === "inquiries" || activeTab === "bookings") && <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between"><div><h2 className="font-black text-lg">{activeTab === "inquiries" ? "Contact inquiries" : "Consultation bookings"}</h2><p className="text-xs text-slate-500 mt-1">{activeTab === "inquiries" ? `${inquiries.length} matching records` : `${bookings.length} matching records`}</p></div><div className="flex flex-col sm:flex-row gap-2"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search records..." className="w-full sm:w-64 rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 text-xs outline-none focus:border-accent-500" /></div><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold bg-white"> <option value="all">All statuses</option>{(activeTab === "inquiries" ? inquiryStatuses : bookingStatuses).map((status) => <option key={status} value={status}>{status}</option>)}</select><button onClick={() => exportCsv(activeTab)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 text-white px-3.5 py-2.5 text-xs font-bold hover:bg-primary-600"><Download className="w-3.5 h-3.5" /> Export CSV</button></div></div>
            <div className="overflow-x-auto">
              {activeTab === "inquiries" ? <table className="w-full min-w-[850px] text-left"><thead className="bg-slate-50 border-b border-slate-100"><tr className="text-[10px] uppercase tracking-wider text-slate-500"><th className="px-5 py-3">Lead</th><th className="px-5 py-3">Business</th><th className="px-5 py-3">Package</th><th className="px-5 py-3">Received</th><th className="px-5 py-3">Status</th><th className="px-5 py-3"></th></tr></thead><tbody className="divide-y divide-slate-100">{inquiries.map((item) => { const status = (item as ContactInquiry & { status?: InquiryStatus }).status || "new"; return <tr key={item.id} className="hover:bg-slate-50"><td className="px-5 py-4"><button onClick={() => setSelected({ type: "inquiry", id: item.id! })} className="text-left"><p className="font-bold text-sm">{item.name}</p><p className="text-[11px] text-slate-500">{item.email}</p></button></td><td className="px-5 py-4 text-xs">{item.businessType}</td><td className="px-5 py-4 text-xs font-semibold">{item.selectedPackage}</td><td className="px-5 py-4 text-xs text-slate-500">{formatDate(item.submittedAt)}</td><td className="px-5 py-4"><select value={status} onChange={(e) => updateStatus("inquiry", item.id!, e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] font-bold"><option value="new">new</option><option value="contacted">contacted</option><option value="qualified">qualified</option><option value="closed">closed</option></select></td><td className="px-5 py-4 text-right"><button onClick={() => removeItem("inquiry", item.id!)} className="p-2 text-slate-400 hover:text-secondary-600"><Trash2 className="w-4 h-4" /></button></td></tr>})}</tbody></table> : <table className="w-full min-w-[900px] text-left"><thead className="bg-slate-50 border-b border-slate-100"><tr className="text-[10px] uppercase tracking-wider text-slate-500"><th className="px-5 py-3">Client</th><th className="px-5 py-3">Date / time</th><th className="px-5 py-3">Business</th><th className="px-5 py-3">Status</th><th className="px-5 py-3"></th></tr></thead><tbody className="divide-y divide-slate-100">{bookings.map((item) => <tr key={item.id} className="hover:bg-slate-50"><td className="px-5 py-4"><button onClick={() => setSelected({ type: "booking", id: item.id! })} className="text-left"><p className="font-bold text-sm">{item.name}</p><p className="text-[11px] text-slate-500">{item.email}</p></button></td><td className="px-5 py-4 text-xs"><span className="font-semibold">{item.date}</span><span className="text-slate-500"> · {item.time}</span></td><td className="px-5 py-4 text-xs">{item.businessType}</td><td className="px-5 py-4"><select value={item.status || "pending"} onChange={(e) => updateStatus("booking", item.id!, e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] font-bold"><option value="pending">pending</option><option value="confirmed">confirmed</option><option value="completed">completed</option><option value="cancelled">cancelled</option></select></td><td className="px-5 py-4 text-right"><button onClick={() => removeItem("booking", item.id!)} className="p-2 text-slate-400 hover:text-secondary-600"><Trash2 className="w-4 h-4" /></button></td></tr>)}</tbody></table>}
              {((activeTab === "inquiries" && inquiries.length === 0) || (activeTab === "bookings" && bookings.length === 0)) && <div className="p-12 text-center"><p className="font-bold">No records found</p><p className="text-xs text-slate-400 mt-1">Try changing your search or filter.</p></div>}
            </div>
          </section>}
        </div>
      </main>

      {selected && selectedRecord && <div className="fixed inset-0 z-[70] bg-primary-950/50 backdrop-blur-sm flex items-center justify-center p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}><div className="bg-white rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl"><div className="p-5 border-b border-slate-100 flex justify-between items-start"><div><p className="text-[10px] uppercase tracking-widest font-bold text-accent-600">{selected.type === "inquiry" ? "Contact inquiry" : "Consultation booking"}</p><h3 className="text-xl font-black mt-1">{selectedRecord.name}</h3></div><button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-4 h-4" /></button></div><div className="p-5 space-y-5"> <div className="grid sm:grid-cols-2 gap-4"><div><p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Email</p><a href={`mailto:${selectedRecord.email}`} className="text-sm font-semibold hover:text-accent-600">{selectedRecord.email}</a></div><div><p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Business</p><p className="text-sm font-semibold">{selectedRecord.businessType}</p></div>{selected.type === "inquiry" ? <><div><p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Package</p><p className="text-sm font-semibold">{(selectedRecord as ContactInquiry).selectedPackage}</p></div><div><p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Received</p><p className="text-sm font-semibold">{formatDate((selectedRecord as ContactInquiry).submittedAt)}</p></div></> : <><div><p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Appointment</p><p className="text-sm font-semibold">{(selectedRecord as ConsultationBooking).date} · {(selectedRecord as ConsultationBooking).time}</p></div><div><p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Status</p><StatusBadge status={(selectedRecord as ConsultationBooking & { status?: string }).status} /></div></>}</div><div className="rounded-xl bg-slate-50 border border-slate-100 p-4"><p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Message / problem</p><p className="text-sm text-slate-600 leading-relaxed">{selectedRecord.problem}</p></div>
        {selectedAudits.length > 0 && <div className="rounded-2xl border border-secondary-100 bg-secondary-50/40 p-4 space-y-4">
          <div className="flex items-center justify-between gap-3"><div><p className="text-[10px] uppercase tracking-wider text-secondary-700 font-bold">AI audit history</p><p className="text-sm font-black text-slate-900">Recommendations to work from</p></div><span className="text-[10px] font-bold text-secondary-700 bg-white border border-secondary-100 px-2 py-1 rounded-full">{selectedAudits.length} audit{selectedAudits.length === 1 ? "" : "s"}</span></div>
          {selectedAudits.map((audit) => { const rec = audit.recommendation as BusinessAuditResponse; return <div key={audit.id} className="bg-white border border-secondary-100 rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{formatDate(audit.createdAt)}</p><p className="text-sm font-bold text-slate-900">{audit.businessName} · {rec.recommendedPackage} Package</p></div><span className="text-[10px] font-semibold text-secondary-700">{audit.industry}</span></div>
            <p className="text-xs text-slate-600 leading-relaxed"><strong>Summary:</strong> {rec.summary}</p>
            <p className="text-xs text-slate-600 leading-relaxed"><strong>Bottleneck analysis:</strong> {rec.bottleneckAnalysis}</p>
            <div><p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Recommended actions</p><div className="space-y-2">{rec.customActionSteps?.map((step, index) => <div key={index} className="text-xs text-slate-600"><span className="font-bold text-slate-900">{index + 1}. {step.title}</span><span className="block mt-0.5 leading-relaxed">{step.description}</span><span className="inline-block mt-1 text-[10px] font-bold text-secondary-700">Impact: {step.impact}</span></div>)}</div></div>
            <div className="rounded-lg bg-slate-50 border border-slate-100 p-3"><p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Dashboard blueprint</p><p className="text-xs text-slate-600 mt-1 leading-relaxed">{rec.dashboardOpportunity}</p></div>
          </div> })}
        </div>}
        <div className="flex flex-wrap gap-2"><a href={`mailto:${selectedRecord.email}`} className="inline-flex items-center gap-2 rounded-xl bg-primary-500 text-white px-4 py-2.5 text-xs font-bold"><Mail className="w-3.5 h-3.5" /> Email client</a><button onClick={() => removeItem(selected.type, selectedRecord.id!)} className="inline-flex items-center gap-2 rounded-xl border border-secondary-100 text-secondary-700 px-4 py-2.5 text-xs font-bold"><Trash2 className="w-3.5 h-3.5" /> Delete</button></div></div></div></div>}
    </div>
  );
}
