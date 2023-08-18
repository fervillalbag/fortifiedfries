import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CameraIcon, TrashIcon } from "@radix-ui/react-icons";

import { HeaderLoader } from "../../components";
import { DotStep } from "../../components/Auth";
import { Layout } from "../../components/CreatePost";
import { useHeight, useLocalStorageState } from "../../hooks";
import { Button, buttonVariants } from "../../ui";

import CreatePostHeader from "../../assets/images/create-post-images.png";
import { SURA_CREATE_POST_INFO } from "../../utils/constants";

const ItemImage = ({ url }: any) => {
  return (
    <img
      src={url}
      alt=""
      className="w-full h-full object-cover rounded-md"
    />
  );
};

export default function Images() {
  const navigate = useNavigate();
  const styleHeight = useHeight();
  const [files, setFiles] = useState<any>(null);

  const [_, handleUpdate] = useLocalStorageState({
    key: SURA_CREATE_POST_INFO,
  });

  const buttonImgRef: any = useRef(null);
  const [previewURLs, setPreviewURLs] = useState<any>(null);

  const handleFileChange = (event: any) => {
    if (event.target.files) {
      setFiles(event.target.files);

      const urls = Array.from(event.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );
      setPreviewURLs(urls);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    const formData = new FormData();

    let arrayImages: any = [];

    for (let i = 0; i < files.length; i++) {
      formData.append(`file`, files[i]);
      formData.append("upload_preset", "posts_product");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dabmtejzr/image/upload",
          formData
        )
        .then(async (res) => {
          const imageUploaded = await res?.data.secure_url;
          arrayImages.push(imageUploaded);
        })
        .catch((error) => console.log(error));
    }

    handleUpdate({ images: arrayImages });
  };

  const handleNext = async () => {
    await handleUpload();
    navigate("/create-post-hashtag");
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

              {previewURLs &&
                previewURLs.map((url: any, index: number) => (
                  <div key={index} className="relative h-24">
                    <button className="absolute top-2 right-2 w-8 rounded-md text-white h-8 bg-red-500 grid place-items-center">
                      <TrashIcon className="w-5 h-5" />
                    </button>

                    <ItemImage url={url} />
                  </div>
                ))}
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
