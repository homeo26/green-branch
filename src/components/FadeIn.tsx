"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * ظهور ناعم عند التركيب (mount) — مناسب للمحتوى المتدفّق من الخادم،
 * حيث ينتهي انتقال القالب قبل وصول المحتوى.
 */
export default function FadeIn({
  children,
  delay = 0,
  y = 16,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
