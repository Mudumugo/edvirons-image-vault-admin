
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Download, Clock, Shield } from "lucide-react";

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you would fetch this data based on the ID
  const client = {
    id: id || "1",
    name: "Kigwa Ridge High School",
    reg_no: "MOE-123456",
    curriculum: "CBC",
    region: "Central",
    country: "Kenya",
    level: "Secondary",
    licenses: [
      { 
        id: "lic-001",
        tier: "Standard", 
        issuedOn: "2023-04-22", 
        expiresOn: "2024-04-22", 
        status: "Expired" 
      },
      { 
        id: "lic-002",
        tier: "Standard", 
        issuedOn: "2024-04-23", 
        expiresOn: "2025-04-22", 
        status: "Valid" 
      }
    ],
    devices: [
      {
        hash: "DEV-H8S9D7F",
        osVersion: "EdVirons 1.2",
        lastSync: "2024-04-20"
      },
      {
        hash: "DEV-K7L9M2N",
        osVersion: "EdVirons 1.1",
        lastSync: "2024-03-15"
      }
    ],
    contacts: {
      admin: "principal@kigwaridge.edu",
      technical: "ict@kigwaridge.edu",
      billing: "accounts@kigwaridge.edu"
    }
  };

  const handleRenewLicense = () => {
    navigate(`/license/renew?client=${id}`);
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
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-semibold">{client.name}</h1>
              <p className="text-sm text-muted-foreground">Registration: {client.reg_no}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/clients")}>
              Back to Clients
            </Button>
            <Button onClick={handleRenewLicense}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Renew License
            </Button>
          </div>
        </header>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="info">Institution Info</TabsTrigger>
            <TabsTrigger value="licenses">Licenses</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Institution Details</CardTitle>
                <CardDescription>
                  Basic information about the institution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Name</h3>
                    <p>{client.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Registration Number</h3>
                    <p>{client.reg_no}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Curriculum</h3>
                    <p>{client.curriculum}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Level</h3>
                    <p>{client.level}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Region</h3>
                    <p>{client.region}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Country</h3>
                    <p>{client.country}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Admin Contact</h3>
                      <p>{client.contacts.admin}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Technical Contact</h3>
                      <p>{client.contacts.technical}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Billing Contact</h3>
                      <p>{client.contacts.billing}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="licenses">
            <Card>
              <CardHeader>
                <CardTitle>License History</CardTitle>
                <CardDescription>
                  All licenses issued to this institution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>License ID</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Issued On</TableHead>
                      <TableHead>Expires On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.licenses.map((license) => (
                      <TableRow key={license.id}>
                        <TableCell>{license.id}</TableCell>
                        <TableCell>{license.tier}</TableCell>
                        <TableCell>{license.issuedOn}</TableCell>
                        <TableCell>{license.expiresOn}</TableCell>
                        <TableCell>{getStatusBadge(license.status)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Registered Devices</CardTitle>
                <CardDescription>
                  Devices with EdVirons OS installed for this institution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device Hash</TableHead>
                      <TableHead>OS Version</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.devices.map((device) => (
                      <TableRow key={device.hash}>
                        <TableCell>{device.hash}</TableCell>
                        <TableCell>{device.osVersion}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            {device.lastSync}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Shield className="h-4 w-4 mr-1" />
                              Verify
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
