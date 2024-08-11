// "use server";
import ProductCard from "@/components/card/product_card/product_card";
import { getAllProducts } from "@/lib/actions/product.actions";
const ProductContainer = () => {
  const Products = getAllProducts();
  return (
    <>
      <div
        className="mx-auto w-[95%]
      flex-wrap gap-[20px]
      flex justify-start pl-8 p-6"
      >
        {Products.map((product) => (
          <ProductCard
            title={product.title}
            price={product.price}
            image={product.image}
            type={product.type}
            subType={product.subType}
            weight={product.weight}
            purity={product.purity}
            review={product.review}
            rating={product.rating}
            key={product._id}
            _id={product._id}
          />
        ))}
      </div>
    </>
  );
};
export default ProductContainer;
