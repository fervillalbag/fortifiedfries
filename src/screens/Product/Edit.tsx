import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BackBtn from "../../components/BackBtn";
import { useProductDetail } from "../../hooks/products";
import { useStatusProducts } from "../../hooks/status";
import { useCategories } from "../../hooks/categories";
import { Input, Select } from "../../ui";

export default function EditProduct() {
  const { id } = useParams();
  const queryProduct = useProductDetail(id as string);

  const queryStatusProducts = useStatusProducts();
  const queryCategoryProducts = useCategories();

  const [showOptionsStatusProduct, setShowOptionsStatusProduct] =
    useState<boolean>(false);
  const [showOptionsCategoryProduct, setShowOptionsCategoryProduct] =
    useState<boolean>(false);

  const [productInfo, setProductInfo] = useState<any>({
    title: "",
    statusProduct: {
      _id: "",
      name: "",
      updatedAt: "",
      createdAt: "",
    },
    category: {
      _id: "",
      name: "",
    },
  });

  useEffect(() => {
    if (queryProduct.isSuccess) {
      setProductInfo(queryProduct.data.data);
    }
  }, [queryProduct.isSuccess]);

  if (queryProduct.isError) {
    return <div>error..</div>;
  }

  if (queryProduct.isLoading || !productInfo) {
    return <div>cargando..</div>;
  }

  return (
    <div>
      <BackBtn title="Editar producto" />

      <div className="px-5 flex flex-col gap-y-5">
        <Input
          label="Nombre producto"
          variant="ui"
          value={productInfo.title}
          onChange={(e) =>
            setProductInfo({ ...productInfo, title: e.target.value })
          }
        />

        <div>
          {queryStatusProducts.isLoading ? (
            <div></div>
          ) : queryStatusProducts.isError ? (
            <div>error</div>
          ) : (
            <Select
              value={productInfo.statusProduct}
              show={showOptionsStatusProduct}
              setShow={setShowOptionsStatusProduct}
            >
              <button
                onClick={() =>
                  setProductInfo({
                    ...productInfo,
                    statusProduct: { name: "" },
                  })
                }
              >
                Seleccione un estado
              </button>
              {queryStatusProducts?.data.map((option: any) => (
                <button
                  key={option._id}
                  onClick={() => {
                    setProductInfo({
                      ...productInfo,
                      statusProduct: option,
                    });
                    setShowOptionsStatusProduct(false);
                  }}
                >
                  {option.name}
                </button>
              ))}
            </Select>
          )}
        </div>

        <div>
          {queryCategoryProducts.isLoading ? (
            <div></div>
          ) : queryCategoryProducts.isError ? (
            <div>error</div>
          ) : (
            <Select
              value={productInfo.category}
              show={showOptionsCategoryProduct}
              setShow={setShowOptionsCategoryProduct}
            >
              <button
                onClick={() =>
                  setProductInfo({
                    ...productInfo,
                    category: { name: "" },
                  })
                }
              >
                Seleccione una categoria
              </button>
              {queryCategoryProducts?.data.map((option: any) => (
                <button
                  key={option._id}
                  onClick={() => {
                    setProductInfo({
                      ...productInfo,
                      category: option,
                    });
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
    </div>
  );
}
