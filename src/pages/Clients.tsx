
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ClientsTable } from "@/components/ClientsTable";
import { useClients } from "@/hooks/useClients";

export default function Clients() {
  const { clients, setClients } = useClients();

  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-semibold">Clients</h1>
              <p className="text-sm text-muted-foreground">
                Manage and view all registered institutions
              </p>
            </div>
          </div>
        </header>
        <ClientsTable clients={clients} setClients={setClients} />
      </div>
    </>
  );
}
