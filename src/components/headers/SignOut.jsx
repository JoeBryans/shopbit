"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

export const SignOut = () => {
  return (
    <div>
      <Button
      variant={"outline"}
        onClick={() => signOut()}
        className={"w-full"}
        // className=" hover:bg-gray-300 w-full cursor-pointer flex justify-between rounded p-2"
      >
        <span className="text-sm ">Sign Out</span>
        <LogOut size={15} />
      </Button>
    </div>
  );
};
