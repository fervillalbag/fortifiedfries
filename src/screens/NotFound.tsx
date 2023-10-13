import React, { useEffect } from "react";
import { redirect } from "react-router-dom";

import { Text } from "../ui";
import { useHeight, useLocalStorageState } from "../hooks";
import { SURA_AUTH_TOKEN } from "../utils/constants/auth";

const NotFound: React.FC = () => {
  const [value] = useLocalStorageState({
    key: SURA_AUTH_TOKEN,
  });

  // const navigate = useNavigate();
  const stylesHeight = useHeight();

  useEffect(() => {
    const path = value?.token ? "/home" : "/";
    redirect(path);
  }, [value?.token]);

  return (
    <div style={stylesHeight} className="grid place-items-center">
      <Text>Cargando..</Text>
    </div>
  );
};

export default NotFound;
