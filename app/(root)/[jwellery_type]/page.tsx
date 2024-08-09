"use client";
import BreadCrumbs from "@/components/breadcrumb/breadcrumbs";
import { usePathname } from "next/navigation";
const JewelleryPage = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const breadCrumbs = pathNames.map((path, index) => {
    return {
      name: path,
      url: `/${pathNames.slice(0, index + 1).join("/")}`,
    };
  });
  return (
    <>
      <BreadCrumbs arrLinks={breadCrumbs} />
    </>
  );
};

export default JewelleryPage;
