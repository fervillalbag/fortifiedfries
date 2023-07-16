import { Button, Text } from "../../ui";
import { Footer as FooterAuth } from "../../components/Auth";
import { useNavigate } from "react-router-dom";

export default function Photos() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div>
        <div>
          <button className="w-full h-32 bg-@sura-primary-200 grid place-items-center">
            <img src="/icons/camera-icons.svg" alt="" />
          </button>

          <button className="relative z-20 ml-5 -mt-[50px] bg-@sura-primary-200 border border-@sura-primary-400 grid place-items-center w-[100px] h-[100px] rounded-full">
            <img src="/icons/camera-icons.svg" alt="" />
          </button>
        </div>

        <div className="px-5 py-2">
          <Text className="text-xl font-medium text-@sura-primary-900">
            Lucas Lamas
          </Text>
          <Text className="">@lucas_lamas</Text>
        </div>

        <div className="px-5 py-3">
          <div className="flex items-center gap-4">
            <div className="w-28 h-5 bg-@sura-primary-200" />
            <div className="w-28 h-5 bg-@sura-primary-200" />
          </div>

          <div className="grid grid-cols-2 gap-5 mt-5">
            <div>
              <div className="w-full h-40 bg-@sura-primary-200" />
              <div className="mt-1 w-28 h-5 bg-@sura-primary-200" />
              <div className="mt-1 w-20 h-5 bg-@sura-primary-200" />
            </div>
            <div>
              <div className="w-full h-40 bg-@sura-primary-200" />
              <div className="mt-1 w-28 h-5 bg-@sura-primary-200" />
              <div className="mt-1 w-20 h-5 bg-@sura-primary-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid items-end h-full">
        <FooterAuth
          footerText="Ya tienes una cuenta?"
          routeText="Inicia sesion"
          routeLink="/login-email"
          currentStep={2}
          disableFooterText={false}
        >
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="outline"
          >
            Volver
          </Button>
          <Button
            type="submit"
            data-test="register-button-submit"
            onClick={() => navigate("/register-password")}
          >
            Siguiente
          </Button>
        </FooterAuth>
      </div>
    </div>
  );
}
