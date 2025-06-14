
import { NavLink } from "react-router-dom";
import { Home, HardDrive, History, Users, Key, Building, Search, Settings, Sparkles } from "lucide-react";
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
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
      <SidebarContent>
        {/* Enhanced Logo Section */}
        <div className="flex flex-col items-center pt-8 pb-6 border-b border-slate-200/50 dark:border-slate-700/50 mx-4">
          <div className="relative group">
            <div className="w-16 h-16 rounded-2xl shadow-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <span className="text-4xl font-black text-white select-none drop-shadow-lg">
                ER
              </span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
          <div className="mt-4 text-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-wide">
              Edvirons Registry
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              v2.0 • Modern Platform
            </p>
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden",
                          isActive 
                            ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 dark:text-purple-300 font-semibold shadow-sm" 
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                        ].join(" ")
                      }
                      end={item.url === "/dashboard" || item.url === "/images"}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl"></div>
                          )}
                          <item.icon className={`h-5 w-5 transition-all duration-200 ${
                            isActive ? "text-purple-600 dark:text-purple-400" : "group-hover:scale-110"
                          }`} />
                          <span className="relative z-10">{item.title}</span>
                          {isActive && (
                            <div className="absolute right-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Modern Footer */}
        <div className="mt-auto p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Powered by Advanced AI
            </div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
