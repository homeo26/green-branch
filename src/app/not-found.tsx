import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="gradient-flow flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={110}
        height={110}
        className="opacity-80"
      />
      <h1 className="mt-6 font-heading text-4xl font-extrabold text-forest-900">
        الصفحة غير موجودة
      </h1>
      <p className="mt-4 max-w-md leading-8 text-ink-muted">
        يبدو أن هذا الغصن لم ينبت بعد — الصفحة التي تبحث عنها غير متوفرة أو
        انتقلت لمكان آخر.
      </p>
      <Link href="/" className="btn btn-primary btn-sheen mt-8 px-7 py-3">
        العودة للرئيسية
      </Link>
    </section>
  );
}
