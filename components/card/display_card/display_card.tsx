// components/card/display_card/display_card.tsx
"use client";

import Image, { StaticImageData } from "next/image";

interface CardProps {
  height: number;
  src: StaticImageData;
}

const DisplayCard = ({ height, src }: CardProps) => {
  return (
    <div className="rounded-[20px] overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg">
      <div
        className="relative"
        style={{ height: `${height}px`, width: "100%" }}
      >
        <Image
          src={src}
          alt="Product Image"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default DisplayCard;
