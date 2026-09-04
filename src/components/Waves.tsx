"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * موجات خضراء عريضة أسفل قسم البطل — ثلاث طبقات تنزلق ببطء
 * مع تموّج عمودي ناعم يمنح إحساس الموجة الحيّة.
 */
export default function Waves({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-44 overflow-hidden sm:h-56 md:h-72 ${className}`}
      aria-hidden
    >
      <WaveLayer
        color="rgba(61, 154, 103, 0.30)"
        animation="animate-wave-slow"
        bob
        path="M0,60 C160,170 320,10 480,80 C640,150 800,220 960,140 C1120,60 1280,20 1440,100 L1440,300 L0,300 Z"
      />
      <WaveLayer
        color="rgba(47, 125, 84, 0.5)"
        animation="animate-wave-mid"
        path="M0,150 C180,60 380,240 580,150 C780,70 940,40 1120,130 C1260,200 1370,170 1440,130 L1440,300 L0,300 Z"
      />
      <WaveLayer
        color="#fbfdf9"
        animation="animate-wave-fast"
        bob
        path="M0,210 C220,130 440,270 680,200 C900,140 1180,250 1440,180 L1440,300 L0,300 Z"
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
            viewBox="0 0 1440 300"
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
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 1900);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className={`relative inline-block ${className}`} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{
            opacity: 1,
            scale: reduce ? 1 : [0.96, 1.04, 1],
          }}
          exit={reduce ? {} : { opacity: 0, scale: 0.94 }}
          transition={{
            opacity: { duration: 0.25 },
            scale: { duration: 1.6, ease: "easeInOut" },
          }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ورقة نبات صغيرة للأوراق الطائرة */
function Leaf({ color = "#2f7d54" }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className="h-full w-full" aria-hidden>
      <path d="M12 2C7 6 4 10.5 4 15a8 8 0 0 0 16 0c0-4.5-3-9-8-13z" />
      <path
        d="M12 6v13"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** أوراق صغيرة تنجرف مع الريح عبر المشهد */
export function DriftingLeaves() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const leaves = [
    { top: "18%", end: "6%", size: 26, color: "#3d9a67", delay: 0, duration: 13 },
    { top: "38%", end: "14%", size: 18, color: "#c68b4e", delay: 4.5, duration: 16 },
    { top: "10%", end: "38%", size: 22, color: "#2f7d54", delay: 8, duration: 14 },
    { top: "55%", end: "4%", size: 16, color: "#d9a86d", delay: 11, duration: 17 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="animate-leaf-drift absolute opacity-0"
          style={{
            top: leaf.top,
            insetInlineEnd: leaf.end,
            width: leaf.size,
            height: leaf.size,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
          }}
        >
          <Leaf color={leaf.color} />
        </div>
      ))}
    </div>
  );
}
