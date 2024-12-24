"use client";
import StarEmpty from "@/assets/icons/StarEmpty.svg";
import StarFilled from "@/assets/icons/StarFilled.svg";
import StarHalfFilled from "@/assets/icons/StarHalf.svg";
import Image from "next/image";
import { useState } from "react";

interface Review {
  username: string;
  comment: string;
  rating: number;
  imgUrl: string;
  createdAt?: string; // Optional timestamp for the review
}

interface ReviewProps {
  reviews: Review[];
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => {
      const starImg =
        rating >= star
          ? StarFilled
          : rating > star - 1
          ? StarHalfFilled
          : StarEmpty;

      return (
        <Image
          key={star}
          src={starImg}
          alt={`${rating} stars`}
          width={20}
          height={20}
          className="transition-transform hover:scale-110"
        />
      );
    })}
    <span className="ml-2 text-sm font-medium text-gray-600">
      ({rating.toFixed(1)}/5)
    </span>
  </div>
);

const ReviewContainer = ({ reviews }: ReviewProps) => {
  const [sortBy, setSortBy] = useState<"recent" | "rating">("recent");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Calculate average rating
  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
      ).toFixed(1)
    : 0;

  // Rating distribution
  const ratingDistribution = reviews.reduce((acc, review) => {
    acc[Math.floor(review.rating)] = (acc[Math.floor(review.rating)] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Sort and filter reviews
  const sortedReviews = [...reviews]
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      // Assuming recent is default, you might want to use createdAt timestamp here
      return 0;
    })
    .filter((review) =>
      filterRating ? Math.floor(review.rating) === filterRating : true
    );

  return (
    <div className=" mx-auto py-8">
      {/* Reviews Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Customer Reviews ({reviews.length})
        </h2>
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "rating")}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gray-900">
              {averageRating}
            </span>
            <StarRating rating={parseFloat(averageRating)} />
            <span className="text-sm text-gray-500 mt-2">
              Based on {reviews.length} reviews
            </span>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingDistribution[star] || 0;
              const percentage = reviews.length
                ? (count / reviews.length) * 100
                : 0;

              return (
                <button
                  key={star}
                  onClick={() =>
                    setFilterRating(filterRating === star ? null : star)
                  }
                  className={`w-full flex items-center gap-2 p-1 hover:bg-gray-100 rounded ${
                    filterRating === star ? "bg-gray-100" : ""
                  }`}
                >
                  <span className="text-sm text-gray-600 w-12">
                    {star} stars
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {sortedReviews.length > 0 ? (
        <div className="space-y-6">
          {sortedReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={review.imgUrl}
                  alt={review.username}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {review.username}
                    </h3>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                  {review.createdAt && (
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No reviews available yet</p>
        </div>
      )}

      {/* Filter Reset */}
      {filterRating && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setFilterRating(null)}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewContainer;
