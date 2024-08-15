"use client";
import Heart from "@/assets/icons/Heart.svg";
import HeartFilled from "@/assets/icons/HeartFilled.svg";
import BISLogo from "@/assets/images/BIS.png";
import Image from "next/image";
import { useState } from "react";
interface ProductDisplayProps {
  product: {
    title: string;
    price: number;
    image: string[];
    type: string;
    subType: string;
    weight: number;
    purity: number;
    review: number;
    rating: number;
    _id: string;
    stone: boolean;
    stoneWeight: number;
    stonePurity: number;
    stoneType: string;
    stonePrice: number;
    gender: string;
    stoneQuantity: number;
  };
}
const ProductDisplay = ({ product }: ProductDisplayProps) => {
  const [imageLink, setImageLink] = useState(product.image[0]);
  const [isWishlisted, setWishlisted] = useState(false);
  const basePrice = product.price;
  const stonePrice = product.stonePrice;
  const makingCharges = Math.round(basePrice * 0.3);
  const gst = Math.round(basePrice * 0.18);
  const totalPrice = Math.round(basePrice + makingCharges + gst);
  return (
    <div className="product-display-container gap-4 flex flex-col p-4 px-12">
      <div className="product-display flex gap-4 w-[100%]">
        <div className="relative product-image-container w-[35%] flex flex-col justify-center">
          <button
            title="Add to Wishlist"
            className="flex absolute justify-end items-center top-8 z-[100] right-8"
            onClick={() => setWishlisted(!isWishlisted)}
          >
            {isWishlisted ? (
              <Image
                src={HeartFilled}
                alt="HeartFilled"
                width={30}
                height={30}
              />
            ) : (
              <Image src={Heart} alt="Heart" width={30} height={30} />
            )}
          </button>
          <Image
            src={imageLink}
            alt={product.title}
            width={450}
            height={450}
            className="object-cover rounded-[40px] shadow-md"
          />
          <p className="text-center text-md mt-2">{product.title}</p>
          <ul className="flex justify-center gap-1 mt-4">
            {product.image.map((img, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 
                    hover:border-b-[3px] hover:border-black transition-all ease-in duration-200
                ${imageLink === img ? "border-b-[3px] border-black" : ""}`}
                onClick={() => setImageLink(img)}
              >
                <Image
                  src={img}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="product-details w-[65%] flex flex-col py-3">
          <h1 className="text-xl font-light text-gray-800">{product.title}</h1>
          <p className="text-md text-gray-700 font-bold mt-3">
            Product unique code:{" "}
            <span className="text-gray-500 font-normal">{product._id}</span>
          </p>
          <p className="text-lg text-gray-700 font-bold mt-2">
            ₹{totalPrice}/-{" "}
            <span className="font-normal text-gray-500">
              (inclusive of all taxes)
            </span>
          </p>
          <p className="text-lg text-gray-700 font-bold mt-2">
            Weight:{" "}
            <span className="font-normal text-gray-500">{product.weight}g</span>
          </p>
          <hr className="mt-4 border-t border-black" />
          <div className="flex justify-between mt-4">
            <div className="flex flex-col w-[50%] h-[90%]">
              <h1
                className="text-xl
        
            text-gray-800 font-bold"
              >
                Product price details:
              </h1>
              <table className="table-auto w-[100%] mt-2 border-collapse border-black">
                <tbody>
                  <tr className="bg-gray-100  hover:bg-gray-200 border-b border-black">
                    <td className="text-base text-gray-700 px-3 py-1.5 capitalize">
                      {product.type}
                    </td>
                    <td className="text-base text-gray-700 px-3 py-1.5">
                      ₹{basePrice}/-
                    </td>
                  </tr>
                  {product.stone && (
                    <tr className="hover:bg-gray-200 border-b border-black">
                      <td className="text-base text-gray-700 px-3 py-1.5">
                        {product.stoneType}
                      </td>
                      <td className="text-base text-gray-700 px-3 py-1.5">
                        ₹{stonePrice}/-
                      </td>
                    </tr>
                  )}
                  <tr className="bg-gray-100 hover:bg-gray-200 border-b border-black">
                    <td className="text-base text-gray-700 px-3 py-1.5">
                      Making Charges
                    </td>
                    <td className="text-base text-gray-700 px-3 py-1.5">
                      ₹{makingCharges}/-
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-200 border-b border-black">
                    <td className="text-base text-gray-700 px-3 py-1.5">GST</td>
                    <td className="text-base text-gray-700 px-3 py-1.5">
                      ₹{gst}/-
                    </td>
                  </tr>
                  <tr className="bg-gray-100 hover:bg-gray-200">
                    <td className="text-base text-gray-700 px-3 py-1.5">
                      Total
                    </td>
                    <td className="text-base text-gray-700 px-3 py-1.5">
                      ₹{totalPrice}/-
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex w-[40%] gap-5 align-middle rounded-2xl justify-center ">
              <Image
                src={BISLogo}
                alt="BISLogo"
                width={100}
                height={50}
                className="h-[140px] w-[200px] my-auto border-r-2 border-gray-400 pr-4"
              />
              <h1 className="text-sm text-center p-2 align-middle my-auto text-gray-700 font-bold">
                100% Certified International Standard
              </h1>
            </div>
          </div>
          <div className="btn-container flex  gap-3 mt-10">
            <button
              type="button"
              className="
            bg-[#262626]
            text-[#fff] border-none px-[20px] py-[10px] rounded-[4px] font-[16px] cursor-pointer
            hover:bg-[#444] transition-all ease-in duration-200
            "
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="
            bg-[#262626]
            text-[#fff] border-none px-[20px] py-[10px] rounded-[4px] font-[16px] cursor-pointer
            hover:bg-[#444] transition-all ease-in duration-200
            "
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="product-description w-[100%] mt-4">
        <h1 className="text-2xl text-center text-gray-800 font-bold">
          Product Details
        </h1>
        <div className="flex gap-x-[100px] bg-gray-300 mt-4 p-4 ">
          <div className="flex flex-col w-[15%]">
            <h1 className="text-lg capitalize text-gray-700  font-bold ">
              {product.type} Details
            </h1>
            <div className="mt-2">
              <p className="text-md p-1 flex justify-between border-b capitalize border-gray-400  text-gray-700 font-bold">
                {product.type} Type
                <span className="text-gray-500 capitalize font-normal">
                  {product.subType}
                </span>
              </p>
              <p className="text-md p-1  border-b flex justify-between border-gray-400 text-gray-700 font-bold mt-2">
                Purity
                <span className="text-gray-500 font-normal">
                  {product.purity}%
                </span>
              </p>
              <p className="text-md border-b p-1 flex justify-between border-gray-400 text-gray-700 font-bold mt-2">
                Weight
                <span className="text-gray-500 font-normal">
                  {product.weight}gm
                </span>
              </p>
              <p className="text-md border-b p-1 flex justify-between border-gray-400 text-gray-700 font-bold mt-2">
                Gender
                <span className="text-gray-500 font-normal capitalize">
                  {product.gender}
                </span>
              </p>
            </div>
          </div>
          {product.stone && (
            <div className="flex flex-col w-[15%]">
              <h1 className="text-lg capitalize text-gray-700  font-bold ">
                {product.stoneType} Details
              </h1>
              <div className="mt-2">
                <p className="text-md p-1  border-b flex justify-between border-gray-400 text-gray-700 font-bold mt-2">
                  Purity
                  <span className="text-gray-500 font-normal">
                    {product.stonePurity}%
                  </span>
                </p>
                <p className="text-md border-b p-1 flex justify-between border-gray-400 text-gray-700 font-bold mt-2">
                  Weight
                  <span className="text-gray-500 font-normal">
                    {product.stoneWeight}gm
                  </span>
                </p>
                <p className="text-md border-b p-1 flex justify-between border-gray-400 text-gray-700 font-bold mt-2">
                  Quantity
                  <span className="text-gray-500 font-normal">
                    {product.stoneQuantity}pcs
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDisplay;
