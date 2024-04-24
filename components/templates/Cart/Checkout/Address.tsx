"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Address() {
  const [address, setAddress] = useState("");
  // const onGetLocation = () => {
  //   getLocation((position) => {
  //     console.log(position);
  //   });
  // };

  useEffect(() => {
    setAddress(localStorage.getItem("address") as string);
  }, []);

  return (
    <div className="mt-1 grid w-full items-center gap-1.5">
      <Label htmlFor="Address">Address</Label>
      {/* TODO: use GPS for get Address */}
      <div className="relative">
        <Input
          type="text"
          id="Address"
          value={address}
          onChange={(event) => {
            setAddress(event.currentTarget.value);
            localStorage.setItem("address", event.currentTarget.value);
          }}
          placeholder="Address"
          className={"h-10 w-full bg-white shadow-none dark:bg-black"}
        />
        <Button
          size="icon"
          className="absolute inset-1 left-auto m-auto size-8 bg-black dark:bg-white">
          <MapPin className="size-5" />
        </Button>
      </div>
    </div>
  );
}
