import { axios } from "../config";

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

export const register = async (data: any) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/user/register",
      data: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.log(error);
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
