
import { Badge } from "@/components/ui/badge";

interface ClientStatusBadgeProps {
  status: string;
}

export function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  switch (status) {
    case "Valid":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Valid</Badge>;
    case "Expiring Soon":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Expiring Soon</Badge>;
    case "Expired":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Expired</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
