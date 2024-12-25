"use client";
import ArrowIcon from "@/assets/icons/Forward.svg";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

interface BreadCrumbsProps {
  productName?: string;
  className?: string;
  theme?: "light" | "dark";
}

interface BreadcrumbLink {
  name: string;
  url: string;
}

const BreadCrumbs = ({
  productName,
  className = "",
  theme = "light",
}: BreadCrumbsProps) => {
  const params = useParams();
  const searchParams = useSearchParams();

  const jewelryType = (params.product as string) || "";
  const jewelrySubtype = searchParams.get("subType");

  const pathNames: string[] = [];
  if (jewelryType) {
    pathNames.push(jewelryType);
  }
  if (jewelrySubtype) {
    pathNames.push(jewelrySubtype);
  }
  if (productName) {
    pathNames.push(productName);
  }

  const breadcrumbLinks: BreadcrumbLink[] = pathNames.map(
    (path: string, index: number) => ({
      name: path,
      url: `/${pathNames.slice(0, index + 1).join("/")}`,
    })
  );

  // Theme-based styles
  const themeStyles = {
    light: {
      nav: "bg-white/80 backdrop-blur-sm",
      text: "text-gray-600",
      hover: "hover:text-gray-900",
      active: "text-gray-900",
      shadow: "shadow-sm",
      border: "border border-gray-100",
    },
    dark: {
      nav: "bg-gray-800/80 backdrop-blur-sm",
      text: "text-gray-300",
      hover: "hover:text-white",
      active: "text-white",
      shadow: "shadow-md",
      border: "border border-gray-700",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`
        ${currentTheme.nav}
        ${currentTheme.shadow}
        ${currentTheme.border}
        rounded-lg
        py-3 px-4
        mx-4 my-2
        transition-all
        duration-300
        ${className}
      `}
    >
      <ul className="flex flex-wrap items-center gap-1 text-sm sm:text-base">
        <li>
          <Link
            href="/"
            className={`
              group
              flex items-center
              ${currentTheme.text}
              ${currentTheme.hover}
              transition-colors
              duration-200
              hover:scale-105
              transform
            `}
          >
            <span className="hover:underline underline-offset-4">Home</span>
            <div className="mx-2 transition-transform duration-300 group-hover:translate-x-1">
              <Image
                src={ArrowIcon}
                alt="Forward"
                className="inline-block opacity-60 group-hover:opacity-100"
                width={16}
                height={16}
                priority
              />
            </div>
          </Link>
        </li>

        {breadcrumbLinks.map((link: BreadcrumbLink, index: number) => (
          <li key={link.url} className="flex items-center">
            {index !== breadcrumbLinks.length - 1 ? (
              <Link
                href={link.url}
                className={`
                  group
                  flex items-center
                  ${currentTheme.text}
                  ${currentTheme.hover}
                  transition-colors
                  duration-200
                  hover:scale-105
                  transform
                `}
              >
                <span className="capitalize hover:underline underline-offset-4">
                  {link.name}
                </span>
                <div className="mx-2 transition-transform duration-300 group-hover:translate-x-1">
                  <Image
                    src={ArrowIcon}
                    alt="Forward"
                    className="inline-block opacity-60 group-hover:opacity-100"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
            ) : (
              <span
                className={`
                  capitalize
                  font-medium
                  ${currentTheme.active}
                  cursor-default
                  px-1
                  py-0.5
                  rounded
                  bg-opacity-10
                `}
                aria-current="page"
              >
                {link.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
