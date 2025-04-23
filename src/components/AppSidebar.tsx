
import { NavLink } from "react-router-dom";
import { Home, HardDrive, History, Users, Key, Building, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Images", url: "/images", icon: HardDrive },
  { title: "Clients", url: "/clients", icon: Building },
  { title: "Registry", url: "/registry", icon: Search },
  { title: "Logs", url: "/logs", icon: History },
  { title: "Users", url: "/users", icon: Users },
  { title: "Licensing", url: "/license", icon: Key },
  // Renew License entry removed
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        {/* Fancy Edvirons Registry Logo */}
        <div className="flex flex-col items-center pt-6 pb-4">
          <div className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center">
            <span className="text-3xl font-extrabold text-white select-none drop-shadow">
              ER
            </span>
          </div>
          <span className="mt-2 text-lg font-semibold text-primary tracking-wide drop-shadow-sm">
            Edvirons Registry
          </span>
        </div>
        <SidebarGroup>
          {/* You can optionally remove this label below as it's now repeated in the logo */}
          {/* <SidebarGroupLabel>EdVirons Registry</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-3",
                          isActive ? "font-bold text-primary" : "",
                        ].join(" ")
                      }
                      end={item.url === "/dashboard" || item.url === "/images"}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
