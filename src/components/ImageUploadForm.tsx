
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import type { Institution } from "@/types/institution";

const imageTypes = [
  "Student",
  "Teacher",
  "Lab",
  "Admin"
];

export function ImageUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [institution, setInstitution] = useState<string>("");
  const [imageType, setImageType] = useState<string>("");
  const [version, setVersion] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // In a real app, we would calculate the hash here
      setHash("e2d5ca3...");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Uploading:", { file, institution, imageType, version, hash });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Upload New OS Image</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Select value={institution} onValueChange={setInstitution}>
              <SelectTrigger id="institution">
                <SelectValue placeholder="Select institution" />
              </SelectTrigger>
              <SelectContent>
                {["Kibera Secondary", "Mfangano High", "Kakuma Secondary", "Other"].map((inst) => (
                  <SelectItem key={inst} value={inst}>
                    {inst}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Image Type</Label>
            <Select value={imageType} onValueChange={setImageType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {imageTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              type="text"
              placeholder="e.g. 1.0.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>

          {hash && (
            <div className="p-4 bg-secondary/50 rounded-lg">
              <Label>SHA-256 Hash</Label>
              <p className="font-mono text-sm text-muted-foreground">{hash}</p>
            </div>
          )}

          <Button type="submit" className="w-full">
            Upload Image
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
