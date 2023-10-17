import { axios } from "../config";

export const getProducts = async () => {
  try {
    const products = await axios.get("/product/card");
    return products;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getProductsPromotions = async (
  ad: string
): Promise<any> => {
  try {
    const products = axios.get(`/product/ad/${ad}`);
    return products;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createProduct = async (data: any): Promise<any> => {
  try {
    const products = axios({
      method: "POST",
      url: "/product",
      data: JSON.stringify(data),
    });
    return products;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateProduct = async (
  id: string,
  data: any
): Promise<any> => {
  const products = axios({
    method: "PATCH",
    url: `/product/${id}`,
    data: JSON.stringify(data),
  });
  return products;
};

export const getProductDetail = async (id: string) => {
  try {
    const product = await axios.get(`product/single?_id=${id}`);
    return product;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getProductSearch = async (value: string) => {
  try {
    const product = await axios.get(`product/search?value=${value}`);
    return product;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getProductsByUser = async (user: string) => {
  try {
    const product = await axios.get(`product/user/${user}`);
    return product;
  } catch (error) {
    throw new Error(error as string);
  }
};
