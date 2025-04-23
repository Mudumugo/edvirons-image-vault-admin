
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function LicenseManager() {
  const [regId, setRegId] = useState("");
  const [license, setLicense] = useState<null | {
    license: {
      institution: string;
      reg_no: string;
      license_type: string;
      issued_on: string;
      expires_on: string;
      device_hash: string;
    };
    signature: string;
  }>(null);

  const mockFetchInstitution = () => {
    // Placeholder for real API call
    return {
      name: "Kigwa Ridge High School",
      reg_no: regId,
      device_hash: "ABC123DEF456",
    };
  };

  const generateLicense = () => {
    const inst = mockFetchInstitution();
    setLicense({
      license: {
        institution: inst.name,
        reg_no: inst.reg_no,
        license_type: "Standard",
        issued_on: new Date().toISOString().split("T")[0],
        expires_on: "2026-04-22",
        device_hash: inst.device_hash,
      },
      signature: "SIGNATURE_HASH_HERE",
    });
  };

  const downloadLicense = () => {
    if (!license) return;
    const content = JSON.stringify(license, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${license.license.reg_no || "license"}.license`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">License Manager</h2>

      <Card className="mb-4">
        <CardHeader className="font-semibold">Lookup Institution</CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Enter Institution Reg No"
            value={regId}
            onChange={(e) => setRegId(e.target.value)}
          />
          <Button onClick={generateLicense} disabled={!regId.trim()}>Generate License</Button>
        </CardContent>
      </Card>

      {license && (
        <Card className="mt-4">
          <CardHeader className="font-semibold flex justify-between items-center">
            License for: {license.license.institution}
            <Badge variant="outline">VALID</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Reg No:</strong> {license.license.reg_no}</div>
            <div><strong>Issued:</strong> {license.license.issued_on}</div>
            <div><strong>Expires:</strong> {license.license.expires_on}</div>
            <div><strong>Device Hash:</strong> {license.license.device_hash}</div>
            <Textarea
              value={JSON.stringify(license, null, 2)}
              className="mt-2 text-xs"
              rows={10}
              readOnly
            />
            <Button variant="secondary" onClick={downloadLicense}>Download .license File</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
