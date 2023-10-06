import { useEffect, useState } from "react";

interface UserInfoRegisterProps {
  fullname: string;
  email: string;
  gender: string;
  password: string;
}

export const getCurrentLocalStorage = () => {
  const [currentLocalStorage, setCurrentLocalStorage] =
    useState<UserInfoRegisterProps | null>(null);

  useEffect(() => {
    setCurrentLocalStorage(
      JSON.parse(
        localStorage.getItem("@SURA-AUTH-REGISTER-INFO") as string
      )
    );
  }, []);

  return {
    currentLocalStorage,
  };
};
