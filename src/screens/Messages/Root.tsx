import { Layout } from "../../components";
import { Text } from "../../ui";

export default function Root() {
  return (
    <Layout>
      <div className="p-5">
        <Text className="text-2xl text-@sura-primary-900">
          Mensajes
        </Text>
      </div>
    </Layout>
  );
}
