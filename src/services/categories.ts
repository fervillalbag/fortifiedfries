import { client } from "../../supabase/client";

export const getAllCategories = async () => {
  try {
    const response = await client.from("CategoryProduct").select("*");
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};
