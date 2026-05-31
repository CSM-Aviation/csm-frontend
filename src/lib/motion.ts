/**
 * Motion constants — mirror of the §19 motion tokens for use in framer-motion
 * variants and inline style/JS where a CSS var is not ergonomic. The CSS file
 * (tokens.css) remains the source of truth; keep these in sync with it.
 */

// Easing curves as cubic-bezier arrays (framer-motion `ease` form).
export const ease = {
  calm: [0.22, 0.61, 0.36, 1] as const, // --ease-calm
  horizon: [0.65, 0, 0.35, 1] as const, // --ease-horizon
};

// Durations in seconds (framer-motion uses seconds; tokens are ms).
export const duration = {
  fast: 0.2, // --dur-fast 200ms
  base: 0.36, // --dur-base 360ms
  slow: 0.72, // --dur-slow 720ms
  line: 1.1, // --dur-line 1100ms
};

// Shared reveal variant: a calm upward fade. Pair with useReveal's `shown`.
export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.calm },
  },
};

// Stagger container for grouped reveals (cards, stat blocks).
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  shown: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});
