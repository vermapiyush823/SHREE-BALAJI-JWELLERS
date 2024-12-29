"use client";
import BreadCrumbs from "@/components/breadcrumb/breadcrumbs";
import ProductDisplay from "@/components/container/productDisplay/productDisplay";
import { useEffect, useState } from "react";

interface ProductPageProps {
  params: {
    product: string;
    id: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { id } = params;
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {product && (
        <>
          <BreadCrumbs productName={product.title} />
          <ProductDisplay product={product} />
        </>
      )}
    </>
  );
};

export default ProductPage;
