
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Eye, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ImageDetailDialog } from "@/components/ImageDetailDialog";
import { useImageDetailDialog, ImageDetail } from "@/hooks/useImageDetailDialog";
import { AddClientDialog } from "@/components/AddClientDialog";
import { ClientStatusBadge } from "@/components/ClientStatusBadge";
import { ClientImageCell } from "@/components/ClientImageCell";

// Mocked image details for demonstration
const clientImages: Record<string, ImageDetail> = {
  "1": {
    filename: "edvirons-kigwa-v1.0.iso",
    institution: "Kigwa Ridge High School",
    type: "Student",
    version: "1.0",
    uploaded: "2025-04-18",
    uploadedBy: "admin@edvirons.com",
  },
  "2": {
    filename: "makadara-tech-v2.iso",
    institution: "Makadara Tech College",
    type: "Teacher",
    version: "2.0",
    uploaded: "2025-03-12",
    uploadedBy: "it@edvirons.com",
  },
  "3": {
    filename: "mfangano-student-v1.iso",
    institution: "Mfangano Island Secondary",
    type: "Student",
    version: "1.0",
    uploaded: "2024-11-08",
    uploadedBy: "devops@edvirons.com",
  }
};

interface ClientsTableProps {
  clients: any[];
  setClients: (v: any[]) => void;
}

export function ClientsTable({ clients, setClients }: ClientsTableProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const {
    imageDetailOpen,
    setImageDetailOpen,
    selectedImage,
    handleShowImageDetail,
  } = useImageDetailDialog(clientImages);

  const handleAddClient = (client: any) => {
    setClients([
      ...clients,
      {
        ...client,
        id: (clients.length + 1).toString(),
        license: {
          tier: "Standard",
          expiresOn: "2026-12-31",
          status: "Valid",
        },
      }
    ]);
  };

  const filtered = clients.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.reg_no.toLowerCase().includes(query.toLowerCase())
  );

  const handleViewClient = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  const handleRenewLicense = (clientId: string) => {
    navigate(`/license/renew?client=${clientId}`);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Institutions</h2>
            <p className="text-sm text-muted-foreground">Manage registered institutions and their licenses</p>
          </div>
          <Input 
            placeholder="Search by name or registration number" 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            className="max-w-sm"
          />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institution</TableHead>
                  <TableHead>Reg No</TableHead>
                  <TableHead>Curriculum</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.reg_no}</TableCell>
                    <TableCell>{client.curriculum}</TableCell>
                    <TableCell>{client.region}</TableCell>
                    <TableCell>{client.license.tier}</TableCell>
                    <TableCell>{client.license.expiresOn}</TableCell>
                    <TableCell>
                      <ClientStatusBadge status={client.license.status} />
                    </TableCell>
                    <TableCell>
                      <ClientImageCell
                        image={clientImages[client.id]}
                        clientId={client.id}
                        onShowDetail={handleShowImageDetail}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewClient(client.id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={() => handleRenewLicense(client.id)}
                          disabled={client.license.status === "Valid"}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Renew
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <ImageDetailDialog
        image={selectedImage}
        open={imageDetailOpen}
        onOpenChange={setImageDetailOpen}
      />
      <div className="flex flex-row-reverse mt-4">
        <AddClientDialog onAdd={handleAddClient} />
      </div>
    </>
  );
}
