import { useNavigate } from "react-router-dom";

import { HeaderLoader } from "../../components";
import { useHeight } from "../../hooks";
import { DotStep } from "../../components/Auth";
import { Button, buttonVariants } from "../../ui";

import CreatePostHeader from "../../assets/images/create-post-details.png";
import { Layout } from "../../components/CreatePost";

export default function Details() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const handleNext = () => {
    navigate("/create-post-images");
  };

  return (
    <div style={styleHeight}>
      <div className="h-full">
        <HeaderLoader imgCmp={CreatePostHeader} />

        <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
          <Layout>
            <textarea
              name=""
              id=""
              placeholder="Detalles del producto"
              className="p-3 focus-visible:border-@sura-primary-900 focus-visible:outline-transparent resize-none h-64 w-full border-2 border-@sura-primary-200 rounded-md"
            ></textarea>
          </Layout>

          <div>
            <DotStep value={4} count={7} />
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
