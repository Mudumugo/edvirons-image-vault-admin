
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageUploadForm } from "@/components/ImageUploadForm";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Images() {
  const [open, setOpen] = useState(false);

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
        <Card>
          <CardContent className="p-6">
            <div className="text-muted-foreground">
              Manage, upload, and view OS images for client devices here.
              {/* Add real image listing/upload functionality here later */}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
