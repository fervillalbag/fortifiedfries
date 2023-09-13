import { useQuery } from "@tanstack/react-query";
import { client } from "../../../supabase/client";

export type ProductProps = {
  id: number;
  images: string[];
  title: string;
  currency: number;
  price: number;
};

const getProducts = async (): Promise<ProductProps[] | null> => {
  try {
    const { data } = await client
      .from("Product")
      .select("id, images, title, price, currency")
      .is("typeAd", "null");
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const getProductsByCategory = async (category: number) => {
  try {
    if (typeof category !== "number" && category !== null) {
      throw new Error("La categoría no es un número válido.");
    }

    const { data } = await client
      .from("Product")
      .select("id")
      .eq("category", category);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const getProductDetail = async (id: number) => {
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
  } catch (error) {
    throw new Error(error as string);
  }
};

export const useProducts = () => {
  const queryProduct = useQuery(["products"], getProducts);
  return { queryProduct };
};

export const useProductDetail = (id: number) => {
  const queryProduct = useQuery(["productDetail", id], () =>
    getProductDetail(id)
  );
  return { queryProduct };
};

export const useProductByCategory = (id: number) => {
  const queryProduct = useQuery(["productDetail", id], () =>
    getProductsByCategory(id)
  );
  return { queryProduct };
};
