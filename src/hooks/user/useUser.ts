import { useMutation, useQuery } from "@tanstack/react-query";

import { getUser, register } from "../../services";
import { RegisterUserProps } from "../../interface";

export const useGetUser = (param: string, value: string) => {
  const queryUser = useQuery(["get-user", param, value], () =>
    getUser(param, value)
  );
  return queryUser;
};

export const useRegisterUser = (data: RegisterUserProps) => {
  const queryRegister = useMutation(["register"], () =>
    register(data)
  );
  return queryRegister;
};
