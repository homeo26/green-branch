"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ورقة نبات بسيطة تُعاد بأحجام وألوان مختلفة */
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
      <path
        d="M12 10c1.6-.8 2.8-.8 4 0M12 14c-1.6-.8-2.8-.8-4 0"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* أوراق مصفوفة على امتداد الحقل — كل ورقة تتمايل بإيقاع مختلف */
const fieldLeaves = [
  { start: "2%", size: 44, color: "#256344", delay: 0, slow: false },
  { start: "9%", size: 64, color: "#2f7d54", delay: 1.2, slow: true },
  { start: "17%", size: 38, color: "#3d9a67", delay: 0.5, slow: false },
  { start: "26%", size: 56, color: "#1d4a34", delay: 2.1, slow: true },
  { start: "34%", size: 42, color: "#2f7d54", delay: 0.8, slow: false },
  { start: "43%", size: 70, color: "#256344", delay: 1.6, slow: true },
  { start: "52%", size: 40, color: "#3d9a67", delay: 0.2, slow: false },
  { start: "60%", size: 58, color: "#2f7d54", delay: 2.6, slow: true },
  { start: "69%", size: 46, color: "#1d4a34", delay: 1.0, slow: false },
  { start: "77%", size: 66, color: "#256344", delay: 0.4, slow: true },
  { start: "86%", size: 40, color: "#3d9a67", delay: 1.9, slow: false },
  { start: "93%", size: 54, color: "#2f7d54", delay: 0.7, slow: true },
];

/**
 * نسيم الحقل: تلة خضراء "تتنفس" بهدوء تعلوها أوراق تتمايل مع الريح،
 * وأوراق طائرة تنجرف عبر المشهد.
 */
export default function FieldBreeze({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-36 sm:h-44 md:h-52 ${className}`}
      aria-hidden
    >
      {/* أوراق منجرفة مع الريح */}
      {!reduce && (
        <>
          <div
            className="animate-leaf-drift absolute end-[4%] top-0 h-7 w-7 opacity-0"
            style={{ animationDelay: "1s" }}
          >
            <Leaf color="#3d9a67" />
          </div>
          <div
            className="animate-leaf-drift absolute end-[18%] top-6 h-5 w-5 opacity-0"
            style={{ animationDelay: "7s" }}
          >
            <Leaf color="#c68b4e" />
          </div>
        </>
      )}

      {/* صف الأوراق المتمايلة */}
      <div className="absolute inset-x-0 bottom-8 sm:bottom-10">
        {fieldLeaves.map((leaf, i) => (
          <div
            key={i}
            className={`absolute bottom-0 origin-bottom ${
              reduce ? "" : leaf.slow ? "animate-sway-slow" : "animate-sway"
            }`}
            style={{
              insetInlineStart: leaf.start,
              width: leaf.size,
              height: leaf.size * 1.25,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <Leaf color={leaf.color} />
          </div>
        ))}
      </div>

      {/* التلة الخضراء تتنفس */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`absolute bottom-0 h-12 w-full origin-bottom sm:h-16 ${
          reduce ? "" : "animate-grass-breathe"
        }`}
      >
        <path
          fill="#e3f6ea"
          d="M0,50 C240,15 480,70 720,45 C960,20 1200,60 1440,35 L1440,90 L0,90 Z"
        />
        <path
          fill="#fbfdf9"
          d="M0,70 C260,45 520,85 780,65 C1040,45 1250,75 1440,60 L1440,90 L0,90 Z"
        />
      </svg>
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
