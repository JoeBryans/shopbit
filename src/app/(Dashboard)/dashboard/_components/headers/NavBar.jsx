import React from "react";
import Searchs from "@/components/headers/Search";
import { CartBar } from "@/components/headers/cartbar";
import GetUser from "@/components/headers/GetUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as FaIcons from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Search from "./Search";
const NavBar = ({ label, href, seachBar }) => {
  const items = [
    {
      title: "DashBoard",
      url: "/dashboard",
    },
    {
      title: "Product",
      url: "/dashboard/products",
    },
    {
      title: "Order",
      url: "/dashboard/orders",
    },
    {
      title: "Revenue",
      url: "/dashboard/revenue",
    },
    // {
    //   title: "Inbox",
    //   url: "#",
    //   icon: Inbox,
    // },
    {
      title: "Customers",
      url: "#",
    },
    // {
    //   title: "Calendar",
    //   url: "#",
    //   icon: Calendar,
    // },

    {
      title: "Settings",
      url: "/dashboard/settings",
    },
  ];
  // bg-[#BA68C8]
  return (
    <div
      className={`
         flex items-center  w-full  py-1 mx-auto  justify-end
    px-10`}
    >
      <div className="w-2/5  flex items-center  gap-10  px-5 py-1   ">
        {seachBar ? <Search /> : null}

        {label ? (
          <Button variant={"primary"} className="flex items-center gap-1">
            <Link href={href} className="text-xl">
              {label}
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
