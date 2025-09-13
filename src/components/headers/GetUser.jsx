"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SignOut } from "./SignOut";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  CreditCard,
  Heart,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCheck,
  UserCircle2Icon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const GetUser = ({ role }) => {
  const { data, status } = useSession();
  const path = usePathname();
  console.log(path);
  const start = path.startsWith("/dashboard");
  const user = data?.user;
  console.log(user);

  if (user) {
    return (
      <div className="flex items-center gap-5 mx-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {user.image === null ? (
              <UserCircle2Icon />
            ) : (
              <Image
                width={100}
                height={100}
                src={user?.image?.trim()}
                alt="photo"
                className="w-8 h-8 rounded-full object-contain cursor-pointer"
              />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 -mx-10 mt-5">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link
                href={"/customer/account"}
                className="hover:bg-gray-300 w-full cursor-pointer flex justify-between rounded p-2"
              >
                Profile
                <UserCheck size={18} />
              </Link>

              {role === "seller" ? (
                <>
                  {start ? (
                    <Link
                      href={"/dashboard"}
                      className="hover:bg-gray-300 w-full cursor-pointer flex justify-between rounded p-2"
                    >
                      Dashboard
                      <LayoutDashboard size={18} />
                    </Link>
                  ) : (
                    <Link
                      href={"/dashboard"}
                      className="hover:bg-gray-300 w-full cursor-pointer flex justify-between rounded p-2"
                    >
                      Dashboard
                      <LayoutDashboard size={18} />
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href={""}
                    className="hover:bg-gray-300 w-full cursor-pointer flex justify-between rounded p-2"
                  >
                    <span>Orders</span>

                    <CreditCard size={18} />
                  </Link>

                  <Link
                    href={""}
                    className="hover:bg-gray-300 w-full cursor-pointer flex justify-between rounded p-2"
                  >
                    {" "}
                    Favourite
                    <Heart size={18} />
                  </Link>
                </>
              )}

              <Link
                href={""}
                className="hover:bg-gray-300 w-full cursor-pointer flex justify-between rounded p-2"
              >
                {" "}
                Settings
                <Settings size={18} />
              </Link>

              <SignOut />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  if (status === "unauthenticated") {
    return (
      // <Button variant={"outline"}>
      <Link href={"/sign-in"} className="font-bold text-white">
        Sign in
      </Link>
      // </Button>
    );
  }
};

export default GetUser;
