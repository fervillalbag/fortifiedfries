import { useNavigate } from "react-router-dom";

import { useHeight } from "../../hooks";
import { Button, Input, buttonVariants } from "../../ui";
import { DotStep } from "../../components/Auth";
import { HeaderLoader } from "../../components";

import CreatePostHeader from "../../assets/images/create-post-name.png";

export default function Name() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const handleNext = () => {
    navigate("/create-post-status");
  };

  return (
    <div style={styleHeight}>
      <div className="h-full">
        <HeaderLoader imgCmp={CreatePostHeader} />

        <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
          <Input placeholder="Nombre del producto" />

          <div>
            <DotStep value={1} count={7} />
            <div className="grid grid-cols-2 gap-4">
              <Button
                className={buttonVariants({
                  variant: "outline",
                })}
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
              <Button onClick={handleNext}>Siguiente</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
