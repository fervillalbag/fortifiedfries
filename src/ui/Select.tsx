import React, { useState } from "react";
import { m } from "framer-motion";

import { Button, buttonVariants } from "../ui";
import { authStepAnimation } from "../utils/animation";

interface SelectProps {
  options: any;
  value: number | null;
  setValue: (value: number) => void;
  setTextError: (value: string | null) => void;
  handleUpdateForm: (value: any) => any;
  placeholder?: string;
  animation?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  setValue,
  setTextError,
  animation = false,
  placeholder,
  handleUpdateForm,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const itemSelected = options?.data.find(
    (item: any) => item.id === value
  )?.name;

  return (
    <div className="relative">
      {showOptions && (
        <div
          className="fixed w-screen h-screen top-0 left-0"
          onClick={() => setShowOptions(false)}
        />
      )}

      <m.div
        initial={animation ? "hidden" : ""}
        animate={animation ? "visible" : ""}
        exit="exit"
        variants={authStepAnimation}
      >
        <Button
          data-test="register-button-select-gender"
          className={buttonVariants({
            variant: "outline",
            className: `font-normal text-base flex justify-between px-5 ${
              value ? "text@sura-primary" : "text-@sura-text"
            }`,
          })}
          onClick={() => {
            setTextError(null);
            setShowOptions(!showOptions);
          }}
        >
          {!options
            ? "Cargando.."
            : itemSelected
            ? itemSelected === "man"
              ? "Hombre"
              : "Mujer"
            : placeholder}
          <img
            src="/icons/arrow-down.svg"
            alt=""
            className={`${
              showOptions ? "rotate-180" : ""
            } transition-all duration-300`}
          />
        </Button>
      </m.div>

      <div
        className={`border-2 border-b-4 border-@sura-border ${
          !showOptions
            ? "h-0 overflow-hidden opacity-0"
            : "h-max overflow-visible opacity-100"
        } rounded-md absolute top-full mt-4 w-full`}
      >
        {options?.data.map((option: any) => (
          <Button
            data-test="register-button-gender-option"
            key={option.id}
            className={buttonVariants({
              className:
                "h-14 text-lg border-0 bg-white text-@sura-primary-900 justify-start px-5",
            })}
            onClick={() => {
              setValue(option.id);
              setShowOptions(false);
              handleUpdateForm({ gender: +option.id });
            }}
          >
            {option.name === "man" ? "Hombre" : "Mujer"}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Select;
