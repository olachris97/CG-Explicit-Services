import express from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import {
  initSchema,
  getSubmissions,
  insertSubmission,
  updateSubmissionStatus,
  deleteSubmission,
  getBookings,
  insertBooking,
  updateBookingStatus,
  deleteBooking
} from "./db";

// Load environment variables
dotenv.config();

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

function signSession(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function createSession(secret: string) {
  const payload = `${Date.now() + 1000 * 60 * 60 * 8}`;
  return `${payload}.${signSession(payload, secret)}`;
}

function isValidSession(token: string | undefined, secret: string) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, signSession(expires, secret));
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const secret = process.env.ADMIN_SESSION_SECRET;

if (!secret) {
  return res.status(500).json({ error: "Server authentication is not configured" });
}
  if (!isValidSession(req.headers.cookie?.match(/(?:^|;\s*)admin_session=([^;]+)/)?.[1], secret)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  try {
    await initSchema();
    console.log("Connected to PostgreSQL and verified schema.");
  } catch (error) {
    console.error("FATAL: Could not connect to PostgreSQL / initialize schema:", error);
    process.exit(1);
  }

  const isProduction = process.env.NODE_ENV === "production";

  const ADMIN_EMAIL =
    process.env.ADMIN_EMAIL ||
    (isProduction ? "" : "admin@cgexplicitservices.com");

  const ADMIN_PASSWORD =
    process.env.ADMIN_PASSWORD ||
    (isProduction ? "" : "ChangeMe123!");

  const ADMIN_SESSION_SECRET =
    process.env.ADMIN_SESSION_SECRET ||
    (isProduction ? "" : "dev-only-change-this-secret");

  if (
    isProduction &&
    (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_SESSION_SECRET)
  ) {
    console.error(
      "FATAL: ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_SESSION_SECRET must be configured in production."
    );

    process.exit(1);
  }

  app.use(express.json());
  app.use((req, res, next) => {
  const origin = req.headers.origin;

  const configured = (process.env.FRONTEND_ORIGIN || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const allowedOrigins = [
    "https://cgexplicitservices.com",
    "https://www.cgexplicitservices.com",
    "http://localhost:5173",
    "http://localhost:3000",
    ...configured,
  ];

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,DELETE,OPTIONS"
    );
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "cg-explicit-api" });
  });

  // Initialize Gemini AI safely
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Gemini AI Client successfully initialized.");
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI client:", e);
    }
  } else {
    console.warn("GEMINI_API_KEY is missing or using placeholder. Running in fallback simulation mode.");
  }

  // API 1: Free AI Business Audit Route
  app.post("/api/audit", async (req, res) => {
    const {
      businessName,
      industry,
      monthlyRevenue,
      manualLaborHours,
      bottleneck,
      targetOutcome
    } = req.body;

    // Validate input
    if (!businessName || !industry || !monthlyRevenue || !manualLaborHours || !bottleneck) {
      return res.status(400).json({ error: "Missing required fields for audit" });
    }

    const revenueNum = parseFloat(monthlyRevenue) || 50000;
    const hoursNum = parseFloat(manualLaborHours) || 20;
    const assumedLaborRate = 35; // $35/hour average overhead cost of manual repetitive tasks
    
    // Fallback/Simulated Audit Generator in case Gemini is not available
    const generateFallbackAudit = () => {
      const estimatedTimeSavingsHours = Math.round(hoursNum * 0.75); // expect 75% efficiency gain
      const estimatedMonthlyLaborSavings = estimatedTimeSavingsHours * assumedLaborRate * 4.33; // monthly
      const estimatedAnnualLaborSavings = estimatedMonthlyLaborSavings * 12;
      
      const revenueOptimizationPotentialPercent = revenueNum < 20000 ? 15 : revenueNum < 100000 ? 12 : 8;
      const estimatedMonthlyRevenueIncrease = revenueNum * (revenueOptimizationPotentialPercent / 100);
      
      let recommendedPackage = "Starter";
      if (hoursNum > 30 || revenueNum > 120000) {
        recommendedPackage = "Premium";
      } else if (hoursNum > 15 || revenueNum > 40000) {
        recommendedPackage = "Growth";
      }

      return {
        estimatedTimeSavingsHours,
        estimatedMonthlyLaborSavings: Math.round(estimatedMonthlyLaborSavings),
        estimatedAnnualLaborSavings: Math.round(estimatedAnnualLaborSavings),
        revenueOptimizationPotentialPercent,
        estimatedMonthlyRevenueIncrease: Math.round(estimatedMonthlyRevenueIncrease),
        bottleneckAnalysis: `Based on your feedback, "${bottleneck}" represents a severe friction point in your operations. In ${industry}, manual overhead of ${hoursNum} hours per week on repetitive tasks drains your team's creative and focus capacity. Over a year, this results in significant hidden operational costs of roughly $${Math.round(estimatedAnnualLaborSavings).toLocaleString()} and severely slows down delivery, customer response, or transaction cycles.`,
        recommendedPackage,
        customActionSteps: [
          {
            title: "Standardize & Automate Core Tasks",
            description: `Implement integrated workflows to eliminate the manual bottleneck in ${bottleneck}. Use cloud-based automation hooks to connect your CRM, email, or database, reducing weekly manual work from ${hoursNum} hours down to under 5 hours.`,
            impact: "High Cost Reduction + Scalability"
          },
          {
            title: "Build a Centralized KPI Dashboard",
            description: "Replace manual checking with a unified, real-time visual dashboard showing order pipelines, customer lifecycle, and performance metrics instantly.",
            impact: "100% Visibility & Actionable Insights"
          },
          {
            title: "Dynamic Pricing & Revenue Optimization",
            description: `For your ${industry} business running at $${revenueNum.toLocaleString()}/mo, fine-tuning your margins and automating pricing checks can capture an extra $${Math.round(estimatedMonthlyRevenueIncrease).toLocaleString()} in pure profit each month by filling revenue leaks.`,
            impact: "Immediate Top-Line Boost"
          }
        ],
        dashboardOpportunity: `A real-time metrics console tracking inventory, bottleneck indicators, and pipeline efficiency for your ${industry} workflows.`,
        summary: `Optimizing your systems will recoup up to ${estimatedTimeSavingsHours} hours per week. By automating manual labor and sealing pricing leaks, your ${businessName} business is positioned to capture an extra $${Math.round(estimatedMonthlyRevenueIncrease * 12 + estimatedAnnualLaborSavings).toLocaleString()} in total annual business value.`
      };
    };

    if (ai) {
      try {
        console.log(`Querying Gemini (gemini-3.5-flash) for business audit: ${businessName} (${industry})`);
        
        const systemPrompt = `You are an elite Operations & Business Systems Consultant at 'CG Explicit Services'.
Your job is to analyze a business's current metrics and operational bottlenecks and provide a highly personalized, expert-level Business Automation and Operations Audit in JSON format.
Be practical, data-driven, and results-focused. Emphasize operational efficiency, workflow automation, real-time data visualization, and revenue optimization.
You must return a valid JSON object matching the requested schema. No conversational preamble before or after JSON.`;

        const userPrompt = `Please analyze this business:
- Business Name: ${businessName}
- Industry/Sector: ${industry}
- Monthly Revenue: $${revenueNum}
- Manual Repetitive Labor Hours/Week: ${hoursNum} hours
- Operational Bottleneck: "${bottleneck}"
- Main Target Outcome: "${targetOutcome || 'Streamline operations and increase profit'}"

Calculate realistic operational savings. Assume average team labor overhead of $${assumedLaborRate}/hour.
Return a structured JSON object with the following fields:
{
  "estimatedTimeSavingsHours": number (realistic weekly hours saved through automation, typically 60-80% of current manual hours),
  "estimatedMonthlyLaborSavings": number (monthly savings based on weekly hours saved * $${assumedLaborRate}/hour * 4.33 weeks),
  "estimatedAnnualLaborSavings": number (monthly labor savings * 12),
  "revenueOptimizationPotentialPercent": number (estimated top-line improvement percentage, e.g. 5 to 15% depending on bottleneck),
  "estimatedMonthlyRevenueIncrease": number (monthly revenue * (revenueOptimizationPotentialPercent / 100)),
  "bottleneckAnalysis": string (expert tactical breakdown of why "${bottleneck}" is costing them, specific to the ${industry} sector),
  "recommendedPackage": string (must be either "Starter", "Growth", or "Premium"),
  "customActionSteps": array of 3 objects with keys "title" (string), "description" (string), "impact" (string),
  "dashboardOpportunity": string (description of a specific KPI dashboard they need to build to track this and fix things),
  "summary": string (inspiring, summary sentence outlining their overall optimization opportunity)
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                estimatedTimeSavingsHours: { type: Type.INTEGER },
                estimatedMonthlyLaborSavings: { type: Type.INTEGER },
                estimatedAnnualLaborSavings: { type: Type.INTEGER },
                revenueOptimizationPotentialPercent: { type: Type.NUMBER },
                estimatedMonthlyRevenueIncrease: { type: Type.INTEGER },
                bottleneckAnalysis: { type: Type.STRING },
                recommendedPackage: { type: Type.STRING },
                customActionSteps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      impact: { type: Type.STRING }
                    },
                    required: ["title", "description", "impact"]
                  }
                },
                dashboardOpportunity: { type: Type.STRING },
                summary: { type: Type.STRING }
              },
              required: [
                "estimatedTimeSavingsHours",
                "estimatedMonthlyLaborSavings",
                "estimatedAnnualLaborSavings",
                "revenueOptimizationPotentialPercent",
                "estimatedMonthlyRevenueIncrease",
                "bottleneckAnalysis",
                "recommendedPackage",
                "customActionSteps",
                "dashboardOpportunity",
                "summary"
              ]
            }
          }
        });

        const text = response.text;
        if (text) {
          const result = JSON.parse(text.trim());
          return res.json(result);
        } else {
          throw new Error("Empty text received from Gemini");
        }
      } catch (error) {
        console.error("Gemini Audit API error, falling back to simulated engine:", error);
        return res.json(generateFallbackAudit());
      }
    } else {
      // Return simulated audit instantly
      return res.json(generateFallbackAudit());
    }
  });

  // API 2: Contact Form Submissions Route
  app.post("/api/contact", async (req, res) => {
    const { name, email, businessType, problem, selectedPackage } = req.body;

    if (!name || !email || !problem) {
      return res.status(400).json({ error: "Missing required contact fields" });
    }

    try {
      const newSubmission = await insertSubmission({
        name,
        email,
        businessType: businessType || "Not Specified",
        problem,
        selectedPackage: selectedPackage || "None Selected"
      });
      console.log("New contact submission received:", newSubmission);
      return res.status(201).json({ success: true, message: "Inquiry received successfully!", submission: newSubmission });
    } catch (error) {
      console.error("Failed to save contact submission:", error);
      return res.status(500).json({ error: "Failed to save your submission. Please try again." });
    }
  });

  // Admin authentication
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password || !safeEqual(String(email), ADMIN_EMAIL) || !safeEqual(String(password), ADMIN_PASSWORD)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = createSession(ADMIN_SESSION_SECRET);
    const crossSiteCookie = process.env.NODE_ENV === "production" ? "; SameSite=None; Secure" : "; SameSite=Lax";
    res.setHeader("Set-Cookie", `admin_session=${token}; HttpOnly${crossSiteCookie}; Path=/; Max-Age=28800`);
    return res.json({ success: true });
  });

  app.post("/api/admin/logout", (req, res) => {
    const crossSiteCookie = process.env.NODE_ENV === "production" ? "; SameSite=None; Secure" : "; SameSite=Lax";
    res.setHeader("Set-Cookie", `admin_session=; HttpOnly${crossSiteCookie}; Path=/; Max-Age=0`);
    res.json({ success: true });
  });

  app.get("/api/admin/session", requireAdmin, (_req, res) => {
    res.json({ authenticated: true, email: ADMIN_EMAIL });
  });

  // Admin data API
  app.get("/api/admin/data", requireAdmin, async (_req, res) => {
    try {
      const [submissions, bookings] = await Promise.all([getSubmissions(), getBookings()]);

      const recentActivity = [
        ...submissions.map((item) => ({ type: "inquiry", id: item.id, name: item.name, email: item.email, status: item.status, at: item.submittedAt })),
        ...bookings.map((item) => ({ type: "booking", id: item.id, name: item.name, email: item.email, status: item.status, at: item.createdAt }))
      ].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()).slice(0, 10);

      res.json({
        submissions,
        bookings,
        stats: {
          totalInquiries: submissions.length,
          newInquiries: submissions.filter((x) => x.status === "new").length,
          totalBookings: bookings.length,
          pendingBookings: bookings.filter((x) => x.status === "pending").length,
          confirmedBookings: bookings.filter((x) => x.status === "confirmed").length,
          completedBookings: bookings.filter((x) => x.status === "completed").length
        },
        recentActivity
      });
    } catch (error) {
      console.error("Failed to load admin data:", error);
      res.status(500).json({ error: "Failed to load admin data" });
    }
  });

  app.patch("/api/admin/inquiries/:id", requireAdmin, async (req, res) => {
    const allowed = ["new", "contacted", "qualified", "closed"];
    if (!req.body?.status || !allowed.includes(req.body.status)) {
      return res.status(400).json({ error: "Invalid or missing status" });
    }
    try {
      const item = await updateSubmissionStatus(req.params.id, req.body.status);
      if (!item) return res.status(404).json({ error: "Inquiry not found" });
      res.json({ success: true, item });
    } catch (error) {
      console.error("Failed to update inquiry:", error);
      res.status(500).json({ error: "Failed to update inquiry" });
    }
  });

  app.delete("/api/admin/inquiries/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await deleteSubmission(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Inquiry not found" });
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
      res.status(500).json({ error: "Failed to delete inquiry" });
    }
  });

  app.patch("/api/admin/bookings/:id", requireAdmin, async (req, res) => {
    const allowed = ["pending", "confirmed", "completed", "cancelled"];
    if (!req.body?.status || !allowed.includes(req.body.status)) {
      return res.status(400).json({ error: "Invalid or missing status" });
    }
    try {
      const item = await updateBookingStatus(req.params.id, req.body.status);
      if (!item) return res.status(404).json({ error: "Booking not found" });
      res.json({ success: true, item });
    } catch (error) {
      console.error("Failed to update booking:", error);
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  app.delete("/api/admin/bookings/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await deleteBooking(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Booking not found" });
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to delete booking:", error);
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });

  // API 4: Book Consultation Route
  app.post("/api/book", async (req, res) => {
    const { name, email, date, time, businessType, problem } = req.body;

    if (!name || !email || !date || !time) {
      return res.status(400).json({ error: "Missing required details for booking" });
    }

    try {
      const newBooking = await insertBooking({
        name,
        email,
        date,
        time,
        businessType: businessType || "Not Specified",
        problem: problem || "General consultation requested."
      });
      console.log("New consultation booked:", newBooking);
      return res.status(201).json({ success: true, message: "Consultation booked successfully!", booking: newBooking });
    } catch (error) {
      console.error("Failed to save booking:", error);
      return res.status(500).json({ error: "Failed to save your booking. Please try again." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
