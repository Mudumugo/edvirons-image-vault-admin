import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHome from "./pages/DashboardHome";
import Images from "./pages/Images";
import Index from "./pages/Index";
import LicenseManager from "./pages/LicenseManager";
import RenewLicensePage from "./pages/RenewLicensePage";
import ClientDetail from "./pages/ClientDetail";
import Registry from "./pages/Registry";
import Clients from "./pages/Clients";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/images" element={<Images />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/license" element={<LicenseManager />} />
              {/* Removed /license/renew route */}
              <Route path="/clients/:id" element={<ClientDetail />} />
              <Route path="/registry" element={<Registry />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
