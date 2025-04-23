
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InstitutionLookup } from "./image-upload/InstitutionLookup";
import { UploadFields } from "./image-upload/UploadFields";
import { ImageSummary } from "./image-upload/ImageSummary";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import type { Institution } from "@/types/institution";

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
      console.log("Fetching institution with regId:", regId);
      const response = await fetch(`/api/institution/${regId}`);
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error("Institution not found");
      }
      
      const data = await response.json();
      console.log("Received data:", data);
      
      setInstitution(data);
      toast.success("Institution found");
    } catch (err) {
      console.error("Failed to fetch institution:", err);
      setInstitution(null);
      toast.error("Institution not found or error fetching data");
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
    formData.append("file", file);
    formData.append("regId", regId);
    formData.append("type", type);
    formData.append("version", version);
    formData.append("hash", hash);

    console.log("Submitting:", {
      filename: generateFileName(),
      institution: institution.name,
      type,
      version,
      hash,
    });

    toast.success("Image uploaded successfully");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Upload OS Image</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <InstitutionLookup
              regId={regId}
              setRegId={setRegId}
              loading={loading}
              fetchInstitution={fetchInstitution}
            />
            <p className="text-xs text-muted-foreground flex justify-between">
              <span>Enter the MOE registration number to look up the institution</span>
              <Link to="/registry" className="text-primary hover:underline">
                Manage Registry
              </Link>
            </p>
          </div>

          {institution && (
            <>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-lg">{institution.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {institution.level} • {institution.curriculum} • {institution.region}, {institution.country}
                </p>
              </div>

              <UploadFields
                type={type}
                setType={setType}
                version={version}
                setVersion={setVersion}
                file={file}
                setFile={setFile}
                handleFileChange={handleFileChange}
              />

              {file && (
                <ImageSummary
                  filename={generateFileName()}
                  hash={hash}
                />
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
