
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ClientsTable } from "@/components/ClientsTable";

// Mocked initial clients data
const initialClients = [
  {
    id: "1",
    name: "Kigwa Ridge High School",
    reg_no: "MOE-123456",
    curriculum: "CBC",
    region: "Central",
    license: {
      tier: "Standard",
      expiresOn: "2026-12-31",
      status: "Valid",
    }
  },
  {
    id: "2", 
    name: "Makadara Tech College", 
    reg_no: "MOE-789012",
    curriculum: "IGCSE",
    region: "Nairobi",
    license: {
      tier: "Premium",
      expiresOn: "2025-06-30",
      status: "Valid",
    }
  }
];

export default function Clients() {
  const [clients, setClients] = useState(initialClients);

  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-semibold">Clients</h1>
              <p className="text-sm text-muted-foreground">Manage and view all registered institutions</p>
            </div>
          </div>
        </header>
        
        <ClientsTable clients={clients} setClients={setClients} />
      </div>
    </>
  );
}
