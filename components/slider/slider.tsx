"use client";

import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import img2 from "../../assets/images/Ashada-web-06072024.jpg";
import img1 from "../../assets/images/Gold-chain-banner-web1.jpg";
import img3 from "../../assets/images/Kasu-collection-Web_24062024.jpg";
import "./slider.css";

const Slider = () => {
  const images = [img1, img2, img3];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 3000,
    }),

    Fade(),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: any) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    const l = emblaApi.scrollSnapList();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {images.map((image, index) => (
          <div className="embla__slide" key={index}>
            <Image src={image} alt="slider" className="embla__slide__img" />
          </div>
        ))}
      </div>
      <button
        title="prev"
        onClick={scrollPrev}
        className="prev navigator-icon-parent"
      >
        <DoubleArrowLeftIcon className="navigator-icon" />
      </button>
      <button
        title="next"
        onClick={scrollNext}
        className="next navigator-icon-parent"
      >
        <DoubleArrowRightIcon className="navigator-icon" />
      </button>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`normal ${index === selectedIndex ? "active" : ""}`}
            onClick={() => scrollTo(index)}
            title="navigate"
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
