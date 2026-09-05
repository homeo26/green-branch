/**
 * تخزين الملفات على Cloudflare R2 عبر واجهة S3 المتوافقة.
 *
 * متغيرات البيئة المطلوبة:
 *   R2_ACCOUNT_ID        معرّف حساب Cloudflare
 *   R2_ACCESS_KEY_ID     مفتاح الوصول لـ R2
 *   R2_SECRET_ACCESS_KEY المفتاح السري لـ R2
 *   R2_BUCKET            اسم الحاوية (bucket)
 *   R2_PUBLIC_BASE_URL   الرابط العام للحاوية (r2.dev أو نطاق مخصص)
 */
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET;
/** تجاوز اختياري لعنوان الخدمة (لأي مزوّد متوافق مع S3 أو للاختبار) */
const endpointOverride = process.env.R2_ENDPOINT;

/** الرابط العام للملفات المرفوعة (بدون شرطة مائلة في النهاية) */
export const publicBaseUrl = (process.env.R2_PUBLIC_BASE_URL ?? "").replace(
  /\/$/,
  ""
);

/** هل إعدادات R2 مكتملة؟ إن لم تكن، يعمل الموقع على المحتوى المبدئي فقط. */
export function isR2Configured(): boolean {
  return Boolean(accountId && accessKeyId && secretAccessKey && bucket);
}

let client: S3Client | null = null;

function getClient(): S3Client {
  if (!isR2Configured()) {
    throw new Error(
      "إعدادات R2 غير مكتملة: تأكد من ضبط R2_ACCOUNT_ID و R2_ACCESS_KEY_ID و R2_SECRET_ACCESS_KEY و R2_BUCKET"
    );
  }
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint:
        endpointOverride ?? `https://${accountId}.r2.cloudflarestorage.com`,
      forcePathStyle: Boolean(endpointOverride),
      credentials: {
        accessKeyId: accessKeyId as string,
        secretAccessKey: secretAccessKey as string,
      },
    });
  }
  return client;
}

/** قراءة كائن نصّي؛ تُعيد null إن لم يوجد */
export async function getText(key: string): Promise<string | null> {
  try {
    const res = await getClient().send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    return (await res.Body?.transformToString()) ?? null;
  } catch (error) {
    const name = (error as { name?: string }).name;
    if (name === "NoSuchKey" || name === "NotFound") return null;
    throw error;
  }
}

/** كتابة كائن نصّي */
export async function putText(
  key: string,
  body: string,
  contentType = "application/json; charset=utf-8"
): Promise<void> {
  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "no-cache",
    })
  );
}

/** رفع ملف ثنائي (صورة) وإرجاع رابطه العام */
export async function putBinary(
  key: string,
  body: Uint8Array,
  contentType: string
): Promise<string> {
  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  return publicUrlFor(key);
}

/** حذف كائن */
export async function deleteObject(key: string): Promise<void> {
  await getClient().send(
    new DeleteObjectCommand({ Bucket: bucket, Key: key })
  );
}

/** بناء الرابط العام لمفتاح معيّن */
export function publicUrlFor(key: string): string {
  if (!publicBaseUrl) return `/${key}`;
  return `${publicBaseUrl}/${key}`;
}
