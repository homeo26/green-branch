"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { allCategories } from "@/data/categories";
import { LeafIcon } from "@/components/icons";

type Status = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    /* later: submit to an API managed from the admin portal */
    setTimeout(() => setStatus("sent"), 900);
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-organic flex h-full flex-col items-center justify-center p-10 text-center"
        role="status"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-leaf-100 text-forest-700">
          <LeafIcon width={30} height={30} />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-bold text-forest-900">
          وصلتنا رسالتك!
        </h2>
        <p className="mt-3 max-w-md leading-7 text-ink-muted">
          شكرًا لتواصلك مع الغصن الأخضر — سيراجع فريقنا استفسارك ويرد عليك في
          أقرب وقت ممكن.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-outline mt-7 px-6 py-2.5 text-sm"
        >
          إرسال استفسار آخر
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-organic p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="الاسم الكامل" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="اكتب اسمك"
            className="field-input"
          />
        </Field>
        <Field label="البريد الإلكتروني أو رقم الهاتف" htmlFor="contact">
          <input
            id="contact"
            name="contact"
            type="text"
            required
            autoComplete="email"
            placeholder="للتواصل معك"
            className="field-input"
          />
        </Field>
      </div>

      <Field label="موضوع الاستشارة" htmlFor="topic" className="mt-5">
        <select id="topic" name="topic" required className="field-input" defaultValue="">
          <option value="" disabled>
            اختر التصنيف الأقرب لسؤالك
          </option>
          {allCategories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.title}
            </option>
          ))}
          <option value="other">موضوع آخر</option>
        </select>
      </Field>

      <Field label="استفسارك" htmlFor="message" className="mt-5">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="اشرح حالة مزروعاتك أو سؤالك بالتفصيل — كلما زادت التفاصيل كانت الإجابة أدق."
          className="field-input resize-y"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary btn-sheen mt-7 w-full px-6 py-3.5 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? "جارٍ الإرسال…" : "أرسل الاستفسار"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block font-heading text-sm font-semibold text-forest-900"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
