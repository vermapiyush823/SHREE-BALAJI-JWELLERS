"use client";
import Heart from "@/assets/icons/Heart.svg";
import HeartFilled from "@/assets/icons/HeartFilled.svg";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
interface ProductProps {
  product: {
    title: string;
    price: number;
    image: string;
    type: string;
    subType: string;
    weight: number;
    purity: number;
    review: number;
    rating: number;
    _id: string;
  };
}
const ProductCard = (productProps: ProductProps) => {
  const [rating, setRating] = useState(productProps.product.rating);
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
        href={`/product/${productProps.product._id}`}
        as={`/product/${productProps.product.title.replace(/ /g, "-")}`}
      >
        <Image
          src={productProps.product.image}
          alt={productProps.product.title}
          width={200}
          height={100}
          className="w-[300px] object-cover overflow-hidden hover:scale-95 transition-transform duration-500 ease-in-out"
        />

        <div className="flex flex-col  gap-1 p-2 mx-auto w-[95%] border-t border-black ">
          <h2 className="text-[17px] w-full overflow-hidden text-ellipsis text-nowrap  text-gray-800">
            {productProps.product.title}
          </h2>
          <p className=" font-[gilroy-medium] text-gray-800 font-bold text-[16px] ">
            ₹{productProps.product.price}/-
          </p>
          <div className="flex mt-1 items-center gap-2">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
              <StarFilledIcon
                key={star}
                className={`w-5 h-5 text-yellow-500 ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
            <p className="text-gray-500">
              ({productProps.product.review} Reviews)
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
