import { AxiosResponse } from "axios";

import { axios } from "../config";
import { UserProps } from "../interface";

interface ErrorResponse {
  message: string;
}

export const getAllTypesOfUsers = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "/role-user",
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGendersUser = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "/gender-user",
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (
  data: any
): Promise<AxiosResponse<UserProps>> => {
  try {
    const response = await axios({
      method: "POST",
      url: "/user/register",
      data: JSON.stringify(data),
    });

    return response;
  } catch (error: any) {
    throw {
      message:
        error.response?.data?.message || "Error al registrar usuario",
    } as ErrorResponse;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "/user",
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (param: string, value: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `/user/find?${param}=${value}`,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    const response = await axios({
      method: "PATCH",
      url: `/user/${id}`,
      data: JSON.stringify(data),
    });

    return response;
  } catch (error: any) {
    throw {
      message:
        error.response?.data?.message ||
        "Error al actualizar usuario",
    } as ErrorResponse;
  }
};
