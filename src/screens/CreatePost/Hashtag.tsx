import { useNavigate } from "react-router-dom";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { useHeight } from "../../hooks";
import { HeaderLoader } from "../../components";
import { DotStep } from "../../components/Auth";
import { Button, Input, buttonVariants } from "../../ui";

import CreatePostHeader from "../../assets/images/create-post-tag.png";
import { Layout } from "../../components/CreatePost";

const tags = [
  "prendas",
  "pantalones",
  "violeta",
  "mujeres",
  "invierno",
  "asuncion",
];

export default function Hashtag() {
  const navigate = useNavigate();
  const styleHeight = useHeight();

  const handleNext = () => {
    navigate("/create-post-price");
  };

  return (
    <div style={styleHeight}>
      <div className="h-full">
        <HeaderLoader imgCmp={CreatePostHeader} />

        <div className="flex flex-col justify-between px-5 py-7 h-[calc(100%_-_200px)]">
          <Layout>
            <h3 className="mb-3 text-lg text-@sura-primary-900">
              Etiquetas
            </h3>

            <div className="flex items-center gap-3">
              <Input placeholder="" />
              <Button
                className={buttonVariants({
                  variant: "outline",
                  className: "w-auto px-4",
                })}
              >
                <PlusCircledIcon className="w-6 h-6 text-@sura-primary-900" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {tags.map((tag) => (
                <div
                  className="px-4 py-[7px] rounded-md border-2 border-@sura-primary-200"
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
          </Layout>

          <div>
            <DotStep value={6} count={7} />
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
