import { Layout } from "../../components";
import SettingIcon from "../../assets/icons/settings-icon.svg";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();

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
    </Layout>
  );
}
