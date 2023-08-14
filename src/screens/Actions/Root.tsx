import { useNavigate } from "react-router-dom";

import { Layout } from "../../components";
import { ACTIONS } from "../../../data/actions";
import { ButtonAction } from "../../components/Actions";
import { Text } from "../../ui";
import { useEffect } from "react";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";

export default function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(SURA_CREATE_POST_INFO, "");
  }, []);

  return (
    <Layout>
      <div className="p-5">
        <Text className="text-2xl text-@sura-primary-900">
          Acciones
        </Text>

        <div className="mt-4">
          {ACTIONS.map((action) => (
            <ButtonAction
              key={action.id}
              title={action.title}
              description={action.description}
              onClick={() => navigate(action.route)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
