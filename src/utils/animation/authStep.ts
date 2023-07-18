import { Variants } from "framer-motion";

export const authStepAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: -6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "anticipate",
      duration: 0.4,
    },
  },
  exit: {
    x: 2000,
  },
};

export const authStepAnimationDelaySm: Variants = {
  hidden: {
    opacity: 0,
    y: -12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "anticipate",
      duration: 0.4,
      delay: 0.2,
    },
  },
  exit: {
    x: 2000,
  },
};
