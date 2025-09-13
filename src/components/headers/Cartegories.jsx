"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

function Categories() {
  const router = useRouter();
  const [category, setCategory] = React.useState("all");
  const [categoryList, setCategoryList] = React.useState([]);
  const searchParams = useSearchParams();

  console.log(categoryList);

  React.useEffect(() => {
    const FetchList = async () => {
      const res = await fetch("https://dummyjson.com/products/category-list");
      const data = await res.json();
      setCategoryList(data);
    };
    FetchList();
  }, [searchParams]);
  console.log("category from header", category);

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);
    setCategory(value);
    params.set("category", value);
    const filtal = params.toString();
    router.push(`/?${filtal}`);
  };
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="product by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Product Categories</SelectLabel>
          {categoryList &&
            categoryList.map((item, index) => {
              return (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              );
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Categories;
