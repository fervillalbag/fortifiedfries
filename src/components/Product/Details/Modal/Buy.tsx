import { useState } from "react";
import toast from "react-hot-toast";
import { m } from "framer-motion";

import { Button } from "../../../../ui";
import { createTicket, updateProduct } from "../../../../services";
import { useNavigate } from "react-router-dom";
import { useSaleStatus } from "../../../../hooks/sale-status";

interface InfoToCreateTicket {
  vendor: string;
  buyer: string;
  product: string;
  status: string;
}

interface ModalBuyProps {
  show: boolean;
  setShow: (value: boolean) => void;
  infoToCreateTicket: InfoToCreateTicket;
}

export default function ModalBuy({
  show,
  setShow,
  infoToCreateTicket,
}: ModalBuyProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const { data: saleStatus } = useSaleStatus("sold out");

  const createTicketFn = async () => {
    try {
      setLoading(true);

      await createTicket(infoToCreateTicket);
      await updateProduct(infoToCreateTicket.product, {
        saleStatus: saleStatus._id,
      });

      toast.success("Compra realizada!");
      navigate("/tickets");
    } catch (error: any) {
      toast.error("Ha ocurrido un problema. Intentalo de nuevo");
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {show && (
        <div
          className={`fixed w-screen h-screen bg-neutral-950/50 left-0 top-0 z-40`}
          onClick={() => {
            console.log("hello");
            setShow(false);
          }}
        ></div>
      )}

      {show && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="p-5 z-50 bg-white shadow-md shadow-neutral-400/70 rounded-md fixed bottom-4 left-4 w-[calc(100%_-_32px)]"
        >
          <h3 className="text-2xl font-bold text-@sura-primary-900">
            Desea comprar este producto?
          </h3>

          <p className="text-@sura-primary-400 mt-2">
            Confirme si desea finalizar la compra
          </p>

          <div className="flex mt-3 items-center gap-x-3">
            <Button
              isLoading={loading}
              className="h-14"
              onClick={createTicketFn}
            >
              Si, comprar
            </Button>
            <Button
              className="h-14"
              variant="outline"
              onClick={() => setShow(false)}
            >
              Cancelar
            </Button>
          </div>
        </m.div>
      )}
    </>
  );
}
