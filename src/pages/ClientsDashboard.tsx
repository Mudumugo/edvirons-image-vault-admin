
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Eye, RefreshCw, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddClientDialog } from "@/components/AddClientDialog";
import { ImageDetailDialog } from "@/components/ImageDetailDialog";

// Mocked image details for demonstration
const clientImages = {
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

export default function ClientsDashboard() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [clients, setClients] = useState([
    {
      id: "1",
      name: "Kigwa Ridge High School",
      reg_no: "MOE-123456",
      curriculum: "CBC",
      region: "Central",
      country: "Kenya",
      level: "Secondary",
      license: { tier: "Standard", expiresOn: "2026-04-22", status: "Valid" }
    },
    {
      id: "2",
      name: "Makadara Tech College",
      reg_no: "MOE-654321",
      curriculum: "TVET",
      region: "Nairobi",
      country: "Kenya",
      level: "College",
      license: { tier: "Premium", expiresOn: "2025-06-12", status: "Expiring Soon" }
    },
    {
      id: "3",
      name: "Mfangano Island Secondary",
      reg_no: "MOE-789012",
      curriculum: "CBC",
      region: "Nyanza",
      country: "Kenya",
      level: "Secondary",
      license: { tier: "Standard", expiresOn: "2024-08-30", status: "Expired" }
    }
  ]);

  // --- start image detail dialog logic ---
  const [imageDetailOpen, setImageDetailOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const handleShowImageDetail = (clientId: string) => {
    const image = clientImages[clientId];
    if (image) {
      setSelectedImage(image);
      setImageDetailOpen(true);
    }
  };
  // --- end image detail dialog logic ---

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

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Valid":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Valid</Badge>;
      case "Expiring Soon":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Expiring Soon</Badge>;
      case "Expired":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-6 space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold">Clients Management</h1>
          </div>
          <AddClientDialog onAdd={handleAddClient} />
        </header>

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
                      <TableCell>{getStatusBadge(client.license.status)}</TableCell>
                      <TableCell>
                        {clientImages[client.id] ? (
                          <button
                            className="flex items-center gap-1 text-primary hover:underline"
                            onClick={() => handleShowImageDetail(client.id)}
                          >
                            <ImageIcon className="w-5 h-5" />
                            <span className="hidden sm:inline text-xs font-mono">{clientImages[client.id].filename}</span>
                          </button>
                        ) : (
                          <span className="text-xs text-muted-foreground">None</span>
                        )}
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
      </div>
    </>
  );
}
