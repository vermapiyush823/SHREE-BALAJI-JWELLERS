"use client";

import ArrowIcon from "@/assets/icons/Forward.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumbs = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const arrLinks = pathNames.map((path, index) => {
    return {
      name: path,
      url: `/${pathNames.slice(0, index + 1).join("/")}`,
    };
  });
  return (
    <div className="breadcrumbs p-2 inline-block ml-[25px] mt-1">
      <ul className="flex gap-1">
        <li>
          <Link
            href="/"
            className="text-xl hover:font-semibold hover:underline"
          >
            Home
            <Image
              src={ArrowIcon}
              alt="Arrow Icon"
              className="inline-block"
              width={25}
              height={25}
            />
          </Link>
        </li>
        {arrLinks.map((link: any, index: any) => (
          <li key={index}>
            {index !== arrLinks.length - 1 ? (
              <Link
                href={link.url}
                className="text-xl hover:font-semibold hover:underline capitalize"
                as={link.url}
              >
                {link.name}
                <Image
                  src={ArrowIcon}
                  alt="Arrow Icon"
                  className="inline-block"
                  width={25}
                  height={25}
                />
              </Link>
            ) : (
              <span className="text-xl font-semibold cursor-default capitalize">
                {link.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
