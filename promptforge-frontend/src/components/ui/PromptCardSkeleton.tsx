import Skeleton from "./Skeleton";

export default function PromptCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-5 space-y-4">
      <Skeleton className="h-6 w-2/3" />

      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-3/4" />

      <div className="flex justify-between pt-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}