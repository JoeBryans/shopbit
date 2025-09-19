"use client";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Search, SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Searchs() {
  const [search, setSearch] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SearchIcon size={20} className="cursor-pointer " />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="opacity-80">Search for product</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4 ">
          <Input
            id="search"
            placeholder="search..."
            className="col-span-3 font-semibold "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link href={`/product?q=${encodeURI(search)}`}>
            <Search size={30} className="cursor-pointer "
            /></Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
