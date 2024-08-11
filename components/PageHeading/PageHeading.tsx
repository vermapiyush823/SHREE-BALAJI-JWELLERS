"use client";
import { useParams } from "next/navigation";
const PageHeading = () => {
  const { jwellery_type } = useParams();
  return (
    <div className="w-full flex justify-center">
      <h1 className="text-[50px] font-bold capitalize text-center text-gray-800">
        {jwellery_type} Jewellery
      </h1>
    </div>
  );
};
export default PageHeading;
