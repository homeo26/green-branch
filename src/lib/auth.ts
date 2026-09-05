/**
 * Admin credential verification - uses node:crypto,
 * so it must only be called from API routes (never middleware).
 *
 * Required environment variables:
 *   ADMIN_EMAIL          admin email
 *   ADMIN_PASSWORD_HASH  output of `npm run hash-password` (format scrypt:salt:hash)
 *   AUTH_SECRET          long random string used to sign sessions
 */
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/** Whether authentication is fully configured */
export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH &&
      process.env.AUTH_SECRET
  );
}

/** Hash a password - used by the hash-password script */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

/** Verify a password against the stored hash */
export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const [, salt, expected] = parts;
  const actual = scryptSync(password, salt, 64).toString("hex");
  const a = Buffer.from(actual, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Verify login credentials */
export function checkCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  const storedHash = process.env.ADMIN_PASSWORD_HASH ?? "";
  if (!adminEmail || !storedHash) return false;
  const emailMatches =
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
  const passwordMatches = verifyPassword(password, storedHash);
  // always evaluate both to reduce timing differences
  return emailMatches && passwordMatches;
}
