"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Gemstone from "../../assets/images/Gemstone.jpg";
import Diamond from "../../assets/images/diamond-jwellery.jpg";
import GoldBanner from "../../assets/images/gold-jewellery.jpg";
import PlatinumBanner from "../../assets/images/platinum.jpg";

// Define types for jewellery
type JewelleryType = "gold" | "diamond" | "gemstone" | "platinum";

interface BannerConfig {
  image: typeof GoldBanner;
  title: string;
  description: string;
  textColor: string;
}

const PageHeading = () => {
  const { product } = useParams();
  const jewelleryType = product as JewelleryType;
  const [bannerConfig, setBannerConfig] = useState<BannerConfig>({
    image: GoldBanner,
    title: "Gold Jewellery",
    description: "Timeless elegance in every piece",
    textColor: "text-amber-100",
  });

  useEffect(() => {
    const configs: Record<JewelleryType, BannerConfig> = {
      gold: {
        image: GoldBanner,
        title: "Gold Jewellery",
        description: "Timeless elegance in every piece",
        textColor: "text-amber-100",
      },
      diamond: {
        image: Diamond,
        title: "Diamond Jewellery",
        description: "Brilliance that lasts forever",
        textColor: "text-gray-100",
      },
      gemstone: {
        image: Gemstone,
        title: "Gemstone Jewellery",
        description: "Colorful and unique pieces",
        textColor: "text-emerald-100",
      },
      platinum: {
        image: PlatinumBanner,
        title: "Platinum Jewellery",
        description: "Pure luxury and sophistication",
        textColor: "text-gray-200",
      },
    };

    if (jewelleryType in configs) {
      setBannerConfig(configs[jewelleryType]);
    }
  }, [jewelleryType]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Banner Container */}
      <div className="relative w-full h-[25vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh]">
        {/* Background Image */}
        <Image
          src={bannerConfig.image}
          alt={`${bannerConfig.title} Banner`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl space-y-2 sm:space-y-4">
            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                         font-light capitalize tracking-wider
                         text-white transition-all duration-300
                         animate-fade-in"
            >
              {bannerConfig.title}
            </h1>

            {/* Description */}
            <p
              className={`sm:block text-sm md:text-base lg:text-lg 
                        ${bannerConfig.textColor} opacity-90
                        animate-slide-up`}
            >
              {bannerConfig.description}
            </p>

            {/* Optional: Breadcrumbs */}
            <nav className="hidden sm:flex items-center space-x-2 text-sm text-gray-300">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span>→</span>
              <span className="capitalize">{jewelleryType}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Optional: Category Stats or Quick Links */}
      <div
        className="hidden lg:flex justify-center items-center py-4 bg-white/5 backdrop-blur-sm
                    border-t border-white/10"
      >
        <div className="flex space-x-8 text-sm text-gray-400">
          <span>100+ Designs</span>
          <span>|</span>
          <span>Certified Quality</span>
          <span>|</span>
          <span>Lifetime Exchange</span>
        </div>
      </div>
    </section>
  );
};

export default PageHeading;
