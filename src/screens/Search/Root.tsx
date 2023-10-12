import { useEffect, useRef, useState } from "react";

import { Layout } from "../../components";
import { ButtonCategory } from "../../components/Search";
import { CardProduct } from "../../components/Home";
import { Text } from "../../ui";
import { useProductSearch } from "../../hooks/products/useProduct";

export default function Root() {
  const [searchText, setSearchText] = useState<string>("");
  const { queryProduct } = useProductSearch(searchText);
  const product = queryProduct.data?.data;

  const inputRef = useRef<any>(null);
  const lengthOfProducts = product ? product.length : 0;

  useEffect(() => {
    if (searchText === "") return;
    localStorage.setItem("@SURA_VALUE_SEARCH", searchText);
  }, [searchText]);

  useEffect(() => {
    const valueOfSearch = localStorage.getItem("@SURA_VALUE_SEARCH");
    setSearchText(valueOfSearch || "");
  }, []);

  return (
    <Layout>
      <div className="flex p-5 items-center">
        <div className="relative w-full">
          <button
            onClick={() => inputRef.current.focus()}
            className="absolute top-1/2 -translate-y-1/2 left-3"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5451 14.6625L17.9864 17.1025C18.1002 17.2204 18.1632 17.3782 18.1618 17.5421C18.1603 17.706 18.0946 17.8627 17.9787 17.9786C17.8629 18.0945 17.7061 18.1602 17.5422 18.1616C17.3784 18.1631 17.2205 18.1001 17.1026 17.9862L14.6614 15.545C13.0661 16.9118 11.0034 17.6076 8.90612 17.4863C6.80887 17.3651 4.8401 16.4363 3.41291 14.8948C1.98573 13.3532 1.21108 11.3189 1.25151 9.21851C1.29194 7.11815 2.14431 5.11509 3.62976 3.62964C5.11521 2.14419 7.11827 1.29181 9.21863 1.25138C11.319 1.21095 13.3534 1.98561 14.8949 3.41279C16.4364 4.83998 17.3652 6.80875 17.4865 8.906C17.6077 11.0032 16.9119 13.0659 15.5451 14.6612V14.6625ZM9.3751 16.25C11.1985 16.25 12.9471 15.5257 14.2365 14.2363C15.5258 12.947 16.2501 11.1983 16.2501 9.37498C16.2501 7.55162 15.5258 5.80293 14.2365 4.51362C12.9471 3.22431 11.1985 2.49998 9.3751 2.49998C7.55174 2.49998 5.80305 3.22431 4.51374 4.51362C3.22443 5.80293 2.5001 7.55162 2.5001 9.37498C2.5001 11.1983 3.22443 12.947 4.51374 14.2363C5.80305 15.5257 7.55174 16.25 9.3751 16.25Z"
                fill="#6D7179"
              />
            </svg>
          </button>

          {searchText.length > 0 && (
            <button
              className="absolute top-1/2 -translate-y-1/2 right-3"
              onClick={() => {
                localStorage.setItem("@SURA_VALUE_SEARCH", "");
                inputRef.current.focus();
                setSearchText("");
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4099 12L17.7099 7.71C17.8982 7.5217 18.004 7.2663 18.004 7C18.004 6.7337 17.8982 6.47831 17.7099 6.29C17.5216 6.1017 17.2662 5.99591 16.9999 5.99591C16.7336 5.99591 16.4782 6.1017 16.2899 6.29L11.9999 10.59L7.70994 6.29C7.52164 6.1017 7.26624 5.99591 6.99994 5.99591C6.73364 5.99591 6.47824 6.1017 6.28994 6.29C6.10164 6.47831 5.99585 6.7337 5.99585 7C5.99585 7.2663 6.10164 7.5217 6.28994 7.71L10.5899 12L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L11.9999 13.41L16.2899 17.71C16.3829 17.8037 16.4935 17.8781 16.6154 17.9289C16.7372 17.9797 16.8679 18.0058 16.9999 18.0058C17.132 18.0058 17.2627 17.9797 17.3845 17.9289C17.5064 17.8781 17.617 17.8037 17.7099 17.71C17.8037 17.617 17.8781 17.5064 17.9288 17.3846C17.9796 17.2627 18.0057 17.132 18.0057 17C18.0057 16.868 17.9796 16.7373 17.9288 16.6154C17.8781 16.4936 17.8037 16.383 17.7099 16.29L13.4099 12Z"
                  fill="#80838A"
                />
              </svg>
            </button>
          )}

          <input
            ref={inputRef}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar"
            className="pl-10 h-[54px] w-full bg-@sura-primary-100/60 rounded-md text-@sura-primary-500 placeholder:text-@sura-primary-500 focus-visible:outline-@sura-primary-100/50"
          />
        </div>
      </div>

      <div className="px-5">
        {queryProduct.isLoading && searchText !== "" ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full h-[208px] bg-@sura-primary-200 rounded-md animate-pulse"></div>
            <div className="w-full h-[208px] bg-@sura-primary-200 rounded-md animate-pulse"></div>
            <div className="w-full h-[208px] bg-@sura-primary-200 rounded-md animate-pulse"></div>
            <div className="w-full h-[208px] bg-@sura-primary-200 rounded-md animate-pulse"></div>
          </div>
        ) : queryProduct.isError ? (
          <div>Ocurrio un error</div>
        ) : lengthOfProducts === 0 && searchText.length >= 1 ? (
          <div>No se encontraron resultados</div>
        ) : product && searchText.length >= 1 ? (
          <div className="grid grid-cols-2 gap-4">
            {product.map((product: any, index: number) => (
              <CardProduct
                index={index}
                key={product._id}
                width="full"
                title={product.title}
                currency={product.currency.value}
                id={product._id}
                images={product.images}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          searchText.length === 0 && (
            <div>
              <div className="grid grid-cols-2 gap-6">
                <button className="focus:ring-1 focus:ring-@sura-primary-200 focus:ring-offset-2 flex gap-x-3 items-center justify-center w-full rounded-md h-16 border-2 border-@sura-primary-200">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 13.125C7.5 12.9592 7.56585 12.8003 7.68306 12.6831C7.80027 12.5658 7.95924 12.5 8.125 12.5H11.875C12.0408 12.5 12.1997 12.5658 12.3169 12.6831C12.4342 12.8003 12.5 12.9592 12.5 13.125C12.5 13.2908 12.4342 13.4497 12.3169 13.5669C12.1997 13.6842 12.0408 13.75 11.875 13.75H8.125C7.95924 13.75 7.80027 13.6842 7.68306 13.5669C7.56585 13.4497 7.5 13.2908 7.5 13.125ZM5 9.375C5 9.20924 5.06585 9.05027 5.18306 8.93306C5.30027 8.81585 5.45924 8.75 5.625 8.75H14.375C14.5408 8.75 14.6997 8.81585 14.8169 8.93306C14.9342 9.05027 15 9.20924 15 9.375C15 9.54076 14.9342 9.69973 14.8169 9.81694C14.6997 9.93415 14.5408 10 14.375 10H5.625C5.45924 10 5.30027 9.93415 5.18306 9.81694C5.06585 9.69973 5 9.54076 5 9.375ZM2.5 5.625C2.5 5.45924 2.56585 5.30027 2.68306 5.18306C2.80027 5.06585 2.95924 5 3.125 5H16.875C17.0408 5 17.1997 5.06585 17.3169 5.18306C17.4342 5.30027 17.5 5.45924 17.5 5.625C17.5 5.79076 17.4342 5.94973 17.3169 6.06694C17.1997 6.18415 17.0408 6.25 16.875 6.25H3.125C2.95924 6.25 2.80027 6.18415 2.68306 6.06694C2.56585 5.94973 2.5 5.79076 2.5 5.625Z"
                      fill="#595D67"
                    />
                  </svg>

                  <Text className="text-xl font-medium text-@sura-primary-900">
                    Filtrar
                  </Text>
                </button>
                <button className="focus:ring-1 focus:ring-@sura-primary-200 focus:ring-offset-2 flex gap-x-3 items-center justify-center w-full rounded-md h-16 border-2 border-@sura-primary-200">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.575 11.9083L9.99999 15.4917L6.42499 11.9083C6.26807 11.7514 6.05524 11.6633 5.83333 11.6633C5.61141 11.6633 5.39858 11.7514 5.24166 11.9083C5.08474 12.0653 4.99658 12.2781 4.99658 12.5C4.99658 12.7219 5.08474 12.9348 5.24166 13.0917L9.40833 17.2583C9.48579 17.3364 9.57796 17.3984 9.67951 17.4408C9.78106 17.4831 9.88998 17.5048 9.99999 17.5048C10.11 17.5048 10.2189 17.4831 10.3205 17.4408C10.422 17.3984 10.5142 17.3364 10.5917 17.2583L14.7583 13.0917C14.836 13.014 14.8977 12.9217 14.9397 12.8202C14.9818 12.7187 15.0034 12.6099 15.0034 12.5C15.0034 12.3901 14.9818 12.2813 14.9397 12.1798C14.8977 12.0783 14.836 11.986 14.7583 11.9083C14.6806 11.8306 14.5884 11.769 14.4869 11.727C14.3853 11.6849 14.2765 11.6633 14.1667 11.6633C14.0568 11.6633 13.948 11.6849 13.8465 11.727C13.7449 11.769 13.6527 11.8306 13.575 11.9083ZM6.42499 8.09168L9.99999 4.50834L13.575 8.09168C13.6525 8.16978 13.7446 8.23178 13.8462 8.27409C13.9477 8.31639 14.0566 8.33818 14.1667 8.33818C14.2767 8.33818 14.3856 8.31639 14.4871 8.27409C14.5887 8.23178 14.6809 8.16978 14.7583 8.09168C14.8364 8.01421 14.8984 7.92204 14.9407 7.82049C14.983 7.71894 15.0048 7.61002 15.0048 7.50001C15.0048 7.39 14.983 7.28108 14.9407 7.17953C14.8984 7.07798 14.8364 6.98581 14.7583 6.90834L10.5917 2.74168C10.5142 2.66357 10.422 2.60157 10.3205 2.55927C10.2189 2.51696 10.11 2.49518 9.99999 2.49518C9.88998 2.49518 9.78106 2.51696 9.67951 2.55927C9.57796 2.60157 9.48579 2.66357 9.40833 2.74168L5.24166 6.90834C5.16396 6.98604 5.10233 7.07828 5.06028 7.1798C5.01823 7.28132 4.99658 7.39013 4.99658 7.50001C4.99658 7.72193 5.08474 7.93476 5.24166 8.09168C5.39858 8.2486 5.61141 8.33675 5.83333 8.33675C6.05524 8.33675 6.26807 8.2486 6.42499 8.09168Z"
                      fill="#595D67"
                    />
                  </svg>

                  <Text className="text-xl font-medium text-@sura-primary-900">
                    Buscar
                  </Text>
                </button>
              </div>

              <div>
                <Text className="text-xl mt-4 text-@sura-primary-900">
                  Categorias
                </Text>
                <div className="grid grid-cols-2 gap-5 mt-3">
                  <ButtonCategory
                    title="Tecnologia"
                    subtitle="300 productos"
                  />
                  <ButtonCategory
                    title="Tecnologia"
                    subtitle="300 productos"
                  />
                  <ButtonCategory
                    title="Tecnologia"
                    subtitle="300 productos"
                  />
                  <ButtonCategory
                    title="Tecnologia"
                    subtitle="300 productos"
                  />
                  <ButtonCategory
                    title="Tecnologia"
                    subtitle="300 productos"
                  />
                  <ButtonCategory
                    title="Tecnologia"
                    subtitle="300 productos"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}
