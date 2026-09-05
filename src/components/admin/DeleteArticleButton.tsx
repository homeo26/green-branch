"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@/components/icons";

export default function DeleteArticleButton({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`هل تريد حذف المقال «${title}»؟ لا يمكن التراجع.`)) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/articles/${slug}`, {
        method: "DELETE",
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        window.alert(data.error ?? "تعذّر حذف المقال");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      aria-label="حذف المقال"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-soft text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
    >
      <TrashIcon width={17} height={17} />
    </button>
  );
}
