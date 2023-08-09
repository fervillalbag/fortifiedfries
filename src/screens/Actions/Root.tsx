import { useNavigate } from "react-router-dom";

import { Layout } from "../../components";
import { ACTIONS } from "../../../data/actions";
import { ButtonAction } from "../../components/Actions";
import { Text } from "../../ui";

export default function Root() {
  const navigate = useNavigate();

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
