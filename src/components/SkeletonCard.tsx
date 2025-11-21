"use client";

export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border p-6 shadow-sm bg-white">
      <div className="h-5 w-3/4 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
    </div>
  );
}
