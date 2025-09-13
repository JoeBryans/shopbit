"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagenation = ({ totalItems }) => {
  const router = useRouter();
  const pathName = usePathname();
  const search = useSearchParams();

  const page = search.get("page") || 1;
  const pages = parseInt(page);
  const pageItems = 2;
  const prevPage = pageItems * (pages - 1) > 0;
  const nextPage = pageItems * (pages + 1) + pageItems < totalItems;
  const searchParams = new URLSearchParams(search);
  const handlePagenation = async (type) => {
    type === "prev"
      ? searchParams.set("page", pages - 1)
      : searchParams.set("page", pages + 1);
    router.replace(`${pathName}?${searchParams}`);
  };
  return (
    <div className="flex  w-full justify-between items-center gap-2 mt-5">
      <Button
        variant={"outline"}
        className=" cursor-pointer"
        onClick={() => handlePagenation("prev")}
        disabled={!prevPage}
      >
        Prev
      </Button>
      <Button
        variant={"outline"}
        className=" cursor-pointer"
        onClick={() => handlePagenation("next")}
        disabled={!nextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagenation;
