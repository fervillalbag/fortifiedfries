import { useContext, useState } from "react";
import { HeaderHome, Layout } from "../components";
import { ModalLogin } from "../components/Home";
import { AuthenticatedContext } from "../context";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Link } from "react-router-dom";

export default function Services() {
  const { isAuthenticated } = useContext(AuthenticatedContext);
  const [showModalLogin, setShowModalLogin] = useState<boolean>(
    !isAuthenticated
  );

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  return (
    <Layout>
      <ModalLogin show={showModalLogin} setShow={setShowModalLogin} />

      <HeaderHome />

      <div
        className={`sticky top-0 left-0 flex items-center gap-x-[22px] px-5 py-4 bg-white z-50 ${
          scrollPosition < 60 ? "" : "shadow-md shadow-neutral-500/10"
        }`}
      >
        <Link
          to="/home"
          className={`${
            location.pathname === "/home"
              ? "font-medium text-lg text-@sura-primary-900"
              : "font-normal text-@sura-primary-300"
          }`}
        >
          Productos
        </Link>
        <Link
          to="/services"
          className={`${
            location.pathname === "/services"
              ? "font-medium text-lg text-@sura-primary-900"
              : "font-normal text-@sura-primary-300"
          }`}
        >
          Servicios
        </Link>
        <Link to="/" className="text-@sura-primary-300">
          Comunidad
        </Link>
      </div>
    </Layout>
  );
}
