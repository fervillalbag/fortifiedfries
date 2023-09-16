import { Layout } from "../../components";
import { Text } from "../../ui";

export default function Root() {
  return (
    <Layout>
      <div className="h-[68px] items-center flex px-5">
        <Text className="text-[26px] text-@sura-primary-900">
          Mensajes
        </Text>
      </div>

      <div className="px-5"></div>
    </Layout>
  );
}
