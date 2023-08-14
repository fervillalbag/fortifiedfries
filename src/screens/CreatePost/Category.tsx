import React from "react";
import * as Select from "@radix-ui/react-select";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import classnames from "classnames";
import { Form, Formik } from "formik";

import { useHeight, useLocalStorageState } from "../../hooks";
import { HeaderLoader } from "../../components";
import { DotStep } from "../../components/Auth";
import { Button, Text, buttonVariants } from "../../ui";
import { Layout } from "../../components/CreatePost";

import CreatePostHeader from "../../assets/images/create-post-category.png";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";

interface SelectItemProps
  extends React.ComponentPropsWithRef<typeof Select.Item> {
  children: React.ReactNode;
  className?: string;
}

const validationCategorySchema = yup.object().shape({
  category: yup.string().required("El campo es obligatorio"),
});

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

  const [_, handleUpdate] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
  });

  const handleNext = (values: any) => {
    handleUpdate(values);
    navigate("/create-post-details");
  };

  return (
    <Formik
      initialValues={{ category: "" }}
      validationSchema={validationCategorySchema}
      onSubmit={(values) => handleNext(values)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <Form onSubmit={handleSubmit}>
          <div style={styleHeight}>
            <div className="h-full">
              <HeaderLoader imgCmp={CreatePostHeader} />

              <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
                <Layout>
                  <Select.Root
                    value={values.category}
                    onValueChange={(value) => {
                      handleChange("category")(value);
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
                            <SelectItem value="">
                              Seleccione una categoria
                            </SelectItem>
                            <SelectItem value="banana">
                              Banana
                            </SelectItem>
                            <SelectItem value="blueberry">
                              Blueberry
                            </SelectItem>
                            <SelectItem value="grapes">
                              Grapes
                            </SelectItem>
                            <SelectItem value="pineapple">
                              Pineapple
                            </SelectItem>
                            <SelectItem value="carrot">
                              Carrot
                            </SelectItem>
                            <SelectItem value="berry">
                              Berry
                            </SelectItem>
                          </Select.Group>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>

                  {errors.category && (
                    <Text
                      data-test="register-feedback-error"
                      className="text-red-500 mt-2"
                    >
                      {errors.category as string}
                    </Text>
                  )}
                </Layout>

                <div>
                  <DotStep value={3} count={7} />
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      onClick={() => navigate(-1)}
                      className={buttonVariants({
                        variant: "outline",
                      })}
                    >
                      Volver
                    </Button>
                    <Button type="submit">Siguiente</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
