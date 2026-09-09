import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, FileText, Handshake } from "lucide-react";

type LegalType = "terms" | "privacy" | "sla";

const content = {
  terms: {
    eyebrow: "Legal",
    title: "Terms of Service",
    intro: "These terms explain the basic rules that apply when you use CG Explicit Services, request a consultation, or engage us for technology and business optimization services.",
    icon: FileText,
    sections: [
      ["1. Services", "CG Explicit Services provides workflow automation, dashboards, data analysis, revenue optimization, pricing systems, and related consulting services. The exact scope, deliverables, timeline, and fees for a project are confirmed in the applicable proposal or service agreement."],
      ["2. Client Responsibilities", "Clients are responsible for providing accurate information, timely access to required systems, and the approvals needed to complete a project. Delays caused by missing information or third-party systems may affect delivery timelines."],
      ["3. Fees and Payment", "Fees are based on the agreed proposal or package. Unless otherwise stated in writing, work begins after the required payment or deposit has been received. Third-party software, hosting, API, or subscription charges are the client's responsibility unless expressly included."],
      ["4. Intellectual Property", "Unless otherwise agreed in writing, client-specific deliverables are provided for the client's business use after payment. CG Explicit Services retains ownership of its reusable frameworks, know-how, templates, libraries, and pre-existing intellectual property."],
      ["5. Confidentiality", "Both parties should protect confidential business, technical, financial, and operational information shared during an engagement and use it only for the purposes of the engagement."],
      ["6. Results and Limitations", "We aim to improve efficiency, visibility, and commercial performance, but no specific revenue, savings, or profitability outcome is guaranteed. Results depend on the client's data, market conditions, implementation, and other factors outside our control."],
      ["7. Changes and Termination", "Project changes may require an updated scope, timeline, or fee. Either party may request termination subject to the applicable service agreement and payment for work already completed."],
      ["8. Contact", "Questions about these terms can be directed to sales@cgexplicitservices.com."]
    ]
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "This policy explains what information CG Explicit Services may collect through this website and how that information is used to respond to enquiries, consultations, and service requests.",
    icon: ShieldCheck,
    sections: [
      ["1. Information We Collect", "We may collect information you submit through contact, audit, consultation, and booking forms, such as your name, email address, business information, phone number, preferred meeting details, and the information you choose to include in your enquiry."],
      ["2. How We Use Information", "We use submitted information to respond to enquiries, schedule and manage consultations, prepare recommendations, communicate about requested services, improve our website and service delivery, and maintain appropriate business records."],
      ["3. Information Sharing", "We do not sell submitted personal information. Information may be shared with service providers or technology platforms when reasonably necessary to deliver a requested service, operate the website, process communications, or maintain business systems."],
      ["4. Data Security", "We use reasonable technical and organizational measures to protect information. No internet transmission or storage system can be guaranteed to be completely secure."],
      ["5. Retention", "We retain information for as long as reasonably necessary for the purpose for which it was collected, to provide services, maintain business records, resolve issues, or comply with applicable obligations."],
      ["6. Your Choices", "You may contact us to ask about the personal information we hold about you or to request correction of inaccurate information, subject to applicable legal and operational requirements."],
      ["7. Contact", "Privacy questions can be sent to sales@cgexplicitservices.com."]
    ]
  },
  sla: {
    eyebrow: "Service Standards",
    title: "Service Level Agreement",
    intro: "Our service standards are designed to make project communication, response times, delivery expectations, and ongoing support clear. A signed client-specific agreement takes precedence where it contains different terms.",
    icon: Handshake,
    sections: [
      ["1. Communication", "We aim to acknowledge client messages within one business day during normal operating hours. Urgent issues should be clearly marked and may require a different response path agreed during the engagement."],
      ["2. Project Delivery", "Delivery dates are based on the agreed scope, dependencies, access, approvals, and availability of third-party systems. Material changes to scope may require a revised delivery date."],
      ["3. Support", "Post-launch support covers the agreed implementation and reasonable troubleshooting within the project scope. Ongoing monitoring, optimization, maintenance, or additional development may be provided under a separate support arrangement."],
      ["4. Incident Priorities", "Critical production issues affecting a core delivered system receive the highest priority. Non-critical bugs, questions, enhancements, and feature requests are handled according to their impact and the agreed support plan."],
      ["5. Client Dependencies", "Clients should provide accurate credentials, approvals, source data, access, and feedback promptly. Delays in these dependencies can pause or extend the service timeline."],
      ["6. Third-Party Services", "Availability and performance of external platforms, APIs, hosting providers, payment processors, communication tools, and other third-party services are outside our direct control."],
      ["7. Service Review", "For ongoing engagements, we can review performance, outstanding issues, priorities, and optimization opportunities at agreed intervals."],
      ["8. Contact", "Service-level questions can be sent to sales@cgexplicitservices.com."]
    ]
  }
} as const;

export default function LegalPage({ type }: { type: LegalType }) {
  const page = content[type];
  const Icon = page.icon;

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-secondary-600 transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-50 border border-secondary-100 text-secondary-600 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-secondary-600 tracking-widest uppercase mb-3">{page.eyebrow}</p>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-primary-900 tracking-tight">{page.title}</h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">{page.intro}</p>
              <p className="mt-4 text-xs text-slate-400">Last updated: August 10, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {page.sections.map(([heading, body]) => (
              <article key={heading} className="border-b border-slate-100 pb-8 last:border-0">
                <h2 className="text-xl font-display font-bold text-primary-900 mb-3">{heading}</h2>
                <p className="text-sm sm:text-base text-slate-600 leading-7">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
