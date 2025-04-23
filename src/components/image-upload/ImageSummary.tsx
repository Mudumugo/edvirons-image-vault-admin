
import { Label } from "@/components/ui/label";

interface ImageSummaryProps {
  filename: string;
  hash: string;
}

export function ImageSummary({ filename, hash }: ImageSummaryProps) {
  return (
    <div className="p-4 bg-secondary/50 rounded-lg">
      <Label>Generated Filename</Label>
      <p className="font-mono text-sm mt-1">{filename}</p>
      <Label className="mt-2 block">SHA-256 Hash</Label>
      <p className="font-mono text-sm text-muted-foreground">{hash}</p>
    </div>
  );
}
