import { useNavigate } from "react-router-dom";

import { BackButton } from "../../components";
import { ACTIONS } from "../../../data/actions";
import { ButtonAction } from "../../components/Actions";

export default function Root() {
  const navigate = useNavigate();

  return (
    <div>
      <BackButton title="Acciones" />

      <div className="px-5">
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
  );
}
