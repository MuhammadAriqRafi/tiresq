"use client";

import { useAuth } from "@clerk/nextjs";
import { Fragment } from "react";
import { tripStore } from "@/lib/store/trip-store";
import { useEffectOnce, useReadLocalStorage } from "usehooks-ts";
import { type OnProgressTripOutputType } from "../_actions/get-on-progress-trip";

type HomePageWrapperProps = Readonly<{
  children: React.ReactNode;
  onProgressTrip: OnProgressTripOutputType["data"];
}>;

export default function HomePageWrapper({
  children,
  onProgressTrip,
}: HomePageWrapperProps) {
  const { isSignedIn: isUserSignedIn } = useAuth();
  const [setTrip, trip] = tripStore(({ setTrip, trip }) => [setTrip, trip]);
  const publicUserTrip = useReadLocalStorage<OnProgressTripOutputType["data"]>(
    "tiresq.publicUserTrip",
  );

  useEffectOnce(() => {
    if (!isUserSignedIn && publicUserTrip !== null) setTrip(publicUserTrip);
    else if (trip === null) setTrip(onProgressTrip);
  });

  return <Fragment>{children}</Fragment>;
}
