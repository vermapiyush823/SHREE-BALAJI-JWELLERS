"use client";
import Heart from "@/assets/icons/Heart.svg";
import HeartFilled from "@/assets/icons/HeartFilled.svg";
import StarEmpty from "@/assets/icons/StarEmpty.svg";
import StarFilled from "@/assets/icons/StarFilled.svg";
import StarHalfFilled from "@/assets/icons/StarHalf.svg";
import BISLogo from "@/assets/images/BIS.png";
import Image from "next/image";
import { useState } from "react";
import ReviewContainer from "../review/reviewContainer";
interface Review {
  username: string;
  comment: string;
  rating: number;
  imgUrl: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  image: string[];
  type: string;
  subType: string;
  weight: number;
  purity: number;
  noOfReview: number;
  rating: number;
  stone: boolean;
  stoneWeight?: number;
  stonePrice?: number;
  stonePurity?: number;
  stoneType?: string;
  stoneQuantity?: number;
  gender: "Men" | "Women" | "Unisex";
  reviews: Review[];
}

interface ProductDisplayProps {
  product: Product;
}
const ProductDisplay = ({ product }: ProductDisplayProps) => {
  const [imageLink, setImageLink] = useState(product.image[0]);
  const [isWishlisted, setWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Price calculations
  const basePrice = product.price;
  const stoneTotalPrice = product.stone ? product.stonePrice ?? 0 : 0;
  const makingCharges = Math.round(basePrice * 0.3);
  const gst = Math.round(basePrice * 0.18);
  const totalPrice =
    Math.round(basePrice + makingCharges + gst + stoneTotalPrice) * quantity;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Product Header */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery Section */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <button
              title="Add to Wishlist"
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              onClick={() => setWishlisted(!isWishlisted)}
            >
              <Image
                src={isWishlisted ? HeartFilled : Heart}
                alt="Wishlist"
                width={24}
                height={24}
              />
            </button>
            <Image
              src={imageLink}
              alt={product.title}
              width={600}
              height={600}
              className="w-full rounded-2xl object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            {product.image.map((img, index) => (
              <button
                key={index}
                className={`relative rounded-lg overflow-hidden ${
                  imageLink === img ? "ring-2 ring-black" : ""
                }`}
                onClick={() => setImageLink(img)}
              >
                <Image
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full object-cover aspect-square"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                <div
                  key={star}
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <Image
                    src={
                      product.rating >= star
                        ? StarFilled
                        : product.rating > star - 1
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
            <span className="text-sm text-gray-600">
              ({product.noOfReview} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">₹{totalPrice}/-</p>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
          </div>

          {/* Product Details */}
          <div className="mt-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium text-gray-900">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium">{product.subType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Weight</span>
                  <span className="font-medium">{product.weight}g</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Purity</span>
                  <span className="font-medium">{product.purity}%</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Gender</span>
                  <span className="font-medium capitalize">
                    {product.gender}
                  </span>
                </div>
              </div>
            </div>

            {/* Stone Details if applicable */}
            {product.stone && (
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.stoneType} Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Stone Weight</span>
                    <span className="font-medium">{product.stoneWeight}ct</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Quantity</span>
                    <span className="font-medium">
                      {product.stoneQuantity} pcs
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-900">
                Quantity
              </span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-3 py-1 border-x">{quantity}</span>
                <button
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors">
                Buy Now
              </button>
            </div>
          </div>

          {/* Certification */}
          <div className="mt-8 flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Image
              src={BISLogo}
              alt="BIS Certification"
              width={80}
              height={80}
              className="object-contain"
            />
            <p className="text-sm text-gray-600">
              100% Certified International Standard
            </p>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mt-12">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Price Breakdown
        </h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              <tr className="flex justify-between py-2">
                <td className="text-gray-500">Base Price</td>
                <td className="font-medium">₹{basePrice * quantity}/-</td>
              </tr>
              {product.stone && (
                <tr className="flex justify-between py-2">
                  <td className="text-gray-500">{product.stoneType} Price</td>
                  <td className="font-medium">
                    ₹{stoneTotalPrice * quantity}/-
                  </td>
                </tr>
              )}
              <tr className="flex justify-between py-2">
                <td className="text-gray-500">Making Charges</td>
                <td className="font-medium">₹{makingCharges * quantity}/-</td>
              </tr>
              <tr className="flex justify-between py-2">
                <td className="text-gray-500">GST (18%)</td>
                <td className="font-medium">₹{gst * quantity}/-</td>
              </tr>
              <tr className="flex justify-between py-2 font-bold">
                <td>Total</td>
                <td>₹{totalPrice}/-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <ReviewContainer reviews={product.reviews} />
      </div>
    </div>
  );
};

export default ProductDisplay;
