"use server";
import BreadCrumbs from "@/components/breadcrumb/breadcrumbs";
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
  return (
    <>
      <BreadCrumbs />
      <div className="product-display-container flex justify-around">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-details">
          <h1>{product.title}</h1>
          <p>{product.price}</p>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
3;
