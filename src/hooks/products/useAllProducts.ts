import { useQuery } from "@tanstack/react-query";
import { client } from "../../../supabase/client";

const getAllProducts = async (text: string) => {
  try {
    const titleQuery = await client
      .from("Product")
      .select("*")
      .ilike("title", `%${text}%`);

    const descriptionQuery = await client
      .from("Product")
      .select("*")
      .ilike("description", `%${text}%`);

    const [titleResults, descriptionResults] = await Promise.all([
      titleQuery,
      descriptionQuery,
    ]);

    const combinedResults = [
      ...(titleResults.data || []),
      ...(descriptionResults.data || []),
    ];

    const uniqueResults = combinedResults.filter(
      (value, index, self) =>
        self.findIndex((item) => item.id === value.id) === index
    );

    return uniqueResults || [];
  } catch (error) {
    throw new Error(error as string);
  }
};

export const useAllProducts = (text: string) => {
  const queryProduct = useQuery(
    ["products", text],
    () => getAllProducts(text),
    {
      enabled: !!text,
    }
  );
  return { queryProduct };
};
