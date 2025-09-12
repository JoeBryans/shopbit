import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import {
  CreditCard,
  LayoutDashboard,
  Settings,
  User2,
  UserCheck,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SignOut } from "./components/headers/SignOut";

export const GetUser = async ({ role }) => {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  const currenUser = session?.user;
  if (currenUser) {
    return (
      <div className="flex items-center gap-5 mx-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {currenUser.image === null ? (
              <UserCircle />
            ) : (
              <img src={currenUser?.image} alt="photo" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-5">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>
                  {" "}
                  <Link href={""}>
                    <UserCheck />
                  </Link>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              {role === "seller" ? (
                <DropdownMenuItem>
                  Dashboard
                  <DropdownMenuShortcut>
                    {" "}
                    <Link href={"/dashboard"}>
                      <LayoutDashboard />
                    </Link>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  Orders
                  <DropdownMenuShortcut>
                    {" "}
                    <Link href={""}>
                      <CreditCard />
                    </Link>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>
                  <Link href={""}>
                    <Settings />
                  </Link>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <SignOut />
      </div>
    );
  }

  return (
    <button className="font-medium hover:bg-gray-300 p-2 rounded-lg">
      <Link href={"/sign-in"}>signIn</Link>
    </button>
  );
};
