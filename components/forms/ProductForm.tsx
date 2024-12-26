"use client";
import { useState } from "react";

const ProductForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStoneDetails, setShowStoneDetails] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      setFiles(filesArray);

      // Create preview URLs
      const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
      console.log("Previews:", previewUrls);
    }
  };

  // Cleanup function to revoke object URLs
  const cleanupPreviews = () => {
    previews.forEach((preview) => URL.revokeObjectURL(preview));
  };

  return (
    <form
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
      action={async (formData) => {
        setIsSubmitting(true);
        try {
          // First, upload all images
          const uploadPromises = files.map(async (file) => {
            const imageData = new FormData();
            imageData.append("file", file);
            imageData.append("type", file.type);

            const uploadResponse = await fetch("/api/upload", {
              method: "POST",
              body: imageData,
            });

            if (!uploadResponse.ok) throw new Error("Failed to upload image");
            const data = await uploadResponse.json();
            return data.imageUrl; // Assuming the server returns an imageUrl
          });

          const imageUrls = await Promise.all(uploadPromises);

          console.log("Image URLs:", imageUrls);

          // Create a new FormData instance for the product data
          const productFormData = new FormData();

          // Add all form fields
          productFormData.append("title", formData.get("title") as string);
          productFormData.append("price", formData.get("price") as string);
          productFormData.append("type", formData.get("type") as string);
          productFormData.append("subType", formData.get("subType") as string);
          productFormData.append("weight", formData.get("weight") as string);
          productFormData.append("purity", formData.get("purity") as string);
          productFormData.append("gender", formData.get("gender") as string);
          productFormData.append("images", JSON.stringify(imageUrls));
          // Add stone details if present
          if (formData.get("stone") === "on") {
            productFormData.append("stone", "true");
            productFormData.append(
              "stoneWeight",
              formData.get("stoneWeight") as string
            );
            productFormData.append(
              "stonePurity",
              formData.get("stonePurity") as string
            );
            productFormData.append(
              "stoneType",
              formData.get("stoneType") as string
            );
            productFormData.append(
              "stonePrice",
              formData.get("stonePrice") as string
            );
            productFormData.append(
              "stoneQuantity",
              formData.get("stoneQuantity") as string
            );
          }

          const response = await fetch("/api/products/add", {
            method: "POST",
            body: productFormData,
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to add product");
          }

          cleanupPreviews();
          alert("Product added successfully!");
        } catch (error: any) {
          console.error(error);
          alert(error.message || "Failed to add product");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

      {/* Main Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter product title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            name="type"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select Type</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Diamond">Diamond</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sub-Type
          </label>
          <select
            name="subType"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select Sub-Type</option>
            <option value="Ring">Ring</option>
            <option value="Necklace">Necklace</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Earrings">Earrings</option>
            <option value="Pendant">Pendant</option>
            <option value="Chain">Chain</option>
            <option value="Bangle">Bangle</option>
            <option value="Anklet">Anklet</option>
            <option value="Nose Pin">Nose Pin</option>
            <option value="Toe Ring">Toe Ring</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Weight (g)
          </label>
          <input
            type="number"
            name="weight"
            placeholder="Enter weight"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Purity %
          </label>
          <input
            type="number"
            name="purity"
            placeholder="Enter purity"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                required
              />
            </label>
          </div>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(preview);
                      setPreviews((prev) => prev.filter((_, i) => i !== index));
                      setFiles((prev) => prev.filter((_, i) => i !== index));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stone Details Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id="hasStone"
            name="stone"
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            onChange={(e) => setShowStoneDetails(e.target.checked)}
          />
          <label
            htmlFor="hasStone"
            className="text-sm font-medium text-gray-700"
          >
            Has Stone
          </label>
        </div>

        {showStoneDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stone Weight
              </label>
              <input
                type="number"
                name="stoneWeight"
                placeholder="Enter stone weight"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stone Purity
              </label>
              <input
                type="number"
                name="stonePurity"
                placeholder="Enter stone purity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stone Type
              </label>
              <input
                type="text"
                name="stoneType"
                placeholder="Enter stone type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stone Price
              </label>
              <input
                type="number"
                name="stonePrice"
                placeholder="Enter stone price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stone Quantity
              </label>
              <input
                type="number"
                name="stoneQuantity"
                placeholder="Enter stone quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        )}
      </div>

      {/* Gender Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <select
          name="gender"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Select Gender</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black hover:bg-black/70 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Adding Product...
          </span>
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
};

export default ProductForm;
