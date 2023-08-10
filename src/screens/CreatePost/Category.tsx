import React from "react";
import { useNavigate } from "react-router-dom";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import classnames from "classnames";

import { useHeight } from "../../hooks";
import { HeaderLoader } from "../../components";
import { DotStep } from "../../components/Auth";
import { Button, buttonVariants } from "../../ui";

import CreatePostHeader from "../../assets/images/create-post-category.png";

interface SelectItemProps
  extends React.ComponentPropsWithRef<typeof Select.Item> {
  children: React.ReactNode;
  className?: string;
}

const SelectItem: React.FC<SelectItemProps> = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          "text-base leading-none mb-2 text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default function Category() {
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
          <div>
            <Select.Root>
              <Select.Trigger
                className="text-@sura-primary-600 w-full inline-flex items-center justify-between rounded px-[15px] text-lg leading-none h-14 gap-[5px] bg-white text-violet11 border border-@sura-primary-300 hover:bg-mauve3 data-[placeholder]:text-violet9 outline-none"
                aria-label="Food"
              >
                <Select.Value placeholder="Seleccione una categoria" />
                <Select.Icon className="text-violet11">
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="overflow-hidden pt-2 pb-1 bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                  <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="p-[5px]">
                    <Select.Group>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">
                        Blueberry
                      </SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">
                        Pineapple
                      </SelectItem>
                      <SelectItem value="carrot">Carrot</SelectItem>
                      <SelectItem value="berry">Berry</SelectItem>
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div>
            <DotStep value={3} count={7} />
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => navigate(-1)}
                className={buttonVariants({
                  variant: "outline",
                })}
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
