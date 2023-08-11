import { m } from "framer-motion";
import { transitionLayoutPage } from "../../utils/animation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitionLayoutPage}
    >
      {children}
    </m.div>
  );
}
