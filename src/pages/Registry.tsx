
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { RegistryTable } from "@/components/registry/RegistryTable";
import { AddInstitutionDialog } from "@/components/registry/AddInstitutionDialog";
import { useFetchRegistry } from "@/hooks/useFetchRegistry";

export default function Registry() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: institutions, isLoading, refetch } = useFetchRegistry();

  const filteredInstitutions = institutions?.filter(
    (institution) =>
      institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.curriculum.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-6 space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold">Institution Registry</h1>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Institution
          </Button>
        </header>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle>Registered Institutions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage MOE registered institutions
              </p>
            </div>
            <Input
              placeholder="Search by name, ID or region"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </CardHeader>
          <CardContent>
            <RegistryTable 
              institutions={filteredInstitutions} 
              isLoading={isLoading}
              onRefresh={refetch}
            />
          </CardContent>
        </Card>

        <AddInstitutionDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen} 
          onSuccess={refetch}
        />
      </div>
    </>
  );
}
