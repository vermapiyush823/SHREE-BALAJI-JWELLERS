"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Gemstone from "../../assets/images/Gemstone.jpg";
import Diamond from "../../assets/images/diamond-jwellery.jpg";
import GoldBanner from "../../assets/images/gold-jewellery.jpg";
import PlatinumBanner from "../../assets/images/platinum.jpg";
const PageHeading = () => {
  const { product } = useParams();
  const jwellery_type = product;
  const [jwellery_image, setJwelleryImage] = useState(GoldBanner);
  useEffect(() => {
    if (jwellery_type === "diamond") {
      setJwelleryImage(Diamond);
    } else if (jwellery_type === "gemstone") {
      setJwelleryImage(Gemstone);
    } else if (jwellery_type === "platinum") {
      setJwelleryImage(PlatinumBanner);
    }
  }, [jwellery_type]);
  return (
    <div className="w-full h-fit flex justify-center mt-[-4px] relative">
      <Image
        src={jwellery_image}
        alt="Gold Banner"
        width={1000}
        height={500}
        className="object-cover w-full h-[230px] "
      />
      <h1 className="text-[45px] ml-7 top-[35%] left-[45%] absolute font-[gilroy-light] capitalize text-gray-500">
        {jwellery_type} Jewellery
      </h1>
    </div>
  );
};
export default PageHeading;
