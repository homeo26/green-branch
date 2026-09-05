"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LockIcon } from "@/components/icons";

export default function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "تعذّر تسجيل الدخول");
        return;
      }
      router.replace(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch {
      setError("تعذّر الاتصال بالخادم");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-organic p-8">
      <div className="flex flex-col items-center text-center">
        <Image src="/brand/logo-mark.png" alt="" width={56} height={56} />
        <h1 className="mt-4 font-heading text-2xl font-extrabold text-forest-900">
          لوحة تحكم الغصن الأخضر
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          سجّل الدخول لإدارة المقالات والصور
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {error}
        </p>
      )}

      <div className="mt-6">
        <label
          htmlFor="email"
          className="mb-1.5 block font-heading text-sm font-semibold text-forest-900"
        >
          البريد الإلكتروني
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field-input"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="password"
          className="mb-1.5 block font-heading text-sm font-semibold text-forest-900"
        >
          كلمة المرور
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          dir="ltr"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field-input"
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="btn btn-primary btn-sheen mt-7 w-full px-6 py-3.5 disabled:cursor-wait disabled:opacity-70"
      >
        <LockIcon width={18} height={18} />
        {busy ? "جارٍ التحقق…" : "دخول"}
      </button>
    </form>
  );
}
