import Image from "next/image";
import Link from "next/link";
import heart from "../../assets/icons/Heart.svg";
import shoppinBag from "../../assets/icons/shopping bag.svg";
import profile from "../../assets/icons/Union.svg";
import Search from "../searchbar/searchbar";
import "./navbar.css";
const navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <span>Logo</span>
        </div>
        <Search />
        <ul className="nav-icon-list">
          <li>
            <Link href="/favourites">
              <Image src={heart} alt="heart" width={30} height={30} />
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <Image
                src={shoppinBag}
                alt="shopping bag"
                width={30}
                height={30}
              />
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <Image src={profile} alt="profile" width={25} height={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default navbar;
