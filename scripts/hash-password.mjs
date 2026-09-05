#!/usr/bin/env node
/**
 * Generate the admin password hash.
 * Usage: node scripts/hash-password.mjs "your-password"
 */
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('الاستخدام: node scripts/hash-password.mjs "كلمة-المرور"');
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");

console.log("\nأضف هذه القيمة إلى متغيرات البيئة:\n");
console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt}:${hash}\n`);
console.log("ولتوليد AUTH_SECRET عشوائي:\n");
console.log(`AUTH_SECRET=${randomBytes(32).toString("hex")}\n`);
