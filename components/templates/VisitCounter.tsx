"use client";

import { addVisitAction, getVisitsAction } from "@/actions/visitActions";
import { useEffect } from "react";

export default function VisitCounter({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    async function addVisit() {
      const res = await addVisitAction();

      console.log(res);

      console.log(await getVisitsAction());
    }

    console.log("add visit");

    addVisit();
  }, []);

  return <>{children}</>;
}
