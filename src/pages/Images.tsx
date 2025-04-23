
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageUploadForm } from "@/components/ImageUploadForm";
import { Plus, Eye, Download, Trash } from "lucide-react";
import { useState } from "react";
import { ImageDetailDialog } from "@/components/ImageDetailDialog";

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

export default function Images() {
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  const handleView = (img: typeof images[0]) => {
    setSelectedImage(img);
    setDetailOpen(true);
  };

  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Image Management</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                onClick={() => setOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add New Image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload OS Image</DialogTitle>
              </DialogHeader>
              <ImageUploadForm />
            </DialogContent>
          </Dialog>
        </div>
        <div>
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
                    <Button variant="outline" size="sm" onClick={() => handleView(img)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <ImageDetailDialog
          image={selectedImage}
          open={detailOpen}
          onOpenChange={setDetailOpen}
        />
      </div>
    </>
  );
}
