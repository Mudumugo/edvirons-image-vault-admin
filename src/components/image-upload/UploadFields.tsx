
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileCheck } from "lucide-react";

const imageTypes = [
  { id: "student", label: "Student" },
  { id: "teacher", label: "Teacher" },
  { id: "lab", label: "Lab" },
  { id: "admin", label: "Admin" }
];

interface UploadFieldsProps {
  type: string;
  setType: (v: string) => void;
  version: string;
  setVersion: (v: string) => void;
  file: File | null;
  setFile: (f: File | null) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadFields({
  type,
  setType,
  version,
  setVersion,
  file,
  handleFileChange,
}: UploadFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Image Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {imageTypes.map(({id, label}) => (
                <SelectItem key={id} value={id}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="version">Version</Label>
          <Input
            id="version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="e.g., 1.0"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">ISO Image</Label>
        <div className="flex items-center gap-4">
          <Input
            id="file"
            type="file"
            accept=".iso"
            onChange={handleFileChange}
            className="flex-1"
          />
          {file ? (
            <FileCheck className="h-5 w-5 text-green-500" />
          ) : (
            <Upload className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>
    </>
  );
}
