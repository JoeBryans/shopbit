import {
  // Calendar,
  // Home,
  // Inbox,
  // Search,
  Settings,
  LayoutDashboard,
  // SearchCheck,
  BaggageClaim,
  HandCoinsIcon,
  User2,
} from "lucide-react";
import { CreditCard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  // SidebarGroupLabel,
  // SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import Logo from "./headers/Logo";

// Menu items.
const items = [
  {
    title: "DashBoard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Product",
    url: "/dashboard/products",
    icon: BaggageClaim,
  },
  {
    title: "Order",
    url: "/dashboard/orders",
    icon: CreditCard,
  },
  {
    title: "Revenue",
    url: "/dashboard/revenue",
    icon: HandCoinsIcon,
  },
  // {
  //   title: "Inbox",
  //   url: "#",
  //   icon: Inbox,
  // },
  {
    title: "Customers",
    url: "customers",
    icon: User2,
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },

  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

const SideBar = () => {
  return (
    <div className="flex flex-col border-0 overflow-hidden  bg-blue-500 w-44">
      <div className=" ">
        <Sidebar className="border-0 ">
          <SidebarHeader>
            <div className="flex items-end justify-end text-right  w-full">
              <Logo />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="cursor-pointer hover:bg-slate-200 w-max px-2 mt-4"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
      <div></div>
    </div>
  );
};

export default SideBar;
