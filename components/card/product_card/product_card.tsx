"use client";
import Heart from "@/assets/icons/Heart.svg";
import HeartFilled from "@/assets/icons/HeartFilled.svg";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  type: string;
  subType: string;
  weight: number;
  purity: number;
  review: number;
  rating: number;
}
const ProductCard = (product: Product) => {
  // const product = {
  //   name: "Diamond Ring",
  //   price: "1,00,000",
  //   image:
  //     "https://static.malabargoldanddiamonds.com/media/catalog/product/cache/1/thumbnail/433x/0dc2d03fe217f8c83829496872af24a0/f/r/frpdgen22369.jpg",
  //   review: 5000,
  //   id: 1,
  // };
  const [isWishlisted, setWishlisted] = useState(false);
  return (
    <div
      className="product-card shadow-md relative border-black border-[1px] rounded-[10px] p-1 w-fit hover:shadow-xl shadow-gray-300 hover:shadow-gray-300
    transition-shadow duration-500 ease-in-out cursor-pointer
    "
    >
      <button
        title="Add to Wishlist"
        className="flex absolute justify-end items-center top-4 z-[100] right-4"
        onClick={() => setWishlisted(!isWishlisted)}
      >
        {isWishlisted ? (
          <Image src={HeartFilled} alt="HeartFilled" width={30} height={30} />
        ) : (
          <Image src={Heart} alt="Heart" width={30} height={30} />
        )}
      </button>
      <Link
        href={`/product/${product._id}`}
        as={`/product/${product.title.replace(/ /g, "-")}`}
      >
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={100}
          className="w-[300px] object-cover overflow-hidden hover:scale-95 transition-transform duration-500 ease-in-out"
        />

        <div className="flex flex-col  gap-1 p-2 mx-auto w-[95%] border-t border-black ">
          <h2 className="text-[18px]  text-gray-800">{product.title}</h2>
          <p className=" font-[gilroy-medium] text-gray-800 font-bold text-[16px] ">
            ₹{product.price}/-
          </p>
          <div className="flex mt-1 items-center gap-2">
            <StarFilledIcon className="text-yellow-500 scale-150" />
            <StarFilledIcon className="text-yellow-500 scale-150" />
            <StarFilledIcon className="text-yellow-500 scale-150" />
            <StarFilledIcon className="text-yellow-500 scale-150" />
            <StarFilledIcon className="text-yellow-500 scale-150" />
            <p className="text-gray-500">({product.review} Reviews)</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
