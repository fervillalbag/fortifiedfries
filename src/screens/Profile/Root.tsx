import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LineLoader } from "../../components/Loader";
import { Layout } from "../../components";
import { client } from "../../../supabase/client";

import SettingIcon from "../../assets/icons/settings-icon.svg";
import AvatarDefault from "../../assets/images/avatar-default.png";
import VerifiedIcon from "../../assets/icons/verified-icon.svg";

export default function Root() {
  const navigate = useNavigate();
  const [userInfo, setInfoUser] = useState<any>(null);

  const getUser = async () => {
    const { data, error } = await client.auth.getUser();

    if (!data.user) {
      console.log("Usuario no encontrado");
      return;
    }

    const { data: dataUser } = await client
      .from("Personal")
      .select("*")
      .eq("email", data?.user.email)
      .single();

    if (error) return;
    setInfoUser(dataUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout>
      <div className="relative h-[120px] bg-[url('https://shorturl.at/xzJU2')]">
        <button
          onClick={() => navigate("/settings")}
          className="absolute top-5 focus:ring-1 focus:ring-offset-2 right-5 w-12 h-12 bg-@sura-primary-900 rounded-md grid place-items-center"
        >
          <img src={SettingIcon} alt="" />
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-5 -top-[50px]">
          <img
            src={AvatarDefault}
            alt=""
            className="w-[100px] h-[100px] object-cover rounded-full"
          />

          <div className="mt-2">
            {!userInfo?.fullname ? (
              <LineLoader />
            ) : (
              <div className="flex items-center gap-1 ">
                <p className="text-xl font-medium text-@sura-primary-900">
                  {userInfo?.fullname ? (
                    userInfo?.fullname
                  ) : (
                    <div></div>
                  )}
                </p>
                <div>
                  <img src={VerifiedIcon} alt="" />
                </div>
              </div>
            )}
            {!userInfo?.username ? (
              <LineLoader />
            ) : (
              <p className="text-@sura-primary-400">
                @{userInfo?.username}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* <ToastUI /> */}
    </Layout>
  );
}
