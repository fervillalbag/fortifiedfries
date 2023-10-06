import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import * as yup from "yup";

import {
  Footer as FooterAuth,
  Header as HeaderAuth,
} from "../../components/Auth";
import { Button, Text } from "../../ui";
import { useHeight, useLocalStorageState } from "../../hooks";
import { SURA_AUTH_REGISTER_INFO } from "../../utils/constants";
import classNames from "classnames";
import { GenderProps } from "../../interface/gender.interface";

const validationGenderSchema = yup.object().shape({
  gender: yup.string().required("El campo es obligatorio"),
});

interface SelectItemProps
  extends React.ComponentPropsWithRef<typeof Select.Item> {
  children: React.ReactNode;
  className?: string;
}

const SelectItem: React.FC<SelectItemProps> = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classNames(
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

const Gender: React.FC = () => {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  // @ts-ignore
  const [allGenders, setAllGenderes] = useState<GenderProps[]>([
    { _id: "1", name: "Hombre" },
    { _id: "2", name: "Mujer" },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const [value, handleUpdate] = useLocalStorageState({
    key: SURA_AUTH_REGISTER_INFO,
  });

  const handleNext = async (values: { gender: string }) => {
    setLoading(true);
    handleUpdate({
      gender: values.gender,
    });
    navigate("/register-username");
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{ gender: value.gender }}
      validationSchema={validationGenderSchema}
      onSubmit={(values) => handleNext(values)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <Form onSubmit={handleSubmit}>
          <div style={styleHeight}>
            <HeaderAuth
              image="/images/bg-register-gender.jpg"
              title=""
              subtitle={`Seleccione su genero`}
            />

            <div className="p-5">
              <Select.Root
                defaultValue={values.gender}
                value={values.gender}
                onValueChange={(value) => {
                  handleChange("gender")(value);
                }}
              >
                <Select.Trigger
                  className="text-@sura-primary-600 w-full inline-flex items-center justify-between rounded px-[15px] text-lg leading-none h-14 gap-[5px] bg-white text-violet11 border-2 border-@sura-primary-200 hover:bg-mauve3 data-[placeholder]:text-violet9 outline-none"
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
                        <SelectItem
                          value=""
                          className="text-@sura-primary-500"
                        >
                          Seleccione una categoria
                        </SelectItem>
                        {allGenders.map((gender) => (
                          <SelectItem
                            key={gender._id}
                            value={gender._id.toString()}
                            className="text-lg text-@sura-primary-700"
                          >
                            {gender.name}
                          </SelectItem>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              {errors.gender && (
                <Text
                  data-test="register-feedback-error"
                  className="text-red-500 mt-2"
                >
                  {errors.gender as string}
                </Text>
              )}

              <FooterAuth
                footerText="Ya tienes una cuenta?"
                routeText="Inicia sesion"
                routeLink="/login"
                currentStep={4}
                count={6}
              >
                <Button
                  type="button"
                  onClick={() => navigate("/register-fullname")}
                  variant="outline"
                >
                  Volver
                </Button>
                <Button
                  type="submit"
                  data-test="register-button-submit"
                  isLoading={loading}
                >
                  Siguiente
                </Button>
              </FooterAuth>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Gender;
