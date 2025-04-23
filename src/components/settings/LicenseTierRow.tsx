
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Pencil, Trash2, BadgeCheck } from "lucide-react";

interface LicenseTier {
  id: string;
  name: string;
  description: string;
  durationYears: number;
  color: string;
  cost: number;
  default?: boolean;
}

export function LicenseTierRow({
  tier,
  onEdit,
  onDelete,
}: {
  tier: LicenseTier;
  onEdit: (tier: LicenseTier) => void;
  onDelete: (tier: LicenseTier) => void;
}) {
  return (
    <TableRow>
      <TableCell>
        <Badge style={{ backgroundColor: tier.color, color: "#fff" }}>{tier.name}</Badge>
        {tier.default && (
          <span title="Default Tier" className="ml-1 text-green-500"><BadgeCheck className="inline w-4 h-4" /></span>
        )}
      </TableCell>
      <TableCell>{tier.description}</TableCell>
      <TableCell>{tier.durationYears} year{tier.durationYears > 1 && "s"}</TableCell>
      <TableCell>
        {typeof tier.cost === "number" ? `$${tier.cost.toFixed(2)}` : "-"}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(tier)}>
            <Pencil className="w-4 h-4" />
          </Button>
          {!tier.default && (
            <Button variant="destructive" size="icon" onClick={() => onDelete(tier)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
