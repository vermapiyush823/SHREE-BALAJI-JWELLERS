import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
const ProductCard = () => {
  const product = {
    name: "Diamond Ring",
    price: "1,00,000",
    image:
      "https://static.malabargoldanddiamonds.com/media/catalog/product/cache/1/thumbnail/433x/0dc2d03fe217f8c83829496872af24a0/f/r/frpdgen22369.jpg",
    review: 5000,
  };
  return (
    <div
      className="product-card
        shadow-md
        
    border-black border-[1px] rounded-[10px] p-1 w-fit"
    >
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={100}
        className="w-[300px] object-cover hover:scale-95"
      />
      <div className="flex flex-col  gap-1 p-2 mx-auto w-[95%] border-t border-black ">
        <h2 className="text-[18px]  text-gray-800">{product.name}</h2>
        <p
          className=" font-[gilroy-medium] 
            text-gray-800
            font-bold
        text-[16px] "
        >
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
    </div>
  );
};
export default ProductCard;
