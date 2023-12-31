import { Skeleton } from "@/components/ui/skeleton";

export default function HistoriesLoading() {
  return (
    <div className="bg-gray-50">
      {Array.from({ length: 2 }, (_, index) => index + 1).map(
        (value: number) => (
          <div className="mb-4 bg-white px-6 py-3 shadow-md" key={value}>
            <div className="mb-4 flex gap-4 border-b-2 border-b-gray-200 pb-4">
              <Skeleton className="h-16 w-16 rounded bg-gray-200" />
              <div className="mr-auto flex flex-col gap-2">
                <Skeleton className="h-4 w-32 rounded bg-gray-200" />
                <Skeleton className="h-4 w-20 rounded bg-gray-200" />
              </div>
              <Skeleton className="h-4 w-14 rounded bg-gray-200" />
            </div>
            <Skeleton className="h-14 w-full rounded bg-gray-200" />
          </div>
        ),
      )}
    </div>
  );
}
