import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { m } from "framer-motion";
import { NumericFormat } from "react-number-format";

import BtnBack from "../../components/BtnBack";
import Loader from "../../components/Product/Details/Loader";
import { DetailsSeller, ModalBuy } from "../../components/Product";
import { transitionLayoutPage } from "../../utils/animation";
import { useProductDetail } from "../../hooks/products";
import { Button, Text, textVariants } from "../../ui";
import { AuthenticatedContext } from "../../context";
import { useLocalStorageState } from "../../hooks";
import { SURA_CREDENTIALS } from "../../utils/constants";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [{ id: userId }] = useLocalStorageState({
    key: SURA_CREDENTIALS,
  });

  console.log(userId);

  const { user } = useContext(AuthenticatedContext);

  const [showModalBuy, setShowModalBuy] = useState<boolean>(false);
  const [principalImageSelected, setPrincipalImageSelected] =
    useState<string>("");

  // const queryProductDetail = useProductDetail(id as string);
  const queryProductDetail = id ? useProductDetail(id) : null;

  useEffect(() => {
    if (
      !queryProductDetail ||
      queryProductDetail.isLoading ||
      queryProductDetail.isError
    ) {
      return;
    }

    const { data } = queryProductDetail;

    if (data?.data && data.data.images.length > 0) {
      setPrincipalImageSelected(data.data.images[0]);
    }
  }, [queryProductDetail?.isSuccess]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (queryProductDetail?.isLoading) {
    return <Loader />;
  }

  if (queryProductDetail?.isError) {
    return <div>error</div>;
  }

  const product = queryProductDetail?.data.data;

  const infoToCreateTicket = {
    vendor: product?.owner._id,
    buyer: user?._id,
    product: product?._id,
    status: "pending",
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitionLayoutPage}
      className="p-5"
    >
      {showModalBuy && (
        <ModalBuy
          infoToCreateTicket={infoToCreateTicket}
          show={showModalBuy}
          setShow={setShowModalBuy}
        />
      )}

      <div className="grid gap-x-4 grid-cols-[max-content_1fr] items-center justify-between px-5 shadow-[0px_-4px_6px_0px_rgba(0,_0,_0,_0.10)] w-screen fixed bottom-0 left-0 bg-white h-[90px]">
        {userId === product.owner._id ? (
          <Button
            variant="outline"
            className="h-12 w-[146px]"
            onClick={() => navigate(`/product/edit/${product._id}`)}
          >
            Editar
          </Button>
        ) : (
          <Button
            className="h-12 w-[146px]"
            onClick={() => setShowModalBuy(true)}
          >
            Comprar
          </Button>
        )}

        <div className="flex flex-col items-end">
          <div className="relative w-full">
            <div className="flex justify-end absolute top-0 right-0 bg-transparent z-10 w-full h-full" />
            <NumericFormat
              className="text-right text-xl w-full font-bold text-@sura-primary-800"
              prefix={`${product.currency.value} `}
              value={product.price}
              thousandSeparator={true}
            />
          </div>
          <Text className="text-right text-sm">
            San Lorenzo, Sinalco
          </Text>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <BtnBack onClick={() => navigate(-1)} />
        <Text className="text-@sura-primary-900 text-[22px] font-medium">
          {product.title}
        </Text>
      </div>

      <div className="mt-5">
        <div className="relative">
          {product.images.map(
            (image: string) =>
              image === principalImageSelected && (
                <img
                  key={image}
                  src={principalImageSelected}
                  alt=""
                  className={`h-[360px] w-full object-cover object-center rounded-sm ${
                    image === principalImageSelected
                      ? "opacity-100 block"
                      : "opacity-0 hidden"
                  }`}
                />
              )
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
          {product.images.map((image: string) => (
            <button
              key={image}
              onClick={() => setPrincipalImageSelected(image)}
              className={`relative z-[50] ring-offset-2 w-full ring-[3px] rounded-sm overflow-hidden ${
                principalImageSelected === image
                  ? "ring-@sura-primary-800"
                  : "ring-transparent"
              }`}
            >
              <img
                src={image}
                alt=""
                className={`w-full h-[110px] object-cover rounded-sm `}
              />
            </button>
          ))}
        </div>

        <div className="py-5">
          <Text
            className={textVariants({
              variant: "subtitle",
              className: "mb-2 text-2xl border-b pb-1",
            })}
          >
            Descripción
          </Text>

          <ReactMarkdown className="product-description text-@sura-primary-400">
            {product.description}
          </ReactMarkdown>
        </div>

        <div className="py-5">
          <div>
            <Text
              className={textVariants({
                variant: "subtitle",
                className: "mb-2 text-2xl border-b pb-1",
              })}
            >
              Detalles de seguridad
            </Text>
          </div>

          <div className="mt-5">
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0001 2.93329C12.5162 2.93329 13.7826 1.75172 13.9333 0.274996C13.9471 0.137498 13.7958 0 13.6584 0C13.584 7.38414e-05 13.5103 0.0140646 13.4411 0.0412495C13.4319 0.0449161 12.474 0.412494 11.0001 0.412494C9.52608 0.412494 8.56634 0.0458327 8.55901 0.0412495C8.4809 0.0140753 8.3988 0.000133788 8.3161 0H8.31335C8.27908 0.00181577 8.24551 0.0103753 8.21456 0.0251882C8.18361 0.040001 8.15589 0.060776 8.13298 0.0863225C8.11008 0.111869 8.09244 0.141685 8.08107 0.174061C8.06971 0.206437 8.06485 0.240737 8.06677 0.274996C8.22031 1.74897 9.48758 2.93329 11.0001 2.93329Z"
                    fill="#6D7179"
                  />
                  <path
                    d="M21.509 2.65374L15.5833 0.579358C15.5579 0.570506 15.5309 0.567338 15.5042 0.57008C15.4774 0.572821 15.4516 0.581405 15.4286 0.595223C15.4055 0.609041 15.3858 0.627755 15.3708 0.650042C15.3558 0.672328 15.3459 0.697641 15.3417 0.72419C15.1703 1.75133 14.6401 2.68437 13.8454 3.35738C13.0508 4.03039 12.0432 4.39973 11.0018 4.39973C9.96048 4.39973 8.95288 4.03039 8.15823 3.35738C7.36358 2.68437 6.83338 1.75133 6.66194 0.72419C6.65792 0.697199 6.64792 0.671447 6.63268 0.648811C6.61744 0.626176 6.59734 0.607228 6.57384 0.59335C6.55035 0.579472 6.52405 0.571014 6.49687 0.568594C6.46969 0.566173 6.44231 0.569851 6.41673 0.579358L0.491029 2.65374C0.325173 2.71181 0.18568 2.82749 0.0979438 2.97975C0.0102075 3.13201 -0.019938 3.3107 0.0129949 3.48332L0.775192 7.51659C0.804525 7.67032 0.882272 7.81064 0.997063 7.91702C1.11185 8.0234 1.25767 8.09026 1.41318 8.10783L3.65348 8.36083C3.74493 8.37114 3.82916 8.41547 3.88945 8.485C3.94973 8.55454 3.98166 8.64421 3.97889 8.7362L3.64294 19.7773C3.63849 19.9196 3.67555 20.0601 3.74962 20.1817C3.82368 20.3033 3.93153 20.4007 4.06002 20.462C4.16682 20.5103 4.28291 20.5345 4.4001 20.5331H17.5999C17.7171 20.5345 17.8332 20.5103 17.94 20.462C18.0685 20.4007 18.1763 20.3033 18.2504 20.1817C18.3244 20.0601 18.3615 19.9196 18.3571 19.7773L18.0211 8.7362C18.0183 8.64421 18.0503 8.55454 18.1106 8.485C18.1708 8.41547 18.2551 8.37114 18.3465 8.36083L20.5868 8.10783C20.7423 8.09026 20.8881 8.0234 21.0029 7.91702C21.1177 7.81064 21.1955 7.67032 21.2248 7.51659L21.987 3.48332C22.0199 3.3107 21.9898 3.13201 21.9021 2.97975C21.8143 2.82749 21.6748 2.71181 21.509 2.65374Z"
                    fill="#6D7179"
                  />
                </svg>
                <Text className="font-bold text-@sura-primary-900">
                  Estado
                </Text>
              </div>
              <Text className="mt-1">
                El producto se encuentra{" "}
                {product.status === "new"
                  ? "nuevo"
                  : product.status === "used"
                  ? "usado"
                  : "semi nuevo"}
                .
              </Text>
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2">
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.1 0H20.9C21.1917 0 21.4715 0.115892 21.6778 0.322183C21.8841 0.528472 22 0.808262 22 1.1V18.7C22 18.9917 21.8841 19.2715 21.6778 19.4778C21.4715 19.6841 21.1917 19.8 20.9 19.8H1.1C0.808262 19.8 0.528472 19.6841 0.322183 19.4778C0.115892 19.2715 0 18.9917 0 18.7V1.1C0 0.808262 0.115892 0.528472 0.322183 0.322183C0.528472 0.115892 0.808262 0 1.1 0ZM7.15 12.1V14.3H9.9V16.5H12.1V14.3H13.2C13.9293 14.3 14.6288 14.0103 15.1445 13.4945C15.6603 12.9788 15.95 12.2793 15.95 11.55C15.95 10.8207 15.6603 10.1212 15.1445 9.60546C14.6288 9.08973 13.9293 8.8 13.2 8.8H8.8C8.65413 8.8 8.51424 8.74205 8.41109 8.63891C8.30795 8.53576 8.25 8.39587 8.25 8.25C8.25 8.10413 8.30795 7.96424 8.41109 7.86109C8.51424 7.75795 8.65413 7.7 8.8 7.7H14.85V5.5H12.1V3.3H9.9V5.5H8.8C8.07065 5.5 7.37118 5.78973 6.85546 6.30546C6.33973 6.82118 6.05 7.52065 6.05 8.25C6.05 8.97935 6.33973 9.67882 6.85546 10.1945C7.37118 10.7103 8.07065 11 8.8 11H13.2C13.3459 11 13.4858 11.0579 13.5889 11.1611C13.6921 11.2642 13.75 11.4041 13.75 11.55C13.75 11.6959 13.6921 11.8358 13.5889 11.9389C13.4858 12.0421 13.3459 12.1 13.2 12.1H7.15Z"
                    fill="#6D7179"
                  />
                </svg>

                <Text className="font-bold text-@sura-primary-900">
                  Metodo de pago
                </Text>
              </div>
              <Text className="mt-1">
                Transferencia bancaria y efectivo.
              </Text>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.6 12.1H15.4C15.7117 12.1 15.9731 11.9944 16.1843 11.7832C16.3955 11.572 16.5007 11.3109 16.5 11C16.5 10.6883 16.3944 10.4269 16.1832 10.2157C15.972 10.0045 15.7109 9.89927 15.4 9.9H6.6C6.28833 9.9 6.0269 10.0056 5.8157 10.2168C5.6045 10.428 5.49927 10.6891 5.5 11C5.5 11.3117 5.6056 11.5731 5.8168 11.7843C6.028 11.9955 6.28907 12.1007 6.6 12.1ZM11 22C9.47833 22 8.04833 21.7111 6.71 21.1332C5.37167 20.5553 4.2075 19.7718 3.2175 18.7825C2.2275 17.7925 1.44393 16.6283 0.8668 15.29C0.289667 13.9517 0.000733333 12.5217 0 11C0 9.47833 0.288933 8.04833 0.8668 6.71C1.44467 5.37167 2.22823 4.2075 3.2175 3.2175C4.2075 2.2275 5.37167 1.44393 6.71 0.8668C8.04833 0.289667 9.47833 0.000733333 11 0C12.5217 0 13.9517 0.288933 15.29 0.8668C16.6283 1.44467 17.7925 2.22823 18.7825 3.2175C19.7725 4.2075 20.5564 5.37167 21.1343 6.71C21.7122 8.04833 22.0007 9.47833 22 11C22 12.5217 21.7111 13.9517 21.1332 15.29C20.5553 16.6283 19.7718 17.7925 18.7825 18.7825C17.7925 19.7725 16.6283 20.5564 15.29 21.1343C13.9517 21.7122 12.5217 22.0007 11 22Z"
                    fill="#6D7179"
                  />
                </svg>

                <Text className="font-bold text-@sura-primary-900">
                  Vendedor
                </Text>
              </div>
              <Text className="mt-1">
                El vendedor{" "}
                <span className="font-bold text-@sura-primary-800">
                  {/* {user?.affiliated ? "no" : "si"} */}
                </span>{" "}
                esta verificado.
              </Text>
            </div>
          </div>
        </div>

        <DetailsSeller
          fullname={product?.owner.fullname}
          username={product?.owner.username}
          avatar={product?.owner.avatar}
        />

        <div className="bg-transparent h-[90px]" aria-hidden="true" />
      </div>
    </m.div>
  );
}
