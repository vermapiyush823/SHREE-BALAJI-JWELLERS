// components/container/Container.tsx
"use client";

import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import { useState } from "react";
import DisplayCard from "../card/display_card/display_card";

interface ContainerProps {
  heading: string;
  subHeading: string;
  imgArray: {
    height: number;
    img: StaticImageData;
  }[];
  className?: string;
  categories?: string[];
}

const Container = ({
  heading,
  subHeading,
  imgArray,
  className = "",
  categories = [],
}: ContainerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}
    >
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {heading}
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {subHeading}
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {imgArray.map((img, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <DisplayCard height={img.height} src={img.img} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Container;
