
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Image as ImageIcon, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ImageData {
  filename: string;
  institution: string;
  type: string;
  version: string;
  uploaded: string;
  uploadedBy: string;
}

interface ImageDetailDialogProps {
  image: ImageData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageDetailDialog({ image, open, onOpenChange }: ImageDetailDialogProps) {
  if (!image) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="text-primary" /> Image Details
          </DialogTitle>
        </DialogHeader>
        <Card className="bg-muted/40 px-4 py-6">
          <div className="mb-4">
            <span className="font-bold text-lg">{image.filename}</span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Institution: </span>
              <span>{image.institution}</span>
            </div>
            <div>
              <span className="font-semibold">Type: </span>
              <span>{image.type}</span>
            </div>
            <div>
              <span className="font-semibold">Version: </span>
              <span>{image.version}</span>
            </div>
            <div>
              <span className="font-semibold">Uploaded: </span>
              <span>{image.uploaded}</span>
            </div>
            <div>
              <span className="font-semibold">Uploaded By: </span>
              <span>{image.uploadedBy}</span>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
