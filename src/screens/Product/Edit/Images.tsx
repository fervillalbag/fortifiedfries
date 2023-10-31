import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CameraIcon, TrashIcon } from "@heroicons/react/24/solid";

import BackBtn from "../../../components/BackBtn";
import { axios } from "../../../config";
import { useHeight } from "../../../hooks";
import { useProductDetail } from "../../../hooks/products";
import { Button } from "../../../ui";
import toast from "react-hot-toast";
import { updateProduct } from "../../../services";

const ItemImage = ({ url }: any) => {
  return (
    <div className="item-image-loader">
      <LazyLoadImage
        src={url}
        alt="Imagen"
        className={`w-full h-24 object-cover`}
        placeholderSrc="/images/placeholder-banner-create-post.png"
      />
    </div>
  );
};

export function FormEditImages() {
  const { id } = useParams();
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const queryProduct = useProductDetail(id as string);

  const [files, setFiles] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [previewURLs, setPreviewURLs] = useState<any>(
    queryProduct.data?.data?.images
  );

  const buttonImgRef: any = useRef(null);

  useEffect(() => {
    if (queryProduct.isSuccess) {
      setPreviewURLs(queryProduct.data.data.images);
    }
  }, [queryProduct.isSuccess]);

  useEffect(() => {
    setFiles(null);
  }, []);

  const handleFileChange = (event: any) => {
    if (event.target.files) {
      setFiles(event.target.files);

      const urls = Array.from(event.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );
      setPreviewURLs([...previewURLs, ...urls]);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) return;
    setLoading(true);

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
          console.log({ imageUploaded });

          arrayImages.push(imageUploaded);
          console.log({ arrayImages });
        })
        .catch((error) => console.log(error));
    }

    const imagesToUpdate = [...previewURLs, ...arrayImages];

    if (previewURLs) {
      console.log({ imagesToUpdate });
      setLoading(false);
      return;
    }
  };

  return (
    <div style={styleHeight}>
      <BackBtn title="Editar imagenes" />

      <form className="px-5 flex flex-col h-[calc(100%_-_85px)] justify-between pb-5">
        <div>
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
              type="button"
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
                  <button
                    className="absolute top-2 right-2 w-8 rounded-md text-white h-8 bg-red-500 grid place-items-center"
                    onClick={() => {
                      const urlsFiltered = previewURLs.filter(
                        (item: any) => item !== url
                      );
                      setPreviewURLs(urlsFiltered);
                    }}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>

                  <ItemImage url={url} />
                </div>
              ))}
          </div>
        </div>

        <Button
          type="button"
          isLoading={loading}
          onClick={handleUpload}
        >
          Guardar cambios
        </Button>
      </form>
    </div>
  );
}
