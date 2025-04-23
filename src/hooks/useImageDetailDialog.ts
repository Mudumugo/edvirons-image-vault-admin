
import { useState } from "react";

export interface ImageDetail {
  filename: string;
  institution: string;
  type: string;
  version: string;
  uploaded: string;
  uploadedBy: string;
}

export function useImageDetailDialog(clientImages: Record<string, ImageDetail>) {
  const [imageDetailOpen, setImageDetailOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageDetail | null>(null);

  const handleShowImageDetail = (clientId: string) => {
    const image = clientImages[clientId];
    if (image) {
      setSelectedImage(image);
      setImageDetailOpen(true);
    }
  };

  return {
    imageDetailOpen,
    setImageDetailOpen,
    selectedImage,
    handleShowImageDetail,
  };
}
