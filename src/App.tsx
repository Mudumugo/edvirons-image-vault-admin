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
import ClientsDashboard from "./pages/ClientsDashboard";
import ClientDetail from "./pages/ClientDetail";

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
              <Route path="/license" element={<LicenseManager />} />
              <Route path="/license/renew" element={<RenewLicensePage />} />
              <Route path="/clients" element={<ClientsDashboard />} />
              <Route path="/clients/:id" element={<ClientDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
