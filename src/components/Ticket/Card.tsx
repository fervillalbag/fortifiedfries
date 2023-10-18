import { useState } from "react";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";

import { updateTicket } from "../../services";
import { useTicketByUser } from "../../hooks/ticket";
import { useLocalStorageState } from "../../hooks";
import { SURA_CREDENTIALS } from "../../utils/constants";
import { Button, Text } from "../../ui";

export default function Card({ ticket }: any) {
  const [user] = useLocalStorageState({
    key: SURA_CREDENTIALS,
  });

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const queryTickestByUser = useTicketByUser(user.id);

  const colorStatus =
    ticket.status === "pending"
      ? "text-yellow-500"
      : ticket.status === "accepted"
      ? "text-green-500"
      : "text-red-500";

  const handleCancelTicket = async () => {
    setLoading(true);
    try {
      const response = await updateTicket(ticket._id, {
        status: "cancelled",
      });

      if (response.status === 200) {
        toast("Ticket cancelado", {
          icon: "⚠️",
        });
        queryTickestByUser.refetch();
        setShowOptions(false);
        setShowModalConfirm(false);
      }
    } catch (error: any) {
      toast.error("Ha ocurrido un problema");
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Dialog.Root open={showModalConfirm}>
        <Dialog.Portal>
          <Dialog.Overlay
            onClick={() => setShowModalConfirm(false)}
            className="z-[1500] bg-black data-[state=open]:animate-overlayShow fixed inset-0 opacity-50"
          />
          <Dialog.Content className="z-[2000] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Text className="leading-7">
              ¿Esta seguro que desea cancelar la transaccion?
            </Text>

            <div className="flex justify-end gap-x-3 mt-4">
              <Button
                variant="outline"
                className="w-max font-normal text-base px-8 h-[46px]"
                onClick={() => setShowModalConfirm(false)}
              >
                No
              </Button>
              <Button
                isLoading={loading}
                className="ring-2 ring-offset-2 ring-@sura-primary-900 w-max font-normal text-base px-8 h-[46px]"
                onClick={handleCancelTicket}
              >
                Si, cancelar
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {showOptions && (
        <>
          <div
            className="fixed bg-neutral-950/0 top-0 left-0 w-screen h-screen z-[60]"
            onClick={() => setShowOptions(false)}
          ></div>

          <div className="border border-@sura-primary-200 shadow-md shadow-neutral-700/20 z-[70] absolute top-[50px] right-2 w-36 py-2 px-3 bg-white rounded-md">
            <button className="text-@sura-primary-900 w-full text-left text-sm py-1 mb-1 px-1">
              Enviar mensaje
            </button>
            <button
              className="text-@sura-primary-900 w-full text-left text-sm py-1 mb-1 px-1"
              onClick={() => {
                setShowOptions(false);
                setShowModalConfirm(true);
              }}
            >
              Cancelar
            </button>
            <button className="text-@sura-primary-900 w-full text-left text-sm py-1 mb-1 px-1">
              Ayuda
            </button>

            <div className="w-full bg-white h-[1px] opacity-30" />

            <button
              className="text-@sura-primary-900 w-full text-left text-sm py-1 my-1 px-1"
              onClick={() => setShowOptions(false)}
            >
              Cerrar
            </button>
          </div>
        </>
      )}

      <div className="w-full relative text-left rounded-md gap-x-[10px] p-[5px] grid grid-cols-[60px_1fr] border border-@sura-primary-300">
        {ticket.status !== "cancelled" && (
          <button
            className="grid place-items-center absolute w-9 h-9 bg-white border border-@sura-primary-900 rounded-md top-[5px] right-2"
            onClick={() => setShowOptions(true)}
          >
            <svg
              width="18"
              height="4"
              viewBox="0 0 23 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 2.5C5 3.16304 4.73661 3.79893 4.26777 4.26777C3.79893 4.73661 3.16304 5 2.5 5C1.83696 5 1.20107 4.73661 0.732233 4.26777C0.263392 3.79893 0 3.16304 0 2.5C0 1.83696 0.263392 1.20107 0.732233 0.732234C1.20107 0.263393 1.83696 0 2.5 0C3.16304 0 3.79893 0.263393 4.26777 0.732234C4.73661 1.20107 5 1.83696 5 2.5ZM13.75 2.5C13.75 3.16304 13.4866 3.79893 13.0178 4.26777C12.5489 4.73661 11.913 5 11.25 5C10.587 5 9.95107 4.73661 9.48223 4.26777C9.01339 3.79893 8.75 3.16304 8.75 2.5C8.75 1.83696 9.01339 1.20107 9.48223 0.732234C9.95107 0.263393 10.587 0 11.25 0C11.913 0 12.5489 0.263393 13.0178 0.732234C13.4866 1.20107 13.75 1.83696 13.75 2.5ZM22.5 2.5C22.5 3.16304 22.2366 3.79893 21.7678 4.26777C21.2989 4.73661 20.663 5 20 5C19.337 5 18.7011 4.73661 18.2322 4.26777C17.7634 3.79893 17.5 3.16304 17.5 2.5C17.5 1.83696 17.7634 1.20107 18.2322 0.732234C18.7011 0.263393 19.337 0 20 0C20.663 0 21.2989 0.263393 21.7678 0.732234C22.2366 1.20107 22.5 1.83696 22.5 2.5Z"
                fill="#1C2331"
              />
            </svg>
          </button>
        )}

        <div>
          <img
            src={ticket.product.images[0]}
            alt=""
            className="rounded-tl-md rounded-bl-md w-full h-[110px] object-cover"
          />
        </div>

        <div className="flex flex-col justify-between h-full">
          <div>
            <div>
              <h3 className="font-medium text-@sura-primary-900">
                {ticket.product.title}
              </h3>
              <span
                className={`uppercase text-xs font-semibold block ${colorStatus}`}
                // style={{ color: colorStatus }}
              >
                {ticket.status}
              </span>
            </div>

            <div className="mt-[6px] flex items-center pr-1">
              <div className="flex-1">
                <p className="text-xs text-@sura-primary-400">
                  Comprador
                </p>
                <p className="text-xs font-medium text-@sura-primary-900">
                  @{ticket.buyer.username}
                </p>
              </div>
              <div>
                <svg
                  width="41"
                  height="22"
                  viewBox="0 0 41 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.92 10.61L30.92 3.61C30.8434 3.42925 30.7154 3.27503 30.5518 3.16656C30.3882 3.05809 30.1963 3.00016 30 3H27V1C27 0.734784 26.8946 0.48043 26.7071 0.292893C26.5196 0.105357 26.2652 0 26 0H7C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V18C6 18.2652 6.10536 18.5196 6.29289 18.7071C6.48043 18.8946 6.73478 19 7 19H9.14C9.37028 19.8474 9.873 20.5954 10.5706 21.1287C11.2682 21.6621 12.1219 21.951 13 21.951C13.8781 21.951 14.7318 21.6621 15.4294 21.1287C16.127 20.5954 16.6297 19.8474 16.86 19H23.14C23.3703 19.8474 23.873 20.5954 24.5706 21.1287C25.2682 21.6621 26.1219 21.951 27 21.951C27.8781 21.951 28.7318 21.6621 29.4294 21.1287C30.127 20.5954 30.6297 19.8474 30.86 19H33C33.2652 19 33.5196 18.8946 33.7071 18.7071C33.8946 18.5196 34 18.2652 34 18V11C33.9997 10.866 33.9725 10.7333 33.92 10.61ZM27 5H29.34L31.48 10H27V5ZM13 20C12.6044 20 12.2178 19.8827 11.8889 19.6629C11.56 19.4432 11.3036 19.1308 11.1522 18.7654C11.0009 18.3999 10.9613 17.9978 11.0384 17.6098C11.1156 17.2219 11.3061 16.8655 11.5858 16.5858C11.8655 16.3061 12.2219 16.1156 12.6098 16.0384C12.9978 15.9613 13.3999 16.0009 13.7654 16.1522C14.1308 16.3036 14.4432 16.56 14.6629 16.8889C14.8827 17.2178 15 17.6044 15 18C15 18.5304 14.7893 19.0391 14.4142 19.4142C14.0391 19.7893 13.5304 20 13 20ZM23.14 17H16.86C16.6297 16.1526 16.127 15.4046 15.4294 14.8713C14.7318 14.3379 13.8781 14.049 13 14.049C12.1219 14.049 11.2682 14.3379 10.5706 14.8713C9.873 15.4046 9.37028 16.1526 9.14 17H8V2H25V14.56C24.5446 14.8243 24.1459 15.1759 23.8268 15.5946C23.5076 16.0133 23.2742 16.4909 23.14 17ZM27 20C26.6044 20 26.2178 19.8827 25.8889 19.6629C25.56 19.4432 25.3036 19.1308 25.1522 18.7654C25.0009 18.3999 24.9613 17.9978 25.0384 17.6098C25.1156 17.2219 25.3061 16.8655 25.5858 16.5858C25.8655 16.3061 26.2219 16.1156 26.6098 16.0384C26.9978 15.9613 27.3999 16.0009 27.7654 16.1522C28.1308 16.3036 28.4432 16.56 28.6629 16.8889C28.8827 17.2178 29 17.6044 29 18C29 18.5304 28.7893 19.0391 28.4142 19.4142C28.0391 19.7893 27.5304 20 27 20ZM32 17H30.86C30.6389 16.1435 30.1401 15.3845 29.4416 14.8417C28.7432 14.2989 27.8846 14.0029 27 14V12H32V17Z"
                    fill="#1C2331"
                  />
                  <line
                    y1="13.5"
                    x2="10"
                    y2="13.5"
                    stroke="#1C2331"
                  />
                  <line
                    x1="4"
                    y1="10.5"
                    x2="14"
                    y2="10.5"
                    stroke="#1C2331"
                  />
                  <line
                    x1="29"
                    y1="13.5"
                    x2="39"
                    y2="13.5"
                    stroke="#1C2331"
                  />
                  <line
                    x1="35"
                    y1="16.5"
                    x2="41"
                    y2="16.5"
                    stroke="#1C2331"
                  />
                </svg>
              </div>

              <div className="flex-1 flex flex-col items-end">
                <p className="text-xs text-@sura-primary-400">
                  vendedor
                </p>
                <p className="text-xs font-medium text-@sura-primary-900">
                  @{ticket.vendor.username}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 2V5H7.25M9.5 5C9.5 5.59095 9.3836 6.17611 9.15746 6.72208C8.93131 7.26804 8.59984 7.76412 8.18198 8.18198C7.76412 8.59984 7.26804 8.93131 6.72208 9.15746C6.17611 9.3836 5.59095 9.5 5 9.5C4.40905 9.5 3.82389 9.3836 3.27792 9.15746C2.73196 8.93131 2.23588 8.59984 1.81802 8.18198C1.40016 7.76412 1.06869 7.26804 0.842542 6.72208C0.616396 6.17611 0.5 5.59095 0.5 5C0.5 3.80653 0.974106 2.66193 1.81802 1.81802C2.66193 0.974106 3.80653 0.5 5 0.5C6.19347 0.5 7.33807 0.974106 8.18198 1.81802C9.02589 2.66193 9.5 3.80653 9.5 5Z"
                stroke="#80838A"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-xs text-@sura-primary-400">
              hace 2 horas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
