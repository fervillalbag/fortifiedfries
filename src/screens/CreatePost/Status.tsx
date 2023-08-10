import * as RadioGroup from "@radix-ui/react-radio-group";
import { useNavigate } from "react-router-dom";

import { useHeight } from "../../hooks";
import { Button, buttonVariants } from "../../ui";
import { DotStep } from "../../components/Auth";
import { HeaderLoader } from "../../components";

import CreatePostHeader from "../../assets/images/create-post-status.png";

export default function Status() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  return (
    <div style={styleHeight}>
      <div className="h-full">
        <HeaderLoader imgCmp={CreatePostHeader} />

        <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
          <div>
            <h3 className="mb-3 text-lg text-@sura-primary-900">
              Estado del producto
            </h3>

            <RadioGroup.Root
              className="flex flex-col gap-2.5"
              defaultValue="default"
              aria-label="View density"
            >
              <div className="flex items-center">
                <RadioGroup.Item
                  className="bg-white border border-@sura-primary-300 w-[25px] h-[25px] rounded-full hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none cursor-default"
                  value="used"
                  id="r1"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-@sura-primary-900" />
                </RadioGroup.Item>
                <label
                  className="text-@sura-primary-600 text-[15px] leading-none pl-[12px]"
                  htmlFor="r1"
                >
                  Usado
                </label>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item
                  className="bg-white border border-@sura-primary-300 w-[25px] h-[25px] rounded-full hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none cursor-default"
                  value="new"
                  id="r2"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-@sura-primary-900" />
                </RadioGroup.Item>
                <label
                  className="text-@sura-primary-600 text-[15px] leading-none pl-[12px]"
                  htmlFor="r2"
                >
                  Nuevo
                </label>
              </div>

              <div className="flex items-center">
                <RadioGroup.Item
                  className="bg-white border border-@sura-primary-300 w-[25px] h-[25px] rounded-full hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none cursor-default"
                  value="almost_new"
                  id="r2"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-@sura-primary-900" />
                </RadioGroup.Item>
                <label
                  className="text-@sura-primary-600 text-[15px] leading-none pl-[12px]"
                  htmlFor="r2"
                >
                  Semi-nuevo
                </label>
              </div>
            </RadioGroup.Root>
          </div>

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
