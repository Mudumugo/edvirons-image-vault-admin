
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, BadgeCheck, BadgeAlert } from "lucide-react";

interface LicenseTier {
  id: string;
  name: string;
  description: string;
  durationYears: number;
  color: string;
  cost: number;
  default?: boolean;
}

const defaultTiers: LicenseTier[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Single year license for basic compliance.",
    durationYears: 1,
    color: "#8E9196",
    cost: 0,
    default: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Three years license with premium support.",
    durationYears: 3,
    color: "#9b87f5",
    cost: 0,
  },
];

function LicenseTierRow({
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

export function LicenseTierSettings() {
  const [tiers, setTiers] = useState<LicenseTier[]>(defaultTiers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTier, setEditTier] = useState<LicenseTier | null>(null);
  const [deleteTier, setDeleteTier] = useState<LicenseTier | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    durationYears: 1,
    color: "#9b87f5",
    cost: 0,
  });

  function openNew() {
    setEditTier(null);
    setForm({ name: "", description: "", durationYears: 1, color: "#9b87f5", cost: 0 });
    setDialogOpen(true);
  }

  function openEdit(tier: LicenseTier) {
    setEditTier(tier);
    setForm({
      name: tier.name,
      description: tier.description,
      durationYears: tier.durationYears,
      color: tier.color,
      cost: tier.cost ?? 0,
    });
    setDialogOpen(true);
  }

  function handleFormChange(field: string, val: string | number) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function saveTier() {
    if (!form.name.trim()) return;
    if (editTier) {
      setTiers((prev) =>
        prev.map((t) =>
          t.id === editTier.id
            ? { ...t, ...form, id: editTier.id }
            : t
        )
      );
    } else {
      setTiers((prev) => [
        ...prev,
        {
          id: form.name.toLowerCase().replace(/\s+/g, "-"),
          ...form,
        },
      ]);
    }
    setDialogOpen(false);
  }

  function handleDelete(tier: LicenseTier) {
    setTiers((prev) => prev.filter((t) => t.id !== tier.id));
    setDeleteTier(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>License Tiers</CardTitle>
        <CardDescription>
          Manage the license tiers available for your institutions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button onClick={openNew}>Add License Tier</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiers.map((tier) => (
                <LicenseTierRow
                  key={tier.id}
                  tier={tier}
                  onEdit={openEdit}
                  onDelete={setDeleteTier}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editTier ? "Edit License Tier" : "Add License Tier"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Tier Name"
              value={form.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              disabled={!!editTier?.default}
              maxLength={24}
            />
            <Input
              placeholder="Description"
              value={form.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              maxLength={80}
            />
            <Input
              type="number"
              min={1}
              max={10}
              placeholder="Duration in Years"
              value={form.durationYears}
              onChange={(e) => handleFormChange("durationYears", Number(e.target.value))}
            />
            <Input
              type="number"
              min={0}
              step="0.01"
              placeholder="Cost (USD)"
              value={form.cost}
              onChange={(e) => handleFormChange("cost", Number(e.target.value))}
            />
            <div className="flex items-center gap-2">
              <span>Color:</span>
              <Input
                type="color"
                value={form.color}
                onChange={(e) => handleFormChange("color", e.target.value)}
                className="w-10 h-10 p-0 border-none focus:ring-0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveTier}>{editTier ? "Save Changes" : "Add Tier"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation Dialog */}
      <Dialog open={!!deleteTier} onOpenChange={(v) => v ? undefined : setDeleteTier(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove License Tier</DialogTitle>
          </DialogHeader>
          <div>Are you sure you want to <span className="font-semibold text-destructive">remove</span> the <b>{deleteTier?.name}</b> license tier? This action cannot be undone.</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTier(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteTier && handleDelete(deleteTier)}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default LicenseTierSettings;
