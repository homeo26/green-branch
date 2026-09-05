import { NextResponse } from "next/server";
import { checkCredentials, isAuthConfigured } from "@/lib/auth";
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/session-token";

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          "إعدادات المصادقة غير مكتملة على الخادم (ADMIN_EMAIL, ADMIN_PASSWORD_HASH, AUTH_SECRET)",
      },
      { status: 500 }
    );
  }

  let email = "";
  let password = "";
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    email = body.email ?? "";
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: "البريد الإلكتروني وكلمة المرور مطلوبان" },
      { status: 400 }
    );
  }

  if (!checkCredentials(email, password)) {
    // تأخير بسيط لإبطاء محاولات التخمين
    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json(
      { error: "بيانات الدخول غير صحيحة" },
      { status: 401 }
    );
  }

  const token = await createSessionToken(email);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return response;
}
