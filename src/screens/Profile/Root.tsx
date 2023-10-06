import { useNavigate } from "react-router-dom";

// import { LineLoader } from "../../components/Loader";
import { Layout } from "../../components";
// import { useUser } from "../../hooks/user";

import SettingIcon from "../../assets/icons/settings-icon.svg";
// import VerifiedIcon from "../../assets/icons/verified-icon.svg";
import { Text } from "../../ui";

export default function Root() {
  const navigate = useNavigate();
  // const { queryUser } = useUser();

  return (
    <Layout>
      <div className="p-5">
        <div className="flex py-5 items-center justify-between">
          <div>
            <Text className="text-4xl text-@sura-primary-900">
              {/* {queryUser.data?.fullname ? (
                <>
                  <span className="block mb-2">
                    {queryUser.data.fullname.split(" ")[0]}
                  </span>
                  <span className="block">
                    {queryUser.data.fullname.split(" ")[1]}
                  </span>
                </>
              ) : (
                <div></div>
              )} */}
            </Text>
          </div>

          <button
            onClick={() => navigate("/settings")}
            className="self-start z-20 top-5 focus:ring-1 focus:ring-offset-2 right-5 w-12 h-12 bg-transparent border-@sura-primary-900 border rounded-md grid place-items-center"
          >
            <img src={SettingIcon} alt="" />
          </button>
        </div>
      </div>

      {/* <div className="relative h-[120px] bg-[url('https://shorturl.at/xzJU2')]"></div>

      <div className="relative">
        <div className="px-5 pb-5 -translate-y-[45px]">
          <button className="mb-2 w-[90px] h-[90px] shadow-md shadow-@sura-primary-500/10 bg-white rounded-md grid place-items-center">
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

          {queryUser.isLoading ? (
            <div className="h-7 flex items-center">
              <LineLoader width={120} height={16} />
            </div>
          ) : (
            <div className="flex items-center gap-1 ">
              <p className="text-xl font-medium text-@sura-primary-900">
                {queryUser.data.fullname ? (
                  queryUser.data.fullname
                ) : (
                  <div></div>
                )}
              </p>
              <div>
                <img src={VerifiedIcon} alt="" />
              </div>
            </div>
          )}
          {queryUser.isLoading ? (
            <div className="h-6 flex items-center">
              <LineLoader width={90} height={14} />
            </div>
          ) : (
            <p className="text-@sura-primary-400">
              @{queryUser.data.username}
            </p>
          )}
        </div>
      </div> */}
    </Layout>
  );
}
