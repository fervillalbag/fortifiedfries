import React from "react";
import { Header as HeaderAuth } from "../../components/Auth";

const Email: React.FC = () => {
  return (
    <div>
      <HeaderAuth
        image="/images/bg-register-email.jpg"
        title="Bienvenido!"
        subtitle={`Si aun no tienes<br/>una cuenta debes registrarte`}
      />
    </div>
  );
};

export default Email;
