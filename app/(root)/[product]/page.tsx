"use server";
import BreadCrumbs from "@/components/breadcrumb/breadcrumbs";
import ProductCard from "@/components/card/product_card/product_card";
import Heading from "@/components/PageHeading/PageHeading";
import { getAllProducts } from "@/lib/actions/product.actions";
import { getAuthToken } from "@/lib/getAuthToken";
const JewelleryPage = async () => {
  const user = await getAuthToken();
  const Products = await getAllProducts();
  return (
    <>
      <Heading />
      <BreadCrumbs />
      <div className=" w-[100%] flex-wrap gap-[20px] flex justify-start pl-12 p-6">
        {Products.map((product, index) => (
          <ProductCard
            user={user}
            product={JSON.parse(JSON.stringify(product))}
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default JewelleryPage;
