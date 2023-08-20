import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BtnBack from "../../components/BtnBack";
import { Text } from "../../ui";
import { client } from "../../../supabase/client";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [errorProduct, setErrorProduct] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!id) {
        console.log("Pagina no encontrada");
        return;
      }

      const { data: product, error } = await client
        .from("Product")
        .select("*")
        .eq("id", +id)
        .single();

      if (error) {
        console.log("No se encontro el producto con id", id);
        setErrorProduct(error);
        return;
      }

      setProduct(product);
    })();
  }, []);

  if (!product && !errorProduct) {
    return <div className="p-5">cargando..</div>;
  }

  return (
    <div className="p-5">
      <div className="flex items-center gap-4">
        <BtnBack onClick={() => navigate(-1)} />
        <Text className="text-@sura-primary-900 text-[22px] font-medium">
          {product.title}
        </Text>
      </div>
    </div>
  );
}
