/**
 * File storage on Cloudflare R2 via its S3-compatible API.
 *
 * Required environment variables:
 *   R2_ACCOUNT_ID        Cloudflare account id
 *   R2_ACCESS_KEY_ID     R2 access key id
 *   R2_SECRET_ACCESS_KEY R2 secret access key
 *   R2_BUCKET            bucket name
 *   R2_PUBLIC_BASE_URL   public bucket URL (r2.dev or a custom domain)
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
/** Optional endpoint override (any S3-compatible provider, or local testing) */
const endpointOverride = process.env.R2_ENDPOINT;

/** Public base URL for uploaded files (no trailing slash) */
export const publicBaseUrl = (process.env.R2_PUBLIC_BASE_URL ?? "").replace(
  /\/$/,
  ""
);

/** Whether R2 is fully configured. If not, the site serves seed content only. */
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

/** Read a text object; returns null when it does not exist */
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

/** Write a text object */
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

/** Upload a binary file (image) and return its public URL */
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

/** Delete an object */
export async function deleteObject(key: string): Promise<void> {
  await getClient().send(
    new DeleteObjectCommand({ Bucket: bucket, Key: key })
  );
}

/** Build the public URL for a given key */
export function publicUrlFor(key: string): string {
  if (!publicBaseUrl) return `/${key}`;
  return `${publicBaseUrl}/${key}`;
}
