import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { Layout } from "../../components";
import { ButtonCategory } from "../../components/Search";
import { Button, Input, Text, inputVariants } from "../../ui";

export default function Root() {
  return (
    <Layout>
      <div className="p-5">
        <Text className="text-2xl text-@sura-primary-900">
          Buscar
        </Text>

        <div className="mt-3 relative">
          <MagnifyingGlassIcon className="w-6 absolute text-@sura-primary-300 top-1/2 left-4 -translate-y-1/2" />
          <Input
            className={inputVariants({
              variant: "md",
              className: "h-12 pl-12",
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-5">
          <Button sizeIcon="20" icon="sort-icon" variant="icon">
            Ordenar
          </Button>
          <Button sizeIcon="20" icon="filter-icon" variant="icon">
            Filtrar
          </Button>
        </div>

        <div>
          <Text className="text-xl mt-4 text-@sura-primary-900">
            Categorias
          </Text>

          <div className="grid grid-cols-2 gap-5 mt-3">
            <ButtonCategory
              title="Tecnologia"
              subtitle="300 productos"
            />
            <ButtonCategory
              title="Tecnologia"
              subtitle="300 productos"
            />
            <ButtonCategory
              title="Tecnologia"
              subtitle="300 productos"
            />
            <ButtonCategory
              title="Tecnologia"
              subtitle="300 productos"
            />
            <ButtonCategory
              title="Tecnologia"
              subtitle="300 productos"
            />
            <ButtonCategory
              title="Tecnologia"
              subtitle="300 productos"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
