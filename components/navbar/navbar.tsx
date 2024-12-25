"use client";
import {
  ChevronDown,
  Heart,
  LogIn,
  Menu,
  Search as SearchIcon,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../assets/icons/logo.svg";
import LogoutButton from "../button/LogoutButton";
interface NavbarProps {
  user: string | undefined;
}

const todaysRates = {
  gold: { value: "10", unit: "gms", purity: "24K - 999", price: "₹65,000" },
  silver: { value: "10", unit: "gms", purity: "999", price: "₹750" },
  platinum: { value: "10", unit: "gms", purity: "999", price: "₹55,000" },
  diamond: { value: "1", unit: "ct", purity: "VVS1", price: "₹85,000" },
};

const quickLinks = [
  { title: "Gold", link: "gold" },
  { title: "Silver", link: "silver" },
  { title: "Diamond", link: "diamond" },
  { title: "Platinum", link: "platinum" },
  { title: "Rate Today", link: "#" },
];

const Navbar = ({ user }: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRates, setShowRates] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log();
  return (
    <div className="fixed top-0 left-0 w-full z-[1000] shadow-lg">
      {/* Main Navbar */}
      <div className="bg-gray-100 px-4 sm:px-[30px] py-[5px]">
        <nav className="flex justify-between items-center h-[60px]">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="logo">
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={50}
              className="w-32 sm:w-40 lg:w-[150px]"
            />
          </Link>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for jewelry..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <SearchIcon className="absolute right-4 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation Icons */}
          <ul className="flex items-center gap-4 sm:gap-[30px]">
            {/* Search Icon - Visible only on Mobile */}
            <li className="md:hidden">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <SearchIcon className="h-6 w-6 text-gray-600" />
              </button>
            </li>
            <li className="hidden sm:block">
              <Link href="/favourites" className="relative group">
                <Heart className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  0
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`${!user ? "/sign-in" : "/cart"}`}
                className="relative group"
              >
                <ShoppingBag className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                  0
                </span>
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link href="/profile">
                <User className="h-6 w-6 text-gray-600" />
              </Link>
            </li>
            <li className="hidden sm:block">
              {user ? (
                <div className="flex items-center flex-col">
                  <LogoutButton />
                </div>
              ) : (
                <Link href="/sign-in" className="flex items-center flex-col">
                  <LogIn className="h-6 w-6 text-gray-600" />
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-2 bg-white border-b">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for jewelry..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <SearchIcon className="absolute right-4 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b">
          <div className="px-4 py-2">
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  {link.title !== "Rate Today" ? (
                    <Link
                      href={`/${link.link}`}
                      className="block py-2 text-gray-600 hover:text-black"
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <button
                      onClick={() => setShowRates(!showRates)}
                      className="w-full flex justify-between items-center py-2 text-gray-600 hover:text-black"
                    >
                      {link.title}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          showRates ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                  {link.title === "Rate Today" && showRates && (
                    <div className="mt-2 bg-gray-50 rounded-lg p-4">
                      {Object.entries(todaysRates).map(([metal, data]) => (
                        <div
                          key={metal}
                          className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                        >
                          <div>
                            <span className="font-semibold capitalize">
                              {metal}:{" "}
                            </span>
                            <span className="text-gray-600">
                              {data.value}
                              {data.unit} - {data.purity}
                            </span>
                          </div>
                          <span className="font-bold">{data.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              {/* Mobile-only navigation items */}
              <li className="sm:hidden">
                <Link
                  href="/favourites"
                  className="flex items-center py-2 text-gray-600 hover:text-black"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Favorites
                </Link>
              </li>
              <li className="sm:hidden">
                <Link
                  href="/profile"
                  className="flex items-center py-2 text-gray-600 hover:text-black"
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Link>
              </li>
              <li className="sm:hidden">
                {user ? (
                  <div className="py-2">
                    <LogoutButton />
                  </div>
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex items-center py-2 text-gray-600 hover:text-black"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Quick Links Bar - Desktop */}
      <div className="hidden lg:block w-full px-[25px] border-b-[1px] border-black bg-white">
        <ul className="flex gap-[31px] items-start text-[20px] text-[#555555]">
          {quickLinks.map((link) => (
            <li
              key={link.title}
              className={`py-[5px] relative group ${
                link.title === "Rate Today" ? "cursor-pointer" : ""
              }`}
              onMouseEnter={() =>
                link.title === "Rate Today" && setShowRates(true)
              }
              onMouseLeave={() =>
                link.title === "Rate Today" && setShowRates(false)
              }
            >
              {link.title !== "Rate Today" ? (
                <Link
                  href={`/${link.link}`}
                  className="font-[gilroy-medium] uppercase hover:font-bold transition-all duration-200 hover:border-b-2 hover:border-[#555555]"
                >
                  {link.title}
                </Link>
              ) : (
                <div className="relative">
                  <span className="font-[gilroy-medium] uppercase hover:font-bold flex items-center">
                    {link.title}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </span>

                  {/* Rates Dropdown */}
                  {showRates && (
                    <div className="absolute left-0 top-full w-[300px] bg-white shadow-lg rounded-[10px] z-50">
                      <div className="p-4">
                        <h2 className="text-lg font-bold text-black mb-3">
                          Today's Rates
                        </h2>
                        {Object.entries(todaysRates).map(([metal, data]) => (
                          <div
                            key={metal}
                            className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                          >
                            <div>
                              <span className="font-semibold capitalize">
                                {metal}:{" "}
                              </span>
                              <span className="text-gray-600">
                                {data.value}
                                {data.unit} - {data.purity}
                              </span>
                            </div>
                            <span className="font-bold">{data.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
