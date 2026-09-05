"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoutIcon } from "@/components/icons";

export default function AdminHeader({ email }: { email: string | null }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border-soft pb-6">
      <Link href="/admin" className="flex items-center gap-3">
        <Image src="/brand/logo-mark.png" alt="" width={42} height={42} />
        <span className="flex flex-col">
          <span className="font-heading text-lg font-bold leading-6 text-forest-800">
            لوحة التحكم
          </span>
          <span className="text-xs text-ink-muted">الغصن الأخضر</span>
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {email && (
          <span className="hidden text-sm text-ink-muted sm:inline" dir="ltr">
            {email}
          </span>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-outline px-5 py-2.5 text-sm"
        >
          <LogoutIcon width={17} height={17} />
          خروج
        </button>
      </div>
    </header>
  );
}
