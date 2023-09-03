import { Layout } from "../../components";
import { ButtonCategory } from "../../components/Search";
import { Button, Text } from "../../ui";

export default function Root() {
  return (
    <Layout>
      <div className="p-5">
        <Text className="text-2xl text-@sura-primary-900">
          Buscar
        </Text>

        <div className="mt-4 relative">
          <input
            placeholder="Buscar"
            className="pl-4 border-2 border-@sura-primary-100 rounded-md shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.08)] bg-white h-[54px] w-full focus-visible:outline-@sura-primary-700"
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
