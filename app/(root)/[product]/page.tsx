"use client";
import BreadCrumbs from "@/components/breadcrumb/breadcrumbs";
import ProductCard from "@/components/card/product_card/product_card";
import Filter from "@/components/filters/filter";
import Heading from "@/components/PageHeading/PageHeading";
import ErrorDisplay from "@/components/shared/ErrorDisplay";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface JewelleryPageProps {
  params: {
    product: string;
  };
}

const JewelleryPage = ({ params }: JewelleryPageProps) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    price: string[];
    category: string[];
    metalType: string[];
  }>({
    price: [],
    category: [],
    metalType: [],
  });
  const searchParams = useSearchParams();

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

  // Combined initialization and fetch effect
  useEffect(() => {
    const initializeAndFetch = async () => {
      // Initialize metal type filter from URL
      const metalType =
        params.product.charAt(0).toUpperCase() + params.product.slice(1);
      const initialFilters = {
        price: [],
        category: [],
        metalType: [metalType],
      };

      setFilters(initialFilters);

      // Fetch products with initial filters
      setLoading(true);
      try {
        const queryString = new URLSearchParams({
          filters: JSON.stringify(initialFilters),
        }).toString();

        const response = await fetch(`/api/products?${queryString}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);

        // Get auth token
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("jwt="))
          ?.split("=")[1];
        setUser(token || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    initializeAndFetch();
  }, [params.product]); // Only depend on URL parameter

  // Subsequent filter changes
  useEffect(() => {
    // Skip the initial render since it's handled by the first effect
    if (filters.metalType.length === 0) return;

    fetchProducts(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  console.log(searchParams);
  return (
    <>
      <Heading />
      <BreadCrumbs />
      <Filter
        onFilterChange={handleFilterChange}
        currentFilters={filters}
        urlParam={params.product}
      />
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
