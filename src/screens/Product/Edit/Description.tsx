import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import BackBtn from "../../../components/BackBtn";
import { useProductDetail } from "../../../hooks/products";
import { useHeight } from "../../../hooks";
import { updateProduct } from "../../../services";
import { Button } from "../../../ui";

type FormData = {
  description: string;
};

export function FormEditDescription() {
  const { id } = useParams();
  const navigate = useNavigate();

  const styleHeight = useHeight();
  const queryProduct = useProductDetail(id as string);

  const [loading, setLoading] = useState<boolean>(false);
  const { reset, handleSubmit, control } = useForm<FormData>();

  useEffect(() => {
    if (queryProduct.isSuccess) {
      reset({ description: queryProduct.data.data.description });
    }
  }, [queryProduct.isSuccess]);

  const handleUpdateDescription: SubmitHandler<FieldValues> = async (
    data
  ) => {
    if ("description" in data) {
      try {
        setLoading(true);
        const response = await updateProduct(id as string, data);

        if (response.status === 200) {
          toast.success("Descripcion actualizada");
          navigate(-1);
        }
      } catch (error) {
        toast.error("Hubo un problema al actualizar");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (queryProduct.isLoading) return <div>Cargando..</div>;
  if (queryProduct.isError) return <div>Hubo un problema..</div>;

  return (
    <div style={styleHeight}>
      <BackBtn title="Editar detalle" />

      <form
        className="px-5 h-[calc(100%_-_85px)] flex flex-col justify-between pb-5"
        onSubmit={handleSubmit(handleUpdateDescription)}
      >
        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <div className="bg-[#eaebeb] rounded-md relative h-[500px]">
              <p className="text-xs font-medium text-@sura-primary-900 pt-[10px] pl-[14px]">
                Detalle del producto
              </p>

              <textarea
                className="bg-transparent h-[calc(100%_-_26px)] resize-none w-full ring-0 outline-none mt-[2px] px-[14px] text-@sura-primary-600"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}
        />

        <Button type="submit" isLoading={loading}>
          Guardar cambios
        </Button>
      </form>
    </div>
  );
}
