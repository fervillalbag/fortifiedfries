import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Input } from "../../../ui";
import { useProductDetail } from "../../../hooks/products";
import BackBtn from "../../../components/BackBtn";

export function FormEditTitle() {
  const { id } = useParams();

  const queryProduct = useProductDetail(id as string);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (queryProduct.isSuccess) {
      setTitle(queryProduct.data.data.title);
    }
  }, [queryProduct.isSuccess]);

  return (
    <div>
      <BackBtn title="Editar nombre producto" />

      <div className="px-5">
        <Input
          label="Nombre producto"
          variant="ui"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>
  );
}
