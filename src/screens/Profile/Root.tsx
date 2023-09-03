import { useNavigate } from "react-router-dom";

import { LineLoader } from "../../components/Loader";
import { Layout } from "../../components";
import { useUser } from "../../hooks/user";

import SettingIcon from "../../assets/icons/settings-icon.svg";
import VerifiedIcon from "../../assets/icons/verified-icon.svg";

export default function Root() {
  const navigate = useNavigate();
  const { queryUser } = useUser();

  return (
    <Layout>
      <div className="relative h-[120px] bg-[url('https://shorturl.at/xzJU2')]">
        <button
          onClick={() => navigate("/home")}
          className="absolute top-5 focus:ring-1 focus:ring-offset-2 left-5 w-12 h-12 bg-@sura-primary-900 rounded-md grid place-items-center"
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.75153 5.97482L6.78349 1.94286C6.99562 1.72946 7.11469 1.44078 7.11469 1.13988C7.11469 0.838981 6.99562 0.550307 6.78349 0.336906C6.67761 0.230152 6.55163 0.145419 6.41284 0.0875946C6.27404 0.0297705 6.12517 0 5.97482 0C5.82446 0 5.67559 0.0297705 5.5368 0.0875946C5.398 0.145419 5.27203 0.230152 5.16615 0.336906L0.336906 5.16615C0.230152 5.27203 0.145419 5.398 0.0875951 5.5368C0.029771 5.67559 0 5.82446 0 5.97482C0 6.12517 0.029771 6.27404 0.0875951 6.41284C0.145419 6.55163 0.230152 6.67761 0.336906 6.78349L5.16615 11.6697C5.27257 11.7752 5.39879 11.8588 5.53756 11.9154C5.67633 11.9721 5.82492 12.0008 5.97482 12C6.12471 12.0008 6.27331 11.9721 6.41208 11.9154C6.55085 11.8588 6.67706 11.7752 6.78349 11.6697C6.99562 11.4563 7.11469 11.1676 7.11469 10.8667C7.11469 10.5658 6.99562 10.2771 6.78349 10.0637L2.75153 5.97482Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => navigate("/settings")}
          className="z-20 absolute top-5 focus:ring-1 focus:ring-offset-2 right-5 w-12 h-12 bg-transparent border-@sura-primary-900 border rounded-md grid place-items-center"
        >
          <img src={SettingIcon} alt="" />
        </button>

        <div className="px-5 pb-5 -translate-y-6">
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
      </div>
    </Layout>
  );
}
