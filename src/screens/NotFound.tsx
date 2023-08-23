import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Text } from "../ui";
import { useHeight } from "../hooks";
import { AuthenticatedContext } from "../context";

const NotFound: React.FC = () => {
  const { isAuthenticated } = useContext(AuthenticatedContext);
  const navigate = useNavigate();

  const stylesHeight = useHeight();

  useEffect(() => {
    setTimeout(() => {
      const path = isAuthenticated ? "/home" : "/";
      navigate(path);
    }, 2000);
  }, []);

  return (
    <div style={stylesHeight} className="grid place-items-center">
      <Text>Cargando..</Text>
    </div>
  );
};

export default NotFound;
