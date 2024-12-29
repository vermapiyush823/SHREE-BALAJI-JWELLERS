"use client";
import Heart from "@/assets/icons/Heart.svg";
import HeartFilled from "@/assets/icons/HeartFilled.svg";
import StarEmpty from "@/assets/icons/StarEmpty.svg";
import StarFilled from "@/assets/icons/StarFilled.svg";
import StarHalfFilled from "@/assets/icons/StarHalf.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ... (keep the previous interfaces)

const ProductCard = ({ user, product }: any) => {
  const [rating, setRating] = useState(product.rating);
  const [isWishlisted, setWishlisted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="relative w-[280px] sm:w-[320px] bg-white rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? "0 10px 20px rgba(0,0,0,0.15)"
          : "0 4px 6px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Wishlist Button */}
      {!user ? (
        <Link
          href="/sign-in"
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full
            transform hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          <Image
            src={isWishlisted ? HeartFilled : Heart}
            alt="Heart"
            width={24}
            height={24}
            className="transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </Link>
      ) : (
        <button
          title="Add to Wishlist"
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full
            transform hover:scale-110 transition-all duration-300 ease-in-out
            hover:bg-rose-50"
          onClick={() => setWishlisted(!isWishlisted)}
        >
          <Image
            src={isWishlisted ? HeartFilled : Heart}
            alt="Heart"
            width={24}
            height={24}
            className={`transition-all duration-300 ease-in-out 
              ${isWishlisted ? "scale-110" : "scale-100"}`}
          />
        </button>
      )}

      {/* Product Link */}
      <Link href={`/${product.type}/${product._id}`} className="group block">
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square">
          <Image
            src={product.image[0]}
            alt={product.title}
            fill
            className="object-cover transform group-hover:scale-105 
              transition-transform duration-500 ease-in-out"
            sizes="(max-width: 320px) 100vw, 320px"
          />
          {/* Discount Badge - if needed */}
          {product.price > 1000 && (
            <div
              className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 
              rounded-full text-sm font-medium"
            >
              20% OFF
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h2
            className="font-semibold text-lg text-gray-800 line-clamp-2 
            group-hover:text-gray-500 transition-colors duration-300"
          >
            {product.title}
          </h2>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              {product.stone
                ? (product.price + product.stonePrice).toLocaleString("en-IN")
                : product.price.toLocaleString("en-IN")}
            </span>
            {product.price > 1000 && (
              <span className="text-sm text-gray-500 line-through">
                ₹{(product.price * 1.2).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Product Specs */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            {product.weight && (
              <span className="px-2 py-1 bg-gray-100 rounded-full">
                {product.weight}g
              </span>
            )}
            {product.purity && (
              <span className="px-2 py-1 bg-gray-100 rounded-full">
                {product.purity}K
              </span>
            )}
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                <div
                  key={star}
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <Image
                    src={
                      rating >= star
                        ? StarFilled
                        : rating > star - 1
                        ? StarHalfFilled
                        : StarEmpty
                    }
                    alt="Star"
                    width={18}
                    height={18}
                    className="inline-block"
                  />
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.noOfReview.toLocaleString()} Reviews)
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
