
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface InstitutionLookupProps {
  regId: string;
  setRegId: (val: string) => void;
  loading: boolean;
  fetchInstitution: () => void;
}

export function InstitutionLookup({
  regId,
  setRegId,
  loading,
  fetchInstitution,
}: InstitutionLookupProps) {
  return (
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
  );
}
