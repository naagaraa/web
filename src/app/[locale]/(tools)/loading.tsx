// app/loading.tsx
export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
    </div>
  );
}
