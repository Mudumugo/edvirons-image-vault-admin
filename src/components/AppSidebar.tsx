
import { NavLink } from "react-router-dom";
import { Home, HardDrive, History, Users, Key, Building, Search } from "lucide-react";
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
  { title: "Renew License", url: "/license/renew", icon: Key },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>EdVirons Registry</SidebarGroupLabel>
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
