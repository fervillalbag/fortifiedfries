import { useParams } from "react-router-dom";
import BackBtn from "../../../components/BackBtn";
import { useProductDetail } from "../../../hooks/products";
import { useEffect, useState } from "react";
import { useCategories } from "../../../hooks/categories";
import { Select } from "../../../ui";

export function FormEditCategory() {
  const { id } = useParams();

  const queryProduct = useProductDetail(id as string);
  const queryCategoryProducts = useCategories();

  const [category, setCategory] = useState<any>({
    _id: "",
    name: "",
  });
  const [showOptionsCategoryProduct, setShowOptionsCategoryProduct] =
    useState<boolean>(false);

  useEffect(() => {
    if (queryProduct.isSuccess) {
      setCategory(queryProduct.data.data.category);
    }
  }, [queryProduct.isSuccess]);

  return (
    <div>
      <BackBtn title="Editar categoria" />

      <div className="px-5">
        {queryCategoryProducts.isLoading ? (
          <div></div>
        ) : queryCategoryProducts.isError ? (
          <div>error</div>
        ) : (
          <Select
            value={category}
            show={showOptionsCategoryProduct}
            setShow={setShowOptionsCategoryProduct}
          >
            <button
              onClick={() =>
                setCategory({
                  _id: "",
                  name: "",
                })
              }
            >
              Seleccione una categoria
            </button>
            {queryCategoryProducts?.data.map((option: any) => (
              <button
                key={option._id}
                onClick={() => {
                  setCategory(option);
                  setShowOptionsCategoryProduct(false);
                }}
              >
                {option.name}
              </button>
            ))}
          </Select>
        )}
      </div>
    </div>
  );
}
