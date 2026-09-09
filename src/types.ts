export interface BusinessAuditRequest {
  businessName: string;
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

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  businessType: string;
  problem: string;
  selectedPackage: string;
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
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: string;
}
