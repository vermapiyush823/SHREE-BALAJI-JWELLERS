import Image from "next/image";
import Link from "next/link";
import heart from "../../assets/icons/Heart.svg";
import logo from "../../assets/icons/logo.svg";
import shoppinBag from "../../assets/icons/shopping bag.svg";
import profile from "../../assets/icons/Union.svg";
import Search from "../searchbar/searchbar";
import "./navbar.css";
const navbar = () => {
  const quickLinks = [
    {
      title: "GOLD",
      link: "gold",
    },
    {
      title: "DIAMOND",
      link: "diamond",
    },
    {
      title: "SILVER",
      link: "silver",
    },
    {
      title: "PLATINUM",
      link: "platinum",
    },
    {
      title: "GEMSTONE",
      link: "gemstone",
    },
    {
      title: "RATE TODAY",
      link: "rate-today",
    },
  ];
  const dropDownLinks = ["Ring", "Necklace", "Tops", "Bracelet"];
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
            <li className="quick-link relative" key={links.title}>
              <Link
                href={`${links.link}`}
                as={`${links.link}`}
                className="font-[gilroy-medium]"
              >
                {links.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="dropdown">
          <ul className="dropdown-list shadow-lg">
            {dropDownLinks.map((links) => (
              <li
                className="hover:bg-gray-200 cursor-pointer p-[10px] pl-[12px]"
                key={links}
              >
                {links}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default navbar;
