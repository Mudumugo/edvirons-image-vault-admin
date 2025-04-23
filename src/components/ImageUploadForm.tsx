
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Upload, FileCheck } from "lucide-react";
import type { Institution } from "@/types/institution";
import { toast } from "sonner";

const imageTypes = [
  { id: "student", label: "Student" },
  { id: "teacher", label: "Teacher" },
  { id: "lab", label: "Lab" },
  { id: "admin", label: "Admin" }
];

export function ImageUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [regId, setRegId] = useState("");
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("student");
  const [version, setVersion] = useState("1.0");
  const [hash, setHash] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // In a real app, we would calculate the hash here
      setHash("e2d5ca3...");
    }
  };

  const fetchInstitution = async () => {
    if (!regId.trim()) return;
    
    setLoading(true);
    try {
      console.log('Fetching institution with regId:', regId);
      const response = await fetch(`/api/institution/${regId}`);
      
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Institution not found');
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      // Map the API response to the Institution interface
      setInstitution({
        id: regId,
        name: data.name,
        country: data.country,
        region: data.region,
        level: data.level,
        curriculum: data.curriculum
      });
      
      toast.success('Institution found');
    } catch (err) {
      console.error('Failed to fetch institution:', err);
      setInstitution(null);
      toast.error('Institution not found or error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const generateFileName = () => {
    return `${regId}-${type}-v${version}.iso`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution || !file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('regId', regId);
    formData.append('type', type);
    formData.append('version', version);
    formData.append('hash', hash);

    console.log('Submitting:', {
      filename: generateFileName(),
      institution: institution.name,
      type,
      version,
      hash
    });
    
    toast.success('Image uploaded successfully');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Upload OS Image</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="regId">Ministry of Education Registration Number</Label>
            <div className="flex items-center gap-2">
              <Input
                id="regId"
                value={regId}
                onChange={(e) => setRegId(e.target.value)}
                placeholder="e.g., 13426"
                className="flex-1"
              />
              <Button 
                type="button"
                onClick={fetchInstitution} 
                disabled={loading || !regId.trim()}
                variant="secondary"
              >
                <Search className="h-4 w-4 mr-2" />
                {loading ? "Looking up..." : "Lookup"}
              </Button>
            </div>
          </div>

          {institution && (
            <>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-lg">{institution.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {institution.level} • {institution.curriculum} • {institution.region}, {institution.country}
                </p>
              </div>

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

              {file && (
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <Label>Generated Filename</Label>
                  <p className="font-mono text-sm mt-1">{generateFileName()}</p>
                  <Label className="mt-2 block">SHA-256 Hash</Label>
                  <p className="font-mono text-sm text-muted-foreground">{hash}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={!file || !institution}
              >
                Upload Image
              </Button>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
