"use client";
import Login from "@/assets/icons/Login.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import heart from "../../assets/icons/Heart.svg";
import logo from "../../assets/icons/logo.svg";
import shoppinBag from "../../assets/icons/shopping bag.svg";
import profile from "../../assets/icons/Union.svg";
import filledProfile from "../../assets/icons/User.svg";
import LogoutButton from "../button/LogoutButton";
import Search from "../searchbar/searchbar";

interface navbarProps {
  user: any;
}

export default function Navbar({ user }: navbarProps) {
  const [userClicked, setUserClicked] = useState(false);
  const quickLinks = [
    { title: "Gold", link: "gold" },
    { title: "Silver", link: "silver" },
    { title: "Diamond", link: "diamond" },
    { title: "Platinum", link: "platinum" },
    { title: "Rate Today", link: "#" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[1000] shadow-lg">
      <div className="bg-gray-100 h-[60px] px-[30px] py-[5px]">
        <nav className="flex justify-between items-center h-full">
          <div className="logo">
            <Link href="/">
              <Image src={logo} alt="logo" width={150} height={50} />
            </Link>
          </div>
          <Search />
          <ul className="flex gap-[30px] items-center">
            <li>
              <Link href="/favourites">
                <Image src={heart} alt="heart" width={25} height={25} />
              </Link>
            </li>
            <li>
              <Link href={`${!user ? "/sign-in" : "/cart"}`}>
                <Image
                  src={shoppinBag}
                  alt="shopping bag"
                  width={25}
                  height={25}
                />
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <Image
                  src={userClicked ? filledProfile : profile}
                  onClick={() => setUserClicked(!userClicked)}
                  alt="profile"
                  width={20}
                  height={25}
                />
              </Link>
            </li>
            <li>
              {user ? (
                <div className="flex items-center flex-col">
                  <LogoutButton />
                  <span className="text-sm text-gray-600">Logout</span>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="flex items-center flex-col ml-2 mt-2"
                >
                  <Image src={Login} alt="login" width={25} height={25} />
                  <span className="text-sm text-gray-600">Login</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-screen px-[25px] border-b-[1px] border-black bg-white relative inline-block">
        <ul className="flex gap-[31px] items-start text-[20px] text-[#555555] cursor-pointer">
          {quickLinks.map((links: any) => (
            <li
              className="py-[5px] transition-all duration-200 ease-in hover:border-b-2 hover:border-[#555555] relative group"
              key={links.title}
            >
              {links.title !== "Rate Today" ? (
                <Link
                  href={`/${links.link}`}
                  className="font-[gilroy-medium] uppercase hover:font-bold"
                >
                  {links.title}
                </Link>
              ) : (
                <span className="font-[gilroy-medium] hover:font-bold">
                  {links.title}
                </span>
              )}
              {links.title === "Rate Today" && (
                <div className="hidden group-hover:flex flex-col absolute w-[250px] top-full bg-gray-100 shadow-lg rounded-[10px] pt-0">
                  <h2 className="font-[gilroy-medium] p-2 text-black bg-gray-200">
                    Today&apos;s Rate
                  </h2>
                  <p className="font-[gilroy-light] border-b-[1px] border-black p-1 pl-2 text-[18px] text-black">
                    <span className="font-[gilroy-medium] text-black">
                      Gold:
                    </span>{" "}
                    10gms - 24K - 999
                  </p>
                  <p className="font-[gilroy-light] border-b-[1px] border-black p-1 pl-2 text-[18px] text-black">
                    <span className="font-[gilroy-medium] text-black">
                      Silver:
                    </span>{" "}
                    10gms - 999
                  </p>
                  <p className="font-[gilroy-light] border-b-[1px] border-black p-1 pl-2 text-[18px] text-black">
                    <span className="font-[gilroy-medium] text-black">
                      Platinum:
                    </span>{" "}
                    10gms - 999
                  </p>
                  <p className="font-[gilroy-light] p-1 pl-2 text-[18px] text-black">
                    <span className="font-[gilroy-medium] text-black">
                      Diamond:
                    </span>{" "}
                    1ct - VVS1
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
