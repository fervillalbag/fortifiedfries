import { useQuery } from "@tanstack/react-query";
import { client } from "../../../supabase/client";

const getUser = async () => {
  try {
    const { data } = await client.auth.getUser();

    if (!data.user) throw new Error("No se encontro el usuario");

    const { data: dataUser } = await client
      .from("Personal")
      .select("*")
      .eq("email", data?.user.email)
      .single();

    return dataUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const useUser = () => {
  const queryUser = useQuery(["user"], getUser);
  return { queryUser };
};
