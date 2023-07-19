interface IModalLogin {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function ModalLogin({ show, setShow }: IModalLogin) {
  return (
    <div className={`${show ? "block" : "hidden"}`}>
      <div
        className={`fixed w-screen h-screen bg-black bg-opacity-60 left-0 top-0 z-10`}
        onClick={() => setShow(false)}
      />

      <div className="h-auto py-5 w-[calc(100%_-_40px)] left-5 bg-white fixed z-20 bottom-5 rounded-md shadow-lg">
        hello login
      </div>
    </div>
  );
}
