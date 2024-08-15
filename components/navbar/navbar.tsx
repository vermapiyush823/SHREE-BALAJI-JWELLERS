import Image from "next/image";
import Link from "next/link";
import heart from "../../assets/icons/Heart.svg";
import logo from "../../assets/icons/logo.svg";
import shoppinBag from "../../assets/icons/shopping bag.svg";
import profile from "../../assets/icons/Union.svg";
import { getNavbarDropdowns } from "../../lib/actions/navbar.actions";
import Search from "../searchbar/searchbar";
import "./navbar.css";
export default async function navbar() {
  const quickLinks = await getNavbarDropdowns();
  return (
    <div className="main-nav-container shadow-lg">
      <div className="navbar-container bg-gray-100">
        <nav className="navbar">
          <div className="logo">
            <Link href="/">
              <Image src={logo} alt="logo" width={150} height={50} />
            </Link>
          </div>
          <Search />
          <ul className="nav-icon-list">
            <li>
              <Link href="/favourites">
                <Image src={heart} alt="heart" width={25} height={25} />
              </Link>
            </li>
            <li>
              <Link href="/cart">
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
                <Image src={profile} alt="profile" width={20} height={25} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="quick-links">
        <ul className="quick-links-list">
          {quickLinks.map((links) => (
            <li className="quick-link" key={links.title}>
              {links.title !== "RATE TODAY" ? (
                <Link
                  href={{
                    pathname: `/${links.link}`,
                  }}
                  className="font-[gilroy-medium]"
                >
                  {links.title}
                </Link>
              ) : (
                <span className="font-[gilroy-medium]">{links.title}</span>
              )}
              {links.title !== "RATE TODAY" ? (
                <div className="dropdown mt-[1px] left-[10vw] shadow-lg">
                  <ul className="flex flex-col shadow-lg">
                    {links.subLinks.map((sublink: any) => (
                      <li
                        key={sublink.title}
                        className="p-[8px] pl-[12px] font-[gilroy-light] hover:bg-gray-200"
                      >
                        <Link
                          href={{
                            pathname: `/${links.link}`,
                            query: { subType: sublink.link },
                          }}
                        >
                          {sublink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="rate-dropdown bg-gray-100 pt-0 shadow-lg">
                  <h2 className="font-[gilroy-medium] p-2  text-black bg-gray-200">
                    Today's Rate
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
                  <p className="font-[gilroy-light] border-b-[1px]  p-1 pl-2 text-[18px] text-black">
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
