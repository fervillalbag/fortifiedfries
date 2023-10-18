import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LineLoader } from "../../components/Loader";
import { Layout } from "../../components";
import { useGetUser } from "../../hooks/user";
import { getDataFromToken } from "../../helpers";
import { useLocalStorageState } from "../../hooks";
import { SURA_AUTH_TOKEN } from "../../utils/constants/auth";
import { Button, Text } from "../../ui";

import VerifiedIcon from "../../assets/icons/verified-icon.svg";
import { useProductsByUser } from "../../hooks/products";
import { CardProduct, LoaderHome } from "../../components/Home";
import { ProductProps } from "../../interface";

export default function Root() {
  const navigate = useNavigate();

  const [{ token }] = useLocalStorageState({
    key: SURA_AUTH_TOKEN,
  });
  const [viewSelected, setViewSelected] = useState<string>("posts");

  const userCredential: any = getDataFromToken(token);
  const { data, isError, isLoading } = useGetUser(
    "_id",
    userCredential.id as string
  );

  const queryProduct = useProductsByUser(userCredential.id);

  if (isLoading) return <div>cargando..</div>;
  if (isError) return <div>error..</div>;

  return (
    <Layout>
      <div className="relative h-[120px] bg-[url('https://shorturl.at/xzJU2')]">
        <button
          className="absolute top-5 right-5 grid place-items-center w-12 h-12 rounded-md bg-@sura-primary-900"
          onClick={() => navigate("/settings")}
        >
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.57 18L6.21 15.12C6.015 15.045 5.8311 14.955 5.6583 14.85C5.4855 14.745 5.3169 14.6325 5.1525 14.5125L2.475 15.6375L0 11.3625L2.3175 9.6075C2.3025 9.5025 2.295 9.4011 2.295 9.3033V8.6967C2.295 8.5989 2.3025 8.4975 2.3175 8.3925L0 6.6375L2.475 2.3625L5.1525 3.4875C5.3175 3.3675 5.49 3.255 5.67 3.15C5.85 3.045 6.03 2.955 6.21 2.88L6.57 0H11.52L11.88 2.88C12.075 2.955 12.2589 3.045 12.4317 3.15C12.6045 3.255 12.7731 3.3675 12.9375 3.4875L15.615 2.3625L18.09 6.6375L15.7725 8.3925C15.7875 8.4975 15.795 8.5989 15.795 8.6967V9.3033C15.795 9.4011 15.78 9.5025 15.75 9.6075L18.0675 11.3625L15.5925 15.6375L12.9375 14.5125C12.7725 14.6325 12.6 14.745 12.42 14.85C12.24 14.955 12.06 15.045 11.88 15.12L11.52 18H6.57ZM9.09 12.15C9.96 12.15 10.7025 11.8425 11.3175 11.2275C11.9325 10.6125 12.24 9.87 12.24 9C12.24 8.13 11.9325 7.3875 11.3175 6.7725C10.7025 6.1575 9.96 5.85 9.09 5.85C8.205 5.85 7.4586 6.1575 6.8508 6.7725C6.243 7.3875 5.9394 8.13 5.94 9C5.94 9.87 6.2436 10.6125 6.8508 11.2275C7.458 11.8425 8.2044 12.15 9.09 12.15Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      <div className="relative">
        <div className="px-5 pb-5 -mt-[45px]">
          <button className="mb-2 w-[90px] h-[90px] border border-@sura-primary-100 shadow-@sura-primary-500/10 bg-white rounded-md grid place-items-center">
            <svg
              width="23"
              height="32"
              viewBox="0 0 23 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.7059 9.41176C20.7059 6.81224 19.6518 4.45929 17.9501 2.75765C16.2466 1.05412 13.8936 0 11.2941 0C8.69459 0 6.34165 1.05412 4.63812 2.75765C2.93647 4.45929 1.88235 6.81224 1.88235 9.41176C1.88235 12.0113 2.93647 14.3642 4.63812 16.0659C6.34165 17.7694 8.69459 18.8235 11.2941 18.8235C13.8936 18.8235 16.2466 17.7694 17.9501 16.0659C18.8251 15.193 19.519 14.1557 19.992 13.0138C20.4649 11.8719 20.7075 10.6477 20.7059 9.41176ZM0 28.2353C0 30.1176 4.23529 32 11.2941 32C17.9162 32 22.5882 30.1176 22.5882 28.2353C22.5882 24.4706 18.1572 20.7059 11.2941 20.7059C4.23529 20.7059 0 24.4706 0 28.2353Z"
                fill="#1C2331"
              />
            </svg>
          </button>

          {isLoading ? (
            <div className="h-7 flex items-center">
              <LineLoader width={120} height={16} />
            </div>
          ) : (
            <div className="flex items-center gap-1 ">
              <p className="text-xl font-medium text-@sura-primary-900">
                {data.fullname ? data.fullname : <div></div>}
              </p>
              <div>
                <img src={VerifiedIcon} alt="" />
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="h-6 flex items-center">
              <LineLoader width={90} height={14} />
            </div>
          ) : (
            <p className="text-@sura-primary-400">@{data.username}</p>
          )}
        </div>
      </div>

      <div className="px-5">
        <div className="flex w-full gap-x-3 mb-4">
          <Button
            className={`focus:ring-transparent relative font-medium border-0 rounded-none p-0 bg-white w-max h-auto ${
              viewSelected === "posts"
                ? "text-@sura-primary-900"
                : "text-@sura-primary-200"
            }`}
            onClick={() => setViewSelected("posts")}
          >
            <div
              className={`absolute bottom-0 left-0 h-[2px] w-10 bg-@sura-primary-900 ${
                viewSelected === "posts" ? "block" : "hidden"
              }`}
            />
            Productos publicados
          </Button>
          <Button
            className={`focus:ring-transparent relative font-medium border-0 rounded-none p-0 bg-white w-max h-auto ${
              viewSelected === "saves"
                ? "text-@sura-primary-900"
                : "text-@sura-primary-200"
            }`}
            onClick={() => setViewSelected("saves")}
          >
            <div
              className={`absolute bottom-0 left-0 h-[2px] w-10 bg-@sura-primary-900 ${
                viewSelected === "saves" ? "block" : "hidden"
              }`}
            />
            Favoritos
          </Button>
        </div>

        <div className="pb-6">
          {viewSelected === "posts" ? (
            <div className="mt-3">
              {queryProduct.isLoading ? (
                <LoaderHome padding={false} />
              ) : queryProduct.isError ? (
                <div>error</div>
              ) : queryProduct.data.data.length === 0 ? (
                <Text>No existen productos publicados</Text>
              ) : (
                queryProduct.data && (
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4 overflow-x-auto hide-scrollbar">
                    {queryProduct.data.data.map(
                      (product: ProductProps, index: number) => (
                        <CardProduct
                          index={index}
                          key={product._id}
                          width="full"
                          typeAd={0}
                          title={product.title}
                          currency={product.currency.value}
                          id={product._id}
                          images={product.images}
                          price={product.price}
                        />
                      )
                    )}
                  </div>
                )
              )}
            </div>
          ) : (
            <div>favoritos</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
