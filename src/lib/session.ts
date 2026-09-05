import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session-token";

/** Email of the current session, or null */
export async function currentAdminEmail(): Promise<string | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Throws a 401 when there is no session - for use in API routes */
export async function requireAdmin(): Promise<string> {
  const email = await currentAdminEmail();
  if (!email) throw new Response("غير مصرّح", { status: 401 });
  return email;
}
