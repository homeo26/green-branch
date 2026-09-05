/**
 * جلسات لوحة التحكم — متوافقة مع بيئة Edge (jose فقط، بلا node:crypto)
 * حتى تعمل داخل middleware.
 */
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "gb_session";
const SESSION_HOURS = 12;

function secretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET غير مضبوط أو قصير جدًا (16 حرفًا على الأقل)");
  }
  return new TextEncoder().encode(secret);
}

/** إنشاء رمز جلسة موقّع */
export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(secretKey());
}

/** التحقق من رمز الجلسة؛ يُعيد البريد أو null */
export async function verifySessionToken(
  token: string | undefined
): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (payload.role !== "admin") return null;
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_HOURS * 60 * 60,
};
