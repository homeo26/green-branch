"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * موجات خضراء متحركة أسفل قسم البطل (Hero).
 * ثلاث طبقات SVG تنزلق أفقيًا بسرعات مختلفة لعمق بصري مريح.
 */
export default function Waves({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden sm:h-36 md:h-44 ${className}`}
      aria-hidden
    >
      <WaveLayer
        color="rgba(61, 154, 103, 0.35)"
        animation="animate-wave-slow"
        path="M0,64 C180,110 360,20 540,52 C720,84 900,120 1080,88 C1260,56 1350,30 1440,54 L1440,160 L0,160 Z"
      />
      <WaveLayer
        color="rgba(47, 125, 84, 0.55)"
        animation="animate-wave-mid"
        path="M0,90 C200,50 400,120 620,92 C840,64 1040,40 1240,78 C1340,96 1400,90 1440,80 L1440,160 L0,160 Z"
      />
      <WaveLayer
        color="#fbfdf9"
        animation="animate-wave-fast"
        path="M0,110 C240,80 480,140 720,112 C960,84 1200,120 1440,96 L1440,160 L0,160 Z"
      />
    </div>
  );
}

function WaveLayer({
  color,
  animation,
  path,
}: {
  color: string;
  animation: string;
  path: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      dir="ltr"
      className={`absolute bottom-0 left-0 flex h-full w-[200%] ${reduce ? "" : animation}`}
    >
      {[0, 1].map((i) => (
        <svg
          key={i}
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="h-full w-1/2 shrink-0"
        >
          <path fill={color} d={path} />
        </svg>
      ))}
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
