
import { useState } from "react";
import Papa from "papaparse";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import type { Institution } from "@/types/institution";

interface BulkUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function BulkUploadDialog({ open, onOpenChange, onSuccess }: BulkUploadDialogProps) {
  const [csvData, setCsvData] = useState<Institution[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Expected headers for the CSV
  const COLUMNS = [
    "id", "name", "level", "curriculum", "region", "country", "type"
  ];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Institution>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        // Validate headers
        const headers = result.meta.fields;
        if (!headers || !COLUMNS.every(c => headers.includes(c))) {
          setCsvData([]);
          setErrors(["CSV missing required columns. Required: " + COLUMNS.join(", ")]);
          return;
        }
        // Preview up to 10 records, accept more for upload
        setCsvData(result.data.slice(0, 1000));
        setErrors([]);
      },
      error: (err) => {
        setCsvData([]);
        setErrors([err.message]);
      },
    });
  }

  async function handleImport() {
    setLoading(true);
    setErrors([]);
    let errCount = 0, okCount = 0;
    for (const inst of csvData) {
      try {
        const res = await fetch("/api/institution", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inst),
        });
        if (!res.ok) {
          errCount++;
        } else {
          okCount++;
        }
      } catch (e) {
        errCount++;
      }
    }
    setLoading(false);
    if (okCount > 0) toast({ title: "Institutions imported", description: `Successfully uploaded ${okCount} institution(s)!` });
    if (errCount > 0) setErrors([`${errCount} institution(s) failed to upload (may exist or have errors).`]);
    if (okCount > 0) {
      setCsvData([]);
      onSuccess();
      onOpenChange(false);
    }
  }

  function handleDialogClose() {
    setCsvData([]);
    setErrors([]);
    setLoading(false);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Bulk Upload Institutions (CSV)</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
            disabled={loading}
            data-testid="csv-input"
          />
          <div className="text-xs text-muted-foreground">
            Required columns: <span className="font-mono">{COLUMNS.join(", ")}</span>
          </div>
          {csvData.length > 0 && (
            <div className="border p-2 rounded">
              <div className="font-medium mb-2 text-sm">Preview ({csvData.length} row{csvData.length > 1 ? "s" : ""}):</div>
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    {COLUMNS.map(c => (
                      <th key={c} className="px-2 py-1 text-left">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.slice(0, 5).map((row, idx) => (
                    <tr key={row.id+"-"+idx}>
                      {COLUMNS.map(c => (
                        <td key={c} className="px-2 py-1">{(row as any)[c]}</td>
                      ))}
                    </tr>
                  ))}
                  {csvData.length > 5 && (
                    <tr>
                      <td colSpan={COLUMNS.length} className="italic px-2 py-1 text-center">
                        ...and {csvData.length - 5} more rows
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {errors.length > 0 && (
            <div className="text-red-500 text-xs">
              {errors.map((err, idx) => <div key={idx}>{err}</div>)}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleImport} disabled={csvData.length === 0 || loading}>
            {loading ? "Importing..." : "Import"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={loading}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
