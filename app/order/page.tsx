import { photoProducts } from "@/data/photo";
import { videoProducts } from "@/data/video";
import { spinProducts } from "@/data/3d-spin";
import { OrderForm } from "@/components/Order/OrderForm";
import { ServicePreviewCard } from "@/components/Order/ServicePreviewCard";
import uaLocale from "@/locales/ua.json";

// Об'єднаний список усіх послуг для пошуку за id з URL.
// Якщо в проєкті вже є власний data/products.ts з таким же об'єднаним списком —
// просто заміни ці три імпорти й рядок нижче на імпорт звідти.
const allProducts = [...photoProducts, ...videoProducts, ...spinProducts];

interface OrderPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function OrderPage({ searchParams }: OrderPageProps) {
  const { service } = await searchParams;
  const selectedProduct = service
    ? allProducts.find((product) => product.id === service)
    : undefined;

  const t = uaLocale.order;

  return (
    <section>
      <div className="container max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="mb-4">
            {selectedProduct ? t.titleWithService : t.titleDefault}
          </h1>
          <p className="text-text-muted">
            {selectedProduct ? t.subtitleWithService : t.subtitleDefault}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {selectedProduct && <ServicePreviewCard product={selectedProduct} />}

          <OrderForm
            defaultService={
              selectedProduct
                ? {
                    id: selectedProduct.id,
                    title: selectedProduct.title,
                    price: selectedProduct.price,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </section>
  );
}
