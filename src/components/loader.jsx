import React from "react";

const LoaderLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-800 p-4">
        <div className="flex flex-col space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-700 h-10 rounded"
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="animate-pulse bg-gray-700 h-64 rounded mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <>
              <div
                key={index}
                className="animate-pulse border border-gray-600 rounded-md shadow p-4 flex flex-col space-y-4 bg-gray-800"
              >
                <div className="bg-gray-700 h-24 rounded"></div>
                <div className="h-4 bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-600 rounded w-1/2"></div>
              </div>
              <div
                key={index}
                className="animate-pulse border border-gray-600 rounded-md shadow p-4 flex flex-col space-y-4 bg-gray-800"
              >
                <div className="bg-gray-700 h-24 rounded"></div>
                <div className="h-4 bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-600 rounded w-1/2"></div>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* Right Side Long Card */}
      <div className="w-1/5 bg-gray-800 p-4">
        <div className="animate-pulse bg-gray-700 h-full rounded"></div>
      </div>
    </div>
  );
};

export default LoaderLayout;
