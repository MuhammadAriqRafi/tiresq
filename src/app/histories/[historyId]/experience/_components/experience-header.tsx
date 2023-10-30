"use client";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

export default function ExperienceHeader({
  createdAt,
  destinationName,
  isFetchingExperience,
}: ExperienceHeaderProps) {
  const router = useRouter();

  return (
    <header className="mb-14 flex items-center gap-4 p-6 pb-0">
      <X className="cursor-pointer" onClick={() => router.back()} />
      <div className="flex flex-col gap-1">
        {!isFetchingExperience ? (
          <Fragment>
            <h2>{destinationName}</h2>
            <span>{dayjs(createdAt).format("dddd, D MMM YYYY, HH:mm")}</span>
          </Fragment>
        ) : (
          <Fragment>
            <Skeleton className="h-6 w-36 rounded-lg bg-zinc-200" />
            <Skeleton className="h-4 w-40 rounded-md bg-zinc-200" />
          </Fragment>
        )}
      </div>
    </header>
  );
}
