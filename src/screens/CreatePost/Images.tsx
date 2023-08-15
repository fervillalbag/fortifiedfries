import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CameraIcon, TrashIcon } from "@radix-ui/react-icons";
import { v4 as uuid } from "uuid";

import { HeaderLoader } from "../../components";
import { DotStep } from "../../components/Auth";
import { Layout } from "../../components/CreatePost";
import { useHeight, useLocalStorageState } from "../../hooks";
import { Button, buttonVariants } from "../../ui";

import CreatePostHeader from "../../assets/images/create-post-images.png";
import { client } from "../../../supabase/client";
import { NURA_AUTH_USER_INFO } from "../../utils/constants/auth";

interface FileList {
  readonly length: number;
  item(index: number): File | null;
  [index: number]: File;
}

export default function Images() {
  const navigate = useNavigate();
  const styleHeight = useHeight();
  const [files, setFiles] = useState<FileList | null>(null);

  const [value] = useLocalStorageState({
    key: NURA_AUTH_USER_INFO,
  });

  const buttonImgRef: any = useRef(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const uploadFiles = async () => {
    if (!files) return;

    const file = files[0];

    const { data, error } = await client.storage
      .from(import.meta.env.VITE_BUCKET_NAME)
      .upload(`${value.id}/${uuid()}`, file, {});

    if (error) {
      console.error("Error uploading file:", error.message);
    } else if (data) {
      console.log("File uploaded:", data.path);
    }

    // for (let i = 0; i < files.length; i++) {}
  };

  const handleNext = () => {
    uploadFiles();
    // navigate("/create-post-hashtag");
  };

  return (
    <div style={styleHeight}>
      <div className="h-full">
        <HeaderLoader imgCmp={CreatePostHeader} />

        <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
          <Layout>
            <h3 className="mb-3 text-lg text-@sura-primary-900">
              Imagenes
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <input
                type="file"
                multiple
                ref={buttonImgRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                className="grid content-center place-items-center h-24 w-full rounded-md border border-@sura-primary-600"
                onClick={() => buttonImgRef.current.click()}
              >
                <CameraIcon className="w-5 h-5 text-@sura-primary-700" />
                <p className="text-sm text-@sura-primary-600 mt-1">
                  Agregar
                </p>
              </button>

              <div className="relative">
                <button className="absolute top-2 right-2 w-8 rounded-md text-white h-8 bg-red-500 grid place-items-center">
                  <TrashIcon className="w-5 h-5" />
                </button>

                <img
                  src="/images/bg-register-fullname.jpg"
                  alt=""
                  className="w-full h-24 rounded-md object-cover"
                />
              </div>
            </div>
          </Layout>

          <div>
            <DotStep value={5} count={7} />
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
