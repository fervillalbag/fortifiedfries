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
      className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]"
    >
      {children}
    </m.div>
  );
}
