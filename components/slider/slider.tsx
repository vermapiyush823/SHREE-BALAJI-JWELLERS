"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";
import img2 from "../../assets/images/Ashada-web-06072024.jpg";
import img1 from "../../assets/images/Gold-chain-banner-web1.jpg";
import img3 from "../../assets/images/Kasu-collection-Web_24062024.jpg";
import "./slider.css";

const Slider = () => {
  const images = [img1, img2, img3]; // Add your images to this array

  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[autoplayPlugin.current]}
      className=""
      onMouseEnter={autoplayPlugin.current.stop}
      onMouseLeave={autoplayPlugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index}>
            <div>
              <Card className="border-none p-0">
                <CardContent className="flex p-0 justify-center">
                  <Image
                    src={images[index % images.length]}
                    alt="slider"
                    className="slider-img"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="prev" />
      <CarouselNext className="next" />
    </Carousel>
  );
};
export default Slider;
