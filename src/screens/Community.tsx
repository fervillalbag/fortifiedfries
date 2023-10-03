import { useContext, useState } from "react";
import { HeaderHome, Layout } from "../components";
import { ModalLogin, TabsHeader } from "../components/Home";
import { AuthenticatedContext } from "../context";

export default function Community() {
  const { isAuthenticated } = useContext(AuthenticatedContext);
  const [showModalLogin, setShowModalLogin] = useState<boolean>(
    !isAuthenticated
  );

  return (
    <Layout>
      <ModalLogin show={showModalLogin} setShow={setShowModalLogin} />

      <HeaderHome />
      <TabsHeader />
    </Layout>
  );
}
