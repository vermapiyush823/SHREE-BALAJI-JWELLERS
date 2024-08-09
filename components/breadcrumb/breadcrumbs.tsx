interface BreadCrumbsProps {
  arrLinks: Array<{ name: string; url: string }>;
}
import ArrowIcon from "@/assets/icons/Forward.svg";
import Image from "next/image";
import Link from "next/link";
const BreadCrumbs = (BreadCrumbsProps: any) => {
  return (
    <div className="breadcrumbs p-2 inline-block ml-1 mt-1">
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
        {BreadCrumbsProps.arrLinks.map((link: any, index: any) => (
          <li key={index}>
            {index !== BreadCrumbsProps.arrLinks.length - 1 ? (
              <Link
                href={link.url}
                className="text-xl hover:font-semibold hover:underline"
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
              <span className="text-xl font-semibold">{link.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
