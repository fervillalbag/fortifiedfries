import { useHeight } from "../../hooks";
import { Button, buttonVariants } from "../../ui";
import { DotStep } from "../../components/Auth";

import CreatePostHeader from "../../assets/images/create-post-status.png";
import { useNavigate } from "react-router-dom";
import { HeaderLoader } from "../../components";

export default function Status() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  return (
    <div style={styleHeight}>
      <div className="h-full">
        <HeaderLoader imgCmp={CreatePostHeader} />

        <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
          <div></div>

          <div>
            <DotStep value={2} count={7} />
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => navigate(-1)}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Volver
              </Button>
              <Button>Siguiente</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
