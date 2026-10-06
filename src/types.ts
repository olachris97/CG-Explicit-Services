export interface BusinessAuditRequest {
  businessName: string;
  email: string;
  industry: string;
  monthlyRevenue: string;
  manualLaborHours: string;
  bottleneck: string;
  targetOutcome: string;
}

export interface CustomActionStep {
  title: string;
  description: string;
  impact: string;
}

export interface BusinessAuditResponse {
  auditReportId?: string;
  estimatedTimeSavingsHours: number;
  estimatedMonthlyLaborSavings: number;
  estimatedAnnualLaborSavings: number;
  revenueOptimizationPotentialPercent: number;
  estimatedMonthlyRevenueIncrease: number;
  bottleneckAnalysis: string;
  recommendedPackage: "Starter" | "Growth" | "Premium" | string;
  customActionSteps: CustomActionStep[];
  dashboardOpportunity: string;
  summary: string;
}

export interface AuditRecord {
  id: string;
  businessName: string;
  email: string;
  industry: string;
  monthlyRevenue: string;
  manualLaborHours: string;
  bottleneck: string;
  targetOutcome: string;
  recommendation: BusinessAuditResponse;
  createdAt: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  businessType: string;
  problem: string;
  selectedPackage: string;
  auditReportId?: string;
  auditRecommendation?: BusinessAuditResponse | null;
  submittedAt?: string;
  status?: "new" | "contacted" | "qualified" | "closed";
}

export interface ConsultationBooking {
  id?: string;
  name: string;
  email: string;
  date: string;
  time: string;
  businessType: string;
  problem: string;
  auditReportId?: string;
  auditRecommendation?: BusinessAuditResponse | null;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: string;
}
