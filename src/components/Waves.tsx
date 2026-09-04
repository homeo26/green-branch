"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * موجات خضراء متحركة أسفل قسم البطل (Hero).
 * ثلاث طبقات SVG تنزلق أفقيًا ببطء مع تموّج عمودي ناعم
 * يمنح إحساس الموجة الحيّة.
 */
export default function Waves({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden sm:h-52 md:h-64 ${className}`}
      aria-hidden
    >
      <WaveLayer
        color="rgba(61, 154, 103, 0.30)"
        animation="animate-wave-slow"
        bob
        path="M0,96 C160,160 320,20 480,70 C640,120 800,190 960,130 C1120,70 1280,30 1440,90 L1440,260 L0,260 Z"
      />
      <WaveLayer
        color="rgba(47, 125, 84, 0.5)"
        animation="animate-wave-mid"
        path="M0,140 C180,70 380,200 580,140 C780,80 940,50 1120,120 C1260,175 1370,150 1440,120 L1440,260 L0,260 Z"
      />
      <WaveLayer
        color="#fbfdf9"
        animation="animate-wave-fast"
        bob
        path="M0,180 C220,120 440,230 680,180 C900,135 1180,210 1440,160 L1440,260 L0,260 Z"
      />
    </div>
  );
}

function WaveLayer({
  color,
  animation,
  path,
  bob = false,
}: {
  color: string;
  animation: string;
  path: string;
  bob?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`absolute inset-0 ${reduce || !bob ? "" : "animate-wave-bob"}`}>
      <div
        dir="ltr"
        className={`absolute bottom-0 left-0 flex h-full w-[200%] ${reduce ? "" : animation}`}
      >
        {[0, 1].map((i) => (
          <svg
            key={i}
            viewBox="0 0 1440 260"
            preserveAspectRatio="none"
            className="h-full w-1/2 shrink-0"
          >
            <path fill={color} d={path} />
          </svg>
        ))}
      </div>
    </div>
  );
}

/** عنصر يظهر بحركة ناعمة عند دخوله نطاق الرؤية */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** كلمات متبدّلة بتأثير "تنفّس" ناعم */
export function BreathingWords({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  return <BreathingWordsInner words={words} className={className} />;
}

function BreathingWordsInner({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 3200);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className={`relative inline-block ${className}`} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: reduce ? 1 : [1, 1.05, 1],
          }}
          exit={reduce ? {} : { opacity: 0, scale: 0.92 }}
          transition={{
            opacity: { duration: 0.45 },
            scale: { duration: 3.2, ease: "easeInOut" },
          }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
