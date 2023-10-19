import { useEffect, useState } from "react";
import { useStatusProducts } from "../../../hooks/status";
import { Select } from "../../../ui";
import { useProductDetail } from "../../../hooks/products";
import { useParams } from "react-router-dom";
import BackBtn from "../../../components/BackBtn";

export function FormEditStatus() {
  const { id } = useParams();

  const queryStatusProducts = useStatusProducts();
  const queryProduct = useProductDetail(id as string);

  const [statusProduct, setStatusProduct] = useState<any>({
    _id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
  });

  const [showOptionsStatusProduct, setShowOptionsStatusProduct] =
    useState<boolean>(false);

  useEffect(() => {
    if (queryProduct.isSuccess) {
      setStatusProduct(queryProduct.data.data.statusProduct);
    }
  }, [queryProduct.isSuccess]);

  return (
    <div>
      <BackBtn title="Editar estado" />

      <div className="px-5">
        {queryStatusProducts.isLoading ? (
          <div></div>
        ) : queryStatusProducts.isError ? (
          <div>error</div>
        ) : (
          <Select
            value={statusProduct}
            show={showOptionsStatusProduct}
            setShow={setShowOptionsStatusProduct}
          >
            <button
              onClick={() =>
                setStatusProduct({
                  _id: "",
                  name: "",
                  createdAt: "",
                  updatedAt: "",
                })
              }
            >
              Seleccione un estado
            </button>
            {queryStatusProducts?.data.map((option: any) => (
              <button
                key={option._id}
                onClick={() => {
                  setStatusProduct(option);
                  setShowOptionsStatusProduct(false);
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
