import { Pool, type PoolConfig } from "pg";
import crypto from "crypto";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  businessType: string;
  problem: string;
  selectedPackage: string;
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
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
};

// The pool is created lazily (on first use) rather than at module load time.
// server.ts calls dotenv.config() at the top of its own module body, but ES
// module imports are hoisted and fully evaluated before that body runs — so
// reading process.env.DATABASE_URL at the top level of this file would run
// before dotenv has populated it. Deferring construction until getPool() is
// first called (which only happens once startServer() runs) sidesteps that.
let _pool: Pool | null = null;

function getPool(): Pool {
  if (_pool) return _pool;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add a PostgreSQL connection string to your .env " +
        "(see .env.example) or, on Render, add a PostgreSQL instance and set " +
        "DATABASE_URL in your web service's environment variables."
    );
  }

  // Most managed Postgres providers (Render included) terminate external
  // connections with a certificate that isn't in Node's default trust store,
  // so strict verification has to be relaxed for those. A local database
  // (e.g. during `npm run dev` against Postgres running on your machine)
  // typically has no TLS listener at all, so SSL is skipped for it.
  const isLocalDb = /localhost|127\.0\.0\.1/.test(connectionString);

  const poolConfig: PoolConfig = {
    connectionString,
    ssl: isLocalDb ? false : { rejectUnauthorized: false }
  };

  _pool = new Pool(poolConfig);

  _pool.on("error", (err) => {
    // Errors on idle clients (e.g. a dropped connection) shouldn't crash the
    // whole process — the pool will open a new connection on the next query.
    console.error("Unexpected PostgreSQL pool error:", err);
  });

  return _pool;
}

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
}

/** Creates the tables on first boot and seeds two sample bookings into an
 * empty database, matching what the old admin-data.json shipped with, so a
 * fresh install still has something to look at in the admin dashboard. */
export async function initSchema() {
  await getPool().query(`
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

  await getPool().query(`
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

  const { rows } = await getPool().query<{ count: number }>(
    "SELECT COUNT(*)::int AS count FROM bookings"
  );

  if (rows[0].count === 0) {
    await getPool().query(
      `INSERT INTO bookings (id, name, email, date, time, business_type, problem, status, created_at)
       VALUES
       ($1,$2,$3,$4,$5,$6,$7,$8,$9),
       ($10,$11,$12,$13,$14,$15,$16,$17,$18)`,
      [
        "b1", "John Carter", "john@carterretail.com", "2026-07-15", "10:00 AM", "E-Commerce",
        "Inefficient order fulfillment workflows and lack of margins visibility", "completed", "2026-07-10T10:00:00.000Z",
        "b2", "Sarah Jenkins", "sarah@jenkinslogistics.net", "2026-07-16", "02:30 PM", "Logistics",
        "Manual dispatch spreadsheets take 15+ hours/week and cause routing errors", "confirmed", "2026-07-11T12:00:00.000Z"
      ]
    );
  }
}

// --- Row <-> API shape mapping -------------------------------------------
// The frontend (src/types.ts) expects camelCase fields; Postgres columns are
// snake_case by convention, so every read goes through these mappers.

function mapSubmissionRow(row: any): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    businessType: row.business_type,
    problem: row.problem,
    selectedPackage: row.selected_package,
    submittedAt: new Date(row.submitted_at).toISOString(),
    status: row.status
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
    status: row.status,
    createdAt: new Date(row.created_at).toISOString()
  };
}

// --- Submissions -----------------------------------------------------------

export async function getSubmissions(): Promise<ContactSubmission[]> {
  const { rows } = await getPool().query("SELECT * FROM submissions ORDER BY submitted_at DESC");
  return rows.map(mapSubmissionRow);
}

export async function insertSubmission(input: {
  name: string;
  email: string;
  businessType: string;
  problem: string;
  selectedPackage: string;
}): Promise<ContactSubmission> {
  const id = createId("s");
  const submittedAt = new Date().toISOString();
  const { rows } = await getPool().query(
    `INSERT INTO submissions (id, name, email, business_type, problem, selected_package, submitted_at, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'new')
     RETURNING *`,
    [id, input.name, input.email, input.businessType, input.problem, input.selectedPackage, submittedAt]
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
  const result = await getPool().query("DELETE FROM submissions WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
}

// --- Bookings ----------------------------------------------------------------

export async function getBookings(): Promise<Booking[]> {
  const { rows } = await getPool().query("SELECT * FROM bookings ORDER BY created_at DESC");
  return rows.map(mapBookingRow);
}

export async function insertBooking(input: {
  name: string;
  email: string;
  date: string;
  time: string;
  businessType: string;
  problem: string;
}): Promise<Booking> {
  const id = createId("b");
  const createdAt = new Date().toISOString();
  const { rows } = await getPool().query(
    `INSERT INTO bookings (id, name, email, date, time, business_type, problem, status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', $8)
     RETURNING *`,
    [id, input.name, input.email, input.date, input.time, input.businessType, input.problem, createdAt]
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
  const result = await getPool().query("DELETE FROM bookings WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
}
