"use client";

import ArrowIcon from "@/assets/icons/Forward.svg";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
const BreadCrumbs = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const jwellery_type = params.product;
  const jwellery_subtype = searchParams.get("subType");
  const pathNames: any = [];
  if (jwellery_type) {
    pathNames.push(jwellery_type);
  }
  if (jwellery_subtype) {
    pathNames.push(jwellery_subtype);
  }
  const id = useParams().id;
  if (id) {
    pathNames.push(id.toString().replace(/-/g, " "));
  }
  const arrLinks = pathNames.map((path: String, index: number) => {
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
