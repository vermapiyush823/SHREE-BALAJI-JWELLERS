import Image from "next/image";
import SearchIcon from "../../assets/icons/Search.svg";
import "./searchbar.css";
const searchbar = () => {
  return (
    <div className="flex w-[400px] shadow-sm rounded-[5px]">
      <button
        title="Search"
        className=" border-[1px] w-1/12 bg-white p-2 rounded-l-[5px] border-r-0"
      >
        <Image src={SearchIcon} alt="search" width={20} height={20} />
      </button>
      <input
        type="text"
        placeholder="Search for products"
        className="p-2 border-[1px] w-11/12 border-l-0 rounded-r-[5px] focus:outline-none"
      />
    </div>
  );
};

export default searchbar;
