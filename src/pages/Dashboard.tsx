
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Download, Eye, Trash2 } from "lucide-react";

const images = [
  {
    filename: "edvirons-kibera-v1.2-student.iso",
    institution: "Kibera Secondary",
    type: "Student",
    version: "1.2",
    uploaded: "2025-04-21",
    uploadedBy: "admin@edvirons.com"
  },
  {
    filename: "edvirons-mfangano-v1.0-teacher.iso",
    institution: "Mfangano High",
    type: "Teacher",
    version: "1.0",
    uploaded: "2025-04-15",
    uploadedBy: "devops@edvirons.com"
  }
];

export default function Dashboard() {
  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold">OS Image Registry</h1>
          </div>
          <Button variant="default" className="bg-primary hover:bg-primary/90">
            Upload New Image
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {images.map((img, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate">{img.filename}</h3>
                <p className="text-sm text-muted-foreground">
                  {img.institution} • {img.type} • v{img.version}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Uploaded: {img.uploaded} • By: {img.uploadedBy}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
