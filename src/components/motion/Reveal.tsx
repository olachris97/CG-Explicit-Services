import React from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in seconds — pass idx * 0.08 inside a .map() for a cascading effect. */
  delay?: number;
  className?: string;
  /** Vertical travel distance in px. */
  y?: number;
  /** Pass through to the wrapping element when the card itself needs full height/flex. */
  style?: React.CSSProperties;
  /**
   * Adds a subtle lift-on-hover/focus (and a slight press-down on tap).
   * Uses Motion's own hover animation rather than a Tailwind transform class,
   * because Motion keeps its resolved transform as an inline style — a
   * Tailwind `hover:-translate-y-*` class on the same element would be
   * silently overridden by that inline style and never actually animate.
   */
  hover?: boolean;
  /**
   * This project has no @types/react installed, so TS can't apply its usual
   * key/ref-stripping for custom components — it checks `key` as a literal
   * prop when Reveal is used inside a .map(). Declaring it here (unused at
   * runtime; React always handles key itself) keeps that pattern type-safe.
   */
  key?: string | number;
}

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. Wraps the card rather than modifying it, so existing Tailwind
 * transforms (scale, translate) on the card itself are never overridden by
 * Framer Motion's own transform. Respects prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className, y = 22, style, hover = false }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      whileHover={hover ? { y: -6, transition: { duration: 0.25, ease: EASE } } : undefined}
      whileTap={hover ? { y: -2, transition: { duration: 0.15, ease: EASE } } : undefined}
    >
      {children}
    </motion.div>
  );
}
