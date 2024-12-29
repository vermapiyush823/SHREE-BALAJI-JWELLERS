"use client";
import BreadCrumbs from "@/components/breadcrumb/breadcrumbs";
import ProductCard from "@/components/card/product_card/product_card";
import Filter from "@/components/filters/filter";
import Heading from "@/components/PageHeading/PageHeading";
import ErrorDisplay from "@/components/shared/ErrorDisplay";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useEffect, useState } from "react";

const JewelleryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    price: [],
    category: [],
    metalType: [],
  });

  const fetchProducts = async (filterParams = filters) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams({
        filters: JSON.stringify(filterParams),
      }).toString();

      const response = await fetch(`/api/products?${queryString}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // Get auth token from cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
    setUser(token || null);
  }, []);

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <>
      <Heading />
      <BreadCrumbs />
      <Filter onFilterChange={handleFilterChange} currentFilters={filters} />
      <div className="w-full flex-wrap gap-[20px] flex justify-center sm:justify-start p-6">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard user={user} product={product} key={index} />
          ))
        ) : (
          <div className="text-center w-full py-10 text-gray-500">
            No products found matching your filters
          </div>
        )}
      </div>
    </>
  );
};

export default JewelleryPage;
