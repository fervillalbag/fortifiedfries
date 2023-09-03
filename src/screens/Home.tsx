import React, { useContext, useEffect, useState } from "react";

import {
  ModalLogin,
  PromotionSection,
  RecentsSection,
  SeasonsSection,
} from "../components/Home";
import { HeaderHome, Layout } from "../components";
import { AuthenticatedContext } from "../context";
import { SURA_CREATE_POST_INFO } from "../utils/constants";

const Home: React.FC = () => {
  const { isAuthenticated } = useContext(AuthenticatedContext);

  const [showModalLogin, setShowModalLogin] = useState<boolean>(
    !isAuthenticated
  );

  useEffect(() => {
    localStorage.setItem(SURA_CREATE_POST_INFO, "");
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <ModalLogin show={showModalLogin} setShow={setShowModalLogin} />

      <HeaderHome />

      <div className="px-5 mt-1">
        <img src="/images/banner-promo.png" alt="" />
      </div>

      <main className="py-5 flex flex-col gap-y-5">
        <PromotionSection />
        <RecentsSection />
        <SeasonsSection />
      </main>
    </Layout>
  );
};

export default Home;
