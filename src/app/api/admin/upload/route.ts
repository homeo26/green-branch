import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isR2Configured, putBinary } from "@/lib/r2";
import { currentAdminEmail } from "@/lib/session";

const MAX_BYTES = 8 * 1024 * 1024; // 8 ميغابايت
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  if (!(await currentAdminEmail())) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }
  if (!isR2Configured()) {
    return NextResponse.json(
      { error: "تخزين R2 غير مهيّأ على الخادم. اضبط متغيرات R2_*" },
      { status: 503 }
    );
  }

  let file: File | null = null;
  try {
    const form = await request.formData();
    const candidate = form.get("file");
    if (candidate instanceof File) file = candidate;
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "لم يتم إرسال أي ملف" }, { status: 400 });
  }

  const extension = ALLOWED[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "صيغة غير مدعومة. المسموح: JPEG, PNG, WebP, AVIF, GIF" },
      { status: 415 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "حجم الصورة يتجاوز 8 ميغابايت" },
      { status: 413 }
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const key = `media/${new Date().toISOString().slice(0, 7)}/${randomUUID()}.${extension}`;

  try {
    const url = await putBinary(key, bytes, file.type);
    return NextResponse.json({ ok: true, url, key });
  } catch (error) {
    console.error("فشل رفع الصورة إلى R2", error);
    return NextResponse.json(
      { error: "تعذّر رفع الصورة إلى التخزين" },
      { status: 502 }
    );
  }
}
