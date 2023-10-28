import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

import BackBtn from "../../../components/BackBtn";
import { useProductDetail } from "../../../hooks/products";
import { useHeight } from "../../../hooks";
import { Button, Input } from "../../../ui";
import { updateProduct } from "../../../services";

type FormData = {
  title: string;
};

export function FormEditTitle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const styleHeight = useHeight();
  const queryProduct = useProductDetail(id as string);

  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit, control, reset } = useForm<FormData>();

  useEffect(() => {
    if (queryProduct.isSuccess) {
      reset({ title: queryProduct.data.data.title });
    }
  }, [queryProduct.isSuccess]);

  const handleUpdateTitle: SubmitHandler<FieldValues> = async (
    data
  ) => {
    if ("title" in data) {
      try {
        setLoading(true);
        const response = await updateProduct(id as string, data);

        if (response.status === 200) {
          toast.success("Titulo actualizado");
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

  return (
    <div style={styleHeight}>
      <BackBtn title="Editar titulo" />

      <form
        onSubmit={handleSubmit(handleUpdateTitle)}
        className="px-5 flex flex-col justify-between h-[calc(100%_-_85px)] pb-5"
      >
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              label="Titulo del producto"
              variant="ui"
              // ref={field.ref}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Button isLoading={loading} type="submit">
          Guardar cambios
        </Button>
      </form>
    </div>
  );
}
