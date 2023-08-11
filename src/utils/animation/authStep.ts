import { Variants } from "framer-motion";

export const transitionLayoutPage = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

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
