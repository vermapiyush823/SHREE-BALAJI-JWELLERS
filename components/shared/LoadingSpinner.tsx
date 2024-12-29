const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      <p className="mt-4 text-xl text-gray-600">Loading products...</p>
    </div>
  );
};

export default LoadingSpinner;
