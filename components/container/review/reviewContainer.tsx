import StarEmpty from "@/assets/icons/StarEmpty.svg";
import StarFilled from "@/assets/icons/StarFilled.svg";
import StarHalfFilled from "@/assets/icons/StarHalf.svg";
import Image from "next/image";
interface ReviewProps {
  reviews: {
    username: string;
    comment: string;
    rating: number;
    imgUrl: string;
  }[];
}
const ReviewContainer = ({ reviews }: ReviewProps) => {
  return (
    <div className="product-reviews w-[100%] mt-4">
      <h1 className="text-2xl text-center text-gray-800 font-bold">Reviews</h1>
      <div className="flex flex-row">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="flex flex-col  w-full mt-4">
              <div className="flex w-full flex-wrap p-2 border-b-[2px]">
                <Image
                  src={reviews[index].imgUrl}
                  alt="BISLogo"
                  width={24}
                  height={24}
                  className="rounded-full mt-1 border-black h-[33px] w-[33px] "
                />
                <h1 className="text-lg ml-2 self-center text-gray-900 font-bold">
                  {reviews[index].username}{" "}
                </h1>
                <div className="flex ml-auto items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => {
                    if (reviews[index].rating >= star) {
                      return (
                        <Image
                          key={star}
                          src={StarFilled}
                          alt="Star"
                          width={22}
                          height={22}
                        />
                      );
                    } else if (reviews[index].rating > star - 1) {
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
                  <p className="text-md  text-gray-700 font-bold">
                    ({reviews[index].rating}/5)
                  </p>
                </div>
                <p className="text-md text-gray-700 block w-full ml-10">
                  {reviews[index].comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-700 font-bold">
            No reviews available
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewContainer;
