import { useEffect } from "react";
import { useLocalStorageState } from "../../hooks";
import {
  NURA_AUTH_REGISTER_INFO,
  authInitialValue,
} from "../../utils/constants";

export default function Email() {
  const [_, handleUpdateForm] = useLocalStorageState({
    key: NURA_AUTH_REGISTER_INFO,
  });

  useEffect(() => {
    handleUpdateForm(authInitialValue);
  }, []);

  return <div>Email</div>;
}
