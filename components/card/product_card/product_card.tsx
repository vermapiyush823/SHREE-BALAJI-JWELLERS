"use client";
import Heart from "@/assets/icons/Heart.svg";
import HeartFilled from "@/assets/icons/HeartFilled.svg";
import StarEmpty from "@/assets/icons/StarEmpty.svg";
import StarFilled from "@/assets/icons/StarFilled.svg";
import StarHalfFilled from "@/assets/icons/StarHalf.svg";
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
      <Link href={`/${productProps.product.type}/${productProps.product._id}`}>
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
          <div className="flex mt-1 items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => {
              if (rating >= star) {
                return (
                  <Image
                    key={star}
                    src={StarFilled}
                    alt="Star"
                    width={22}
                    height={22}
                  />
                );
              } else if (rating > star - 1) {
                return (
                  <Image
                    key={star}
                    src={StarHalfFilled}
                    alt="Star"
                    width={22}
                    height={22}
                  />
                );
              } else {
                return (
                  <Image
                    key={star}
                    src={StarEmpty}
                    alt="Star"
                    width={22}
                    height={22}
                  />
                );
              }
            })}

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
