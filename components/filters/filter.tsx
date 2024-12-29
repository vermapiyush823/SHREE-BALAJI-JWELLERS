"use client";
import { ArrowDown, X } from "lucide-react";
import { useEffect, useState } from "react";

interface FilterOptions {
  price: string[];
  category: string[];
  metalType: string[];
  selected: {
    price: string[];
    category: string[];
    metalType: string[];
  };
}

interface FilterProps {
  onFilterChange: (filters: FilterOptions["selected"]) => void;
  currentFilters: FilterOptions["selected"];
  urlParam?: string;
}

const Filter = ({ onFilterChange, currentFilters, urlParam }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] =
    useState<FilterOptions["selected"]>(currentFilters);
  const [filters, setFilters] = useState<FilterOptions>({
    price: ["0-10000", "10000-20000", "20000-50000", "50000-100000", "100000+"],
    category: [
      "Necklace",
      "Bracelet",
      "Earrings",
      "Pendant",
      "Ring",
      "Chain",
      "Bangle",
      "Anklet",
      "Nose Pin",
      "Toe Ring",
      "Others",
    ],
    metalType: ["Gold", "Silver", "Platinum"],
    selected: currentFilters,
  });

  const handleFilterSelect = (
    category: "price" | "category" | "metalType",
    value: string
  ) => {
    // Prevent deselecting the URL param metal type
    if (category === "metalType" && urlParam) {
      return;
    }

    const newSelected = {
      ...tempFilters,
      [category]: tempFilters[category].includes(value)
        ? tempFilters[category].filter((item) => item !== value)
        : [...tempFilters[category], value],
    };

    setTempFilters(newSelected);
  };

  const clearFilters = () => {
    const clearedFilters = {
      price: [],
      category: [],
      metalType: urlParam
        ? [urlParam.charAt(0).toUpperCase() + urlParam.slice(1)]
        : [],
    };
    setTempFilters(clearedFilters);
    onFilterChange(clearedFilters);
    setIsOpen(false);
  };

  const applyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      selected: tempFilters,
    }));
    onFilterChange(tempFilters);
    setIsOpen(false);
  };

  useEffect(() => {
    setTempFilters(currentFilters);
  }, [currentFilters]);

  return (
    <div className="relative flex flex-col items-end justify-center px-4 w-full h-16">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-around items-center border border-gray-100 w-36 h-10  bg-black rounded-lg shadow-sm cursor-pointer "
      >
        <span className="text-white hover:text-gray-300">Filter</span>
        <button
          className={`text-white hover:text-gray-300 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ArrowDown />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute top-16 right-4 w-72 sm:w-96
         bg-white rounded-lg shadow-lg z-50 p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm hover:text-gray-200"
            >
              Clear all
            </button>
          </div>

          <div className="text-sm sm:text-base grid grid-cols-2 sm:gap-x-8 gap-x-2 justify-between">
            {/* Price Filter */}
            <div className=" mb-4">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="space-y-2">
                {filters.price.map((price) => (
                  <label key={price} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={tempFilters.price.includes(price)}
                      onChange={() => handleFilterSelect("price", price)}
                      className="rounded text-black focus:ring-black"
                    />
                    <span className="text-sm">₹{price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Category</h4>
              <div className="space-y-2 overflow-y-scroll h-36">
                {filters.category.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={tempFilters.category.includes(category)}
                      onChange={() => handleFilterSelect("category", category)}
                      className="rounded text-black focus:ring-black"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Metal Type Filter */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Metal Type</h4>
              <div className="space-y-2">
                {filters.metalType.map((metal) => (
                  <label
                    key={metal}
                    className={`flex items-center space-x-2 ${
                      urlParam && metal.toLowerCase() !== urlParam.toLowerCase()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={tempFilters.metalType.includes(metal)}
                      onChange={() => handleFilterSelect("metalType", metal)}
                      disabled={
                        !!urlParam &&
                        metal.toLowerCase() !== urlParam.toLowerCase()
                      }
                      className="rounded text-black focus:ring-black"
                    />
                    <span className="text-sm">{metal}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          {/* Selected Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(tempFilters).map(([category, values]) =>
              values.map((value) => (
                <div
                  key={`${category}-${value}`}
                  className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-sm"
                >
                  <span>{value}</span>
                  <button
                    onClick={() =>
                      handleFilterSelect(
                        category as "price" | "category" | "metalType",
                        value
                      )
                    }
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
          {/* Add Apply and Cancel buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
