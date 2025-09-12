"use client";
import React from "react";
import { CartBar } from "./cartbar";
import Searchs from "./Search";
import Logo from "./Logo";
import GetUser from "./GetUser";
import { usePathname } from "next/navigation";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

const Navigator = () => {
  const path = usePathname();
  const start = path.startsWith("/dashboard");

  const role = "seller";

  return (
    <div className="w-full">
      {start ? (
        <div className="w-full flex items-center ">
          <div className="flex items-center justify-between  max-w-[75rem] w-[90%]  mx-auto py-3 p-3 ">
            <Logo />
            <ul className="flex  items-center gap-8  ">
              {/* <li className="flex items-center gap-2 ">
                <Searchs />
              </li> */}
              <li className="flex items-center gap-2 ">
                <FaIcons.FaBell size={20} />
              </li>
              {/* <li className="flex items-center gap-2 ">
                <Button variant={"primary"} className="hidden md:block">
                  <Link href={"/dashboard/add-product"}> Products</Link>
                </Button>
              </li> */}

              <li>
                <GetUser role={role} />
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex  items-center max-w-[65rem] w-[90%]  mx-auto py-3">
          <div className="w-full hidden md:flex justify-between items-center">
            <Logo />
            <ul className="flex items-center gap-8  ">
              <li className="flex items-center gap-2 ">
                <Searchs />
              </li>
              <li className="flex items-center gap-2   ">
                <AiIcons.AiOutlineHeart size={20} className="cursor-pointer " />
              </li>
              <li className="flex items-center gap-2 relative">
                <CartBar />
              </li>

              <li>
                <GetUser role={role} />
              </li>
            </ul>
          </div>
          {/* small screen */}
          <div className="w-full md:hidden flex justify-between items-center">
            <Logo />
            <ul className="flex items-center gap-8  ">
              <li className="flex items-center gap-2 ">
                <Searchs />
              </li>
              {/* <li className="flex items-center gap-2   ">
                <Heart color="red" size={30} className="cursor-pointer " />
              </li> */}
              <li className="flex items-center gap-2 relative">
                <CartBar />

                <GetUser role={role} />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigator;
