"use server";
import BreadCrumbs from "@/components/breadcrumb/breadcrumbs";
import ProductDisplay from "@/components/container/productDisplay/productDisplay";
import { getProductById } from "@/lib/actions/product.actions";
interface ProductPageProps {
  params: {
    product: string;
    id: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = params;
  const product = await getProductById(id);
  console.log(product.userId);

  return (
    <>
      <BreadCrumbs productName={product.title} />
      <ProductDisplay product={product} />
    </>
  );
};

export default ProductPage;
3;
