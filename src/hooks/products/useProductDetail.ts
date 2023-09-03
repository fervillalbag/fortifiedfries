import { useQuery } from "@tanstack/react-query";
import { client } from "../../../supabase/client";

const getProductDetail = async (id: string) => {
  try {
    const { data: product } = await client
      .from("Product")
      .select(
        "title, images, description, owner, status, price, currency"
      )
      .eq("id", +id)
      .single();

    if (!product?.owner) throw new Error("No se encontro producto");

    const { data: ownerProduct } = await client
      .from("Personal")
      .select("avatar, fullname, username, affiliated")
      .eq("id", product.owner)
      .single();

    return { product, user: ownerProduct };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const useProductDetail = (id: string) => {
  const queryProduct = useQuery(["productDetail", id], () =>
    getProductDetail(id)
  );
  return { queryProduct };
};
