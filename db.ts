import { Pool, type PoolConfig } from "pg";
import crypto from "crypto";

export type AuditReport = {
  id: string;
  businessName: string;
  email: string;
  industry: string;
  monthlyRevenue: string;
  manualLaborHours: string;
  bottleneck: string;
  targetOutcome: string;
  recommendation: Record<string, unknown>;
  createdAt: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  businessType: string;
  problem: string;
  selectedPackage: string;
  auditReportId?: string;
  auditRecommendation?: Record<string, unknown> | null;
  submittedAt: string;
  status: "new" | "contacted" | "qualified" | "closed";
};

export type Booking = {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  businessType: string;
  problem: string;
  auditReportId?: string;
  auditRecommendation?: Record<string, unknown> | null;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
};

// -----------------------------------------------------------------------------
// PostgreSQL connection pool
// -----------------------------------------------------------------------------

// The pool is created lazily because server.ts loads dotenv.config()
// before initSchema() is called.

let _pool: Pool | null = null;

function getPool(): Pool {
  if (_pool) return _pool;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add a PostgreSQL connection string to your .env " +
        "(see .env.example) or configure DATABASE_URL on Render."
    );
  }

  const isLocalDb = /localhost|127\.0\.0\.1/.test(connectionString);

  const poolConfig: PoolConfig = {
    connectionString,

    // Local PostgreSQL normally doesn't use TLS.
    // Managed PostgreSQL services such as Render require TLS.
    ssl: isLocalDb
      ? false
      : {
          rejectUnauthorized: false,
        },

    // Production-safe pool configuration.
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  };

  _pool = new Pool(poolConfig);

  _pool.on("error", (err) => {
    console.error("Unexpected PostgreSQL pool error:", err);
  });

  return _pool;
}

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
}

// -----------------------------------------------------------------------------
// Database initialization
// -----------------------------------------------------------------------------

export async function initSchema() {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      business_type TEXT NOT NULL,
      problem TEXT NOT NULL,
      selected_package TEXT NOT NULL,
      submitted_at TIMESTAMPTZ NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS audit_reports (
      id TEXT PRIMARY KEY,
      business_name TEXT NOT NULL,
      email TEXT NOT NULL,
      industry TEXT NOT NULL,
      monthly_revenue TEXT NOT NULL,
      manual_labor_hours TEXT NOT NULL,
      bottleneck TEXT NOT NULL,
      target_outcome TEXT NOT NULL DEFAULT '',
      recommendation JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      business_type TEXT NOT NULL,
      problem TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL
    );
  `);

  // ---------------------------------------------------------------------------
  // Backward-compatible migrations
  // ---------------------------------------------------------------------------

  await pool.query(`
    ALTER TABLE submissions
    ADD COLUMN IF NOT EXISTS audit_report_id TEXT;
  `);

  await pool.query(`
    ALTER TABLE submissions
    ADD COLUMN IF NOT EXISTS audit_recommendation JSONB;
  `);

  await pool.query(`
    ALTER TABLE bookings
    ADD COLUMN IF NOT EXISTS audit_report_id TEXT;
  `);

  await pool.query(`
    ALTER TABLE bookings
    ADD COLUMN IF NOT EXISTS audit_recommendation JSONB;
  `);

  // ---------------------------------------------------------------------------
  // Indexes
  // ---------------------------------------------------------------------------

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_audit_reports_email
    ON audit_reports (LOWER(email));
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_bookings_email
    ON bookings (LOWER(email));
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_submissions_email
    ON submissions (LOWER(email));
  `);

  console.log("Database schema verified successfully.");
}

// -----------------------------------------------------------------------------
// Row → API mapping
// -----------------------------------------------------------------------------

function mapAuditRow(row: any): AuditReport {
  return {
    id: row.id,
    businessName: row.business_name,
    email: row.email,
    industry: row.industry,
    monthlyRevenue: row.monthly_revenue,
    manualLaborHours: row.manual_labor_hours,
    bottleneck: row.bottleneck,
    targetOutcome: row.target_outcome,
    recommendation: row.recommendation || {},
    createdAt: new Date(row.created_at).toISOString(),
  };
}

function mapSubmissionRow(row: any): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    businessType: row.business_type,
    problem: row.problem,
    selectedPackage: row.selected_package,
    auditReportId: row.audit_report_id || undefined,
    auditRecommendation: row.audit_recommendation || null,
    submittedAt: new Date(row.submitted_at).toISOString(),
    status: row.status,
  };
}

function mapBookingRow(row: any): Booking {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    date: row.date,
    time: row.time,
    businessType: row.business_type,
    problem: row.problem,
    auditReportId: row.audit_report_id || undefined,
    auditRecommendation: row.audit_recommendation || null,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

// -----------------------------------------------------------------------------
// Submissions
// -----------------------------------------------------------------------------

export async function getSubmissions(): Promise<ContactSubmission[]> {
  const { rows } = await getPool().query(
    "SELECT * FROM submissions ORDER BY submitted_at DESC"
  );

  return rows.map(mapSubmissionRow);
}

export async function insertSubmission(input: {
  name: string;
  email: string;
  businessType: string;
  problem: string;
  selectedPackage: string;
  auditReportId?: string;
  auditRecommendation?: Record<string, unknown> | null;
}): Promise<ContactSubmission> {
  const id = createId("s");
  const submittedAt = new Date().toISOString();

  const audit = input.auditReportId
    ? null
    : await getLatestAuditByEmail(input.email);

  const auditReportId = input.auditReportId || audit?.id || null;

  const auditRecommendation =
    input.auditRecommendation || audit?.recommendation || null;

  const { rows } = await getPool().query(
    `INSERT INTO submissions (
      id,
      name,
      email,
      business_type,
      problem,
      selected_package,
      audit_report_id,
      audit_recommendation,
      submitted_at,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'new')
    RETURNING *`,
    [
      id,
      input.name,
      input.email,
      input.businessType,
      input.problem,
      input.selectedPackage,
      auditReportId,
      auditRecommendation
        ? JSON.stringify(auditRecommendation)
        : null,
      submittedAt,
    ]
  );

  return mapSubmissionRow(rows[0]);
}

export async function updateSubmissionStatus(
  id: string,
  status: ContactSubmission["status"]
): Promise<ContactSubmission | null> {
  const { rows } = await getPool().query(
    "UPDATE submissions SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );

  return rows[0] ? mapSubmissionRow(rows[0]) : null;
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const result = await getPool().query(
    "DELETE FROM submissions WHERE id = $1",
    [id]
  );

  return (result.rowCount ?? 0) > 0;
}

// -----------------------------------------------------------------------------
// Bookings
// -----------------------------------------------------------------------------

export async function getBookings(): Promise<Booking[]> {
  const { rows } = await getPool().query(
    "SELECT * FROM bookings ORDER BY created_at DESC"
  );

  return rows.map(mapBookingRow);
}

export async function insertBooking(input: {
  name: string;
  email: string;
  date: string;
  time: string;
  businessType: string;
  problem: string;
  auditReportId?: string;
  auditRecommendation?: Record<string, unknown> | null;
}): Promise<Booking> {
  const id = createId("b");
  const createdAt = new Date().toISOString();

  const audit = input.auditReportId
    ? null
    : await getLatestAuditByEmail(input.email);

  const auditReportId = input.auditReportId || audit?.id || null;

  const auditRecommendation =
    input.auditRecommendation || audit?.recommendation || null;

  const { rows } = await getPool().query(
    `INSERT INTO bookings (
      id,
      name,
      email,
      date,
      time,
      business_type,
      problem,
      audit_report_id,
      audit_recommendation,
      status,
      created_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', $10)
    RETURNING *`,
    [
      id,
      input.name,
      input.email,
      input.date,
      input.time,
      input.businessType,
      input.problem,
      auditReportId,
      auditRecommendation
        ? JSON.stringify(auditRecommendation)
        : null,
      createdAt,
    ]
  );

  return mapBookingRow(rows[0]);
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | null> {
  const { rows } = await getPool().query(
    "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );

  return rows[0] ? mapBookingRow(rows[0]) : null;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const result = await getPool().query(
    "DELETE FROM bookings WHERE id = $1",
    [id]
  );

  return (result.rowCount ?? 0) > 0;
}

// -----------------------------------------------------------------------------
// AI Audit Reports
// -----------------------------------------------------------------------------

export async function getAuditReports(): Promise<AuditReport[]> {
  const { rows } = await getPool().query(
    "SELECT * FROM audit_reports ORDER BY created_at DESC"
  );

  return rows.map(mapAuditRow);
}

export async function getLatestAuditByEmail(
  email: string
): Promise<AuditReport | null> {
  const { rows } = await getPool().query(
    `SELECT *
     FROM audit_reports
     WHERE LOWER(email) = LOWER($1)
     ORDER BY created_at DESC
     LIMIT 1`,
    [email]
  );

  return rows[0] ? mapAuditRow(rows[0]) : null;
}

export async function insertAuditReport(input: {
  businessName: string;
  email: string;
  industry: string;
  monthlyRevenue: string;
  manualLaborHours: string;
  bottleneck: string;
  targetOutcome: string;
  recommendation: Record<string, unknown>;
}): Promise<AuditReport> {
  const id = createId("audit");
  const createdAt = new Date().toISOString();

  const { rows } = await getPool().query(
    `INSERT INTO audit_reports (
      id,
      business_name,
      email,
      industry,
      monthly_revenue,
      manual_labor_hours,
      bottleneck,
      target_outcome,
      recommendation,
      created_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
    [
      id,
      input.businessName,
      input.email,
      input.industry,
      input.monthlyRevenue,
      input.manualLaborHours,
      input.bottleneck,
      input.targetOutcome || "",
      JSON.stringify(input.recommendation),
      createdAt,
    ]
  );

  return mapAuditRow(rows[0]);
}