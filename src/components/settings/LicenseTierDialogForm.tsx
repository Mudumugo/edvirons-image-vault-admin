
import { Input } from "@/components/ui/input";
import { DialogHeader, DialogTitle, DialogFooter, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface LicenseTierFormProps {
  initial?: {
    name: string;
    description: string;
    durationYears: number;
    color: string;
    cost: number;
    default?: boolean;
  };
  mode: "add" | "edit";
  open: boolean;
  onConfirm: (form: { name: string; description: string; durationYears: number; color: string; cost: number }) => void;
  onClose: () => void;
}

export function LicenseTierDialogForm({ initial, mode, open, onConfirm, onClose }: LicenseTierFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    durationYears: 1,
    color: "#9b87f5",
    cost: 0,
  });

  useEffect(() => {
    if (open) {
      setForm({
        name: initial?.name || "",
        description: initial?.description || "",
        durationYears: initial?.durationYears ?? 1,
        color: initial?.color || "#9b87f5",
        cost: initial?.cost ?? 0,
      });
    }
  }, [open, initial]);

  function handleFormChange(field: string, val: string | number) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{mode === "edit" ? "Edit License Tier" : "Add License Tier"}</DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        <Input
          placeholder="Tier Name"
          value={form.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
          disabled={!!initial?.default}
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
        <Button onClick={() => onConfirm(form)}>{mode === "edit" ? "Save Changes" : "Add Tier"}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
