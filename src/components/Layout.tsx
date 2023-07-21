import { Navbar } from "./";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="pb-[70px]">
      {children}
      <Navbar />
    </div>
  );
}
