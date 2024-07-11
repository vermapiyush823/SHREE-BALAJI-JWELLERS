import Image from "next/image";
import deleteIcon from "../../assets/icons/Delete.svg";
import searchIcon from "../../assets/icons/Search.svg";
import "./searchbar.css";
const searchbar = () => {
  return (
    <div className="searchbar">
      <button title="Search">
        <Image
          src={searchIcon}
          className="search"
          alt="search"
          width={24}
          height={24}
        />
      </button>
      <input type="text" placeholder="Search Items..." />
      <button title="Delete">
        <Image
          src={deleteIcon}
          alt="delete"
          className="delete"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default searchbar;
