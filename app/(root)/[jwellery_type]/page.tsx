"use client";
import BreadCrumbs from "@/components/breadcrumb/breadcrumbs";
import ProductCard from "@/components/card/[product_card]/product_card";
import { useParams } from "next/navigation";
const JewelleryPage = () => {
  const { jwellery_type } = useParams();
  return (
    <>
      <div className="w-full flex justify-center">
        <h1 className="text-[50px] font-bold capitalize text-center text-gray-800">
          {jwellery_type} Jewellery
        </h1>
      </div>
      <BreadCrumbs />
      <div className="mx-auto w-[95%] flex justify-between p-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
};

export default JewelleryPage;
