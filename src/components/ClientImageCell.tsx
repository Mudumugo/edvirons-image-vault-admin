
import { Image as ImageIcon } from "lucide-react";
import { ImageDetail } from "@/hooks/useImageDetailDialog";

interface ClientImageCellProps {
  image?: ImageDetail;
  clientId: string;
  onShowDetail: (clientId: string) => void;
}

export function ClientImageCell({ image, clientId, onShowDetail }: ClientImageCellProps) {
  if (!image) {
    return <span className="text-xs text-muted-foreground">None</span>;
  }
  return (
    <button
      className="flex items-center gap-1 text-primary hover:underline"
      onClick={() => onShowDetail(clientId)}
    >
      <ImageIcon className="w-5 h-5" />
      <span className="hidden sm:inline text-xs font-mono">{image.filename}</span>
    </button>
  );
}
