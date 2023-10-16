import { m } from "framer-motion";
import { Button } from "../../../../ui";

interface ModalBuyProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function ModalBuy({ show, setShow }: ModalBuyProps) {
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
            <Button className="h-14">Si, comprar</Button>
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
