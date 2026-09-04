"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * موجات خضراء عريضة بتعبئة متدرجة — منحنيات جيبية متناظرة
 * (القمة بعمق القاع نفسه) تنزلق ببطء مع تموّج عمودي ناعم.
 */

/* منحنى جيبي متناظر: يبدأ وينتهي عند نفس النقطة للتكرار السلس */
const SINE_FRONT =
  "M0,130 C120,40 240,40 360,130 C480,220 600,220 720,130 C840,40 960,40 1080,130 C1200,220 1320,220 1440,130 L1440,320 L0,320 Z";
const SINE_BACK =
  "M0,130 C120,220 240,220 360,130 C480,40 600,40 720,130 C840,220 960,220 1080,130 C1200,40 1320,40 1440,130 L1440,320 L0,320 Z";

export default function Waves({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden sm:h-80 md:h-96 ${className}`}
      aria-hidden
    >
      <WaveLayer
        id="back"
        from="#3d9a67"
        to="#eaf7ef"
        opacity={0.4}
        animation="animate-wave-slow"
        bob
        path={SINE_BACK}
      />
      <WaveLayer
        id="front"
        from="#9fd8b8"
        to="#fbfdf9"
        opacity={1}
        animation="animate-wave-mid"
        path={SINE_FRONT}
      />
    </div>
  );
}

function WaveLayer({
  id,
  from,
  to,
  opacity,
  animation,
  path,
  bob = false,
}: {
  id: string;
  from: string;
  to: string;
  opacity: number;
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
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="h-full w-1/2 shrink-0"
          >
            <defs>
              <linearGradient id={`wave-${id}-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={from} />
                <stop offset="100%" stopColor={to} />
              </linearGradient>
            </defs>
            <path fill={`url(#wave-${id}-${i})`} opacity={opacity} d={path} />
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
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 3000);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className={`relative inline-block ${className}`} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={reduce ? {} : { opacity: 0, transition: { duration: 0.15 } }}
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
