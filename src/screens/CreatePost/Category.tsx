import React, { useState } from "react";
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
import { CategoryProps } from "../../interface";

import CreatePostHeader from "../../assets/images/create-post-category.png";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";
import { useCategories } from "../../hooks/categories";
import { useSubCategories } from "../../hooks/categories/useCategories";

interface SubCategoryProps {
  categoryId: string;
  subCategoryId: string;
  setSubCategoryId: (value: string) => void;
}

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

function SubCategory({
  categoryId,
  subCategoryId,
  setSubCategoryId,
}: SubCategoryProps) {
  const querySubCategories = useSubCategories(categoryId);

  return (
    <div>
      <div className="flex flex-col">
        <h3 className="mb-3 text-@sura-primary-500">Sub Categoria</h3>

        <Select.Root
          value={subCategoryId}
          onValueChange={(value) => {
            setSubCategoryId(value);
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
                  {querySubCategories.isLoading
                    ? null
                    : querySubCategories.data.map(
                        (category: CategoryProps) => (
                          <SelectItem
                            key={category._id}
                            value={category._id}
                            className="text-lg text-@sura-primary-700"
                          >
                            {category.name}
                          </SelectItem>
                        )
                      )}
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}

export default function Category() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const [value, handleUpdate] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
  });

  const [subCategoryId, setSubCategoryId] = useState<string>(
    value.subCategory || ""
  );
  const queryCategories = useCategories();

  const handleNext = (values: { category: string }) => {
    handleUpdate({
      category: values.category,
      subCategory: subCategoryId,
    });
    navigate("/create-post-details");
  };

  return (
    <Formik
      initialValues={{ category: value.category || "" }}
      validationSchema={validationCategorySchema}
      onSubmit={(values) => handleNext(values)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <Form onSubmit={handleSubmit}>
          <div style={styleHeight}>
            <div className="h-full">
              <HeaderLoader imgCmp={CreatePostHeader} />

              <Layout>
                <div>
                  <div className="mb-5">
                    <h3 className="mb-3 text-@sura-primary-500">
                      Categoria
                    </h3>

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
                              <SelectItem
                                value=""
                                className="text-@sura-primary-500"
                              >
                                Seleccione una categoria
                              </SelectItem>
                              {queryCategories.isLoading
                                ? null
                                : queryCategories.data.map(
                                    (category: CategoryProps) => (
                                      <SelectItem
                                        key={category._id}
                                        value={category._id}
                                        className="text-lg text-@sura-primary-700"
                                      >
                                        {category.name}
                                      </SelectItem>
                                    )
                                  )}
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
                  </div>

                  {values.category && (
                    <SubCategory
                      subCategoryId={subCategoryId}
                      setSubCategoryId={setSubCategoryId}
                      categoryId={values.category}
                    />
                  )}
                </div>

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
              </Layout>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
