import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "دخول لوحة التحكم",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <section className="gradient-flow flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <LoginForm next={next} />
      </div>
    </section>
  );
}
