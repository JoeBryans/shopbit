"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Search = () => {
  const router = useRouter();
  const pathName = usePathname();
  const search = useSearchParams();
  //   const [searchValue, setSearchValue] = useState("");
  const handelChange = async (e) => {
    const value = e.target.value;
    // setSearchValue(value);
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", 1);

    if (value) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }

    router.replace(`${pathName}?${searchParams}`);
  };
  //   console.log(searchValue);

  return (
    <div className="flex gap-3 items-center">
      <Input
        placeholder="...search"
        className={"w-56 "}
        // value={searchValue}
        onChange={handelChange}
      />
      <SearchIcon size={25} />
    </div>
  );
};

export default Search;
