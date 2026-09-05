/**
 * التحقق من بيانات دخول المشرف — يستخدم node:crypto،
 * لذا يُستدعى من مسارات الـ API فقط (لا من middleware).
 *
 * متغيرات البيئة المطلوبة:
 *   ADMIN_EMAIL          بريد المشرف
 *   ADMIN_PASSWORD_HASH  ناتج `npm run hash-password`  (بصيغة scrypt:salt:hash)
 *   AUTH_SECRET          سلسلة عشوائية طويلة لتوقيع الجلسات
 */
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/** هل إعدادات المصادقة مكتملة؟ */
export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH &&
      process.env.AUTH_SECRET
  );
}

/** توليد لبد كلمة مرور — يُستخدم من سكربت hash-password */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

/** التحقق من كلمة المرور مقابل اللبد المخزّن */
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

/** التحقق من بيانات الدخول */
export function checkCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  const storedHash = process.env.ADMIN_PASSWORD_HASH ?? "";
  if (!adminEmail || !storedHash) return false;
  const emailMatches =
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
  const passwordMatches = verifyPassword(password, storedHash);
  // نتحقق من الاثنين دائمًا لتقليل فروق التوقيت
  return emailMatches && passwordMatches;
}
