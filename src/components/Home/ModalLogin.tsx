import { useNavigate } from "react-router-dom";
import { Button } from "../../ui";

interface IModalLogin {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function ModalLogin({ show, setShow }: IModalLogin) {
  const navigate = useNavigate();

  return (
    <div className={`${show ? "block" : "hidden"}`}>
      <div
        className={`fixed w-screen h-screen bg-black bg-opacity-60 left-0 top-0 z-30`}
        onClick={() => setShow(false)}
      />

      <div className="h-auto w-[calc(100%_-_32px)] left-4 p-5 bg-white fixed z-50 bottom-5 rounded-md shadow-lg">
        <h3 className="text-center text-3xl text-@sura-primary-900 font-bold">
          Inicia sesion
        </h3>

        <p className="text-center text-@sura-primary-400 mt-3">
          Para comprar, guardar o vender un producto, inicia sesión o
          regístrate ahora. ¡No te pierdas estas opciones y
          beneficios!
        </p>

        <div className="mt-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            Iniciar ahora
          </Button>
        </div>
      </div>
    </div>
  );
}
