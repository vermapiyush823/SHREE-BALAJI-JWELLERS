import Image from "next/image";
import Link from "next/link";
import heart from "../../assets/icons/Heart.svg";
import logo from "../../assets/icons/logo.svg";
import shoppinBag from "../../assets/icons/shopping bag.svg";
import profile from "../../assets/icons/Union.svg";
import Search from "../searchbar/searchbar";
import "./navbar.css";
const navbar = () => {
  return (
    <div className="main-nav-container">
      <div className="navbar-container">
        <nav className="navbar">
          <div className="logo">
            <Image src={logo} alt="logo" width={150} height={50} />
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
      <div className="quick-links">
        <ul>
          <li className="quick-link">GOLD</li>
          <li className="quick-link">SILVER</li>
          <li className="quick-link">DIAMOND</li>
          <li className="quick-link">JEWELLERY</li>
          <li className="quick-link">RATE TODAY</li>
        </ul>
      </div>
    </div>
  );
};

export default navbar;
