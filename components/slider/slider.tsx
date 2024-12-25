// Slider.tsx
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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      skipSnaps: false,
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
      Fade(),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="slider-wrapper">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide-inner">
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="embla__slide__img"
                  priority={index === 0}
                  fill
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 100vw,
                         100vw"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="embla__controls">
          <button
            type="button"
            className="embla__nav embla__nav--prev"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <DoubleArrowLeftIcon className="nav-icon" />
          </button>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`embla__dot ${
                  index === selectedIndex ? "embla__dot--selected" : ""
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="embla__nav embla__nav--next"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <DoubleArrowRightIcon className="nav-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
