"use server";
import BreadCrumbs from "@/components/breadcrumb/breadcrumbs";
import ProductCard from "@/components/card/[product_card]/product_card";
import Heading from "@/components/PageHeading/PageHeading";
import { getAllProducts } from "@/lib/actions/product.actions";
const JewelleryPage = async () => {
  const Products = await getAllProducts();
  return (
    <>
      <Heading />
      <BreadCrumbs />
      <div className=" w-[100%] flex-wrap gap-[20px] flex justify-start pl-12 p-6">
        {Products.map((product, index) => (
          <>
            <ProductCard product={product} key={index} />
            <ProductCard product={product} key={index} />
            <ProductCard product={product} key={index} />
            <ProductCard product={product} key={index} />
            <ProductCard product={product} key={index} />
            <ProductCard product={product} key={index} />
            <ProductCard product={product} key={index} />
            <ProductCard product={product} key={index} />
            <ProductCard product={product} key={index} />
            <ProductCard product={product} key={index} />
          </>
        ))}
      </div>
    </>
  );
};

export default JewelleryPage;
