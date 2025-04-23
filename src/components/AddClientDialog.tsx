
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface AddClientDialogProps {
  onAdd: (client: {
    name: string;
    reg_no: string;
    curriculum: string;
    region: string;
    country: string;
    level: string;
    contact?: string;
  }) => void;
}

export function AddClientDialog({ onAdd }: AddClientDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    reg_no: "",
    curriculum: "",
    region: "",
    country: "",
    level: "",
    contact: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.reg_no && form.curriculum && form.level && form.region && form.country) {
      onAdd(form);
      setForm({
        name: "",
        reg_no: "",
        curriculum: "",
        region: "",
        country: "",
        level: "",
        contact: "",
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <span className="font-semibold text-lg">+</span>
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>Enter institution information below:</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            required
            label="Institution Name"
            name="name"
            placeholder="e.g. Greenfields School"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            required
            label="Registration Number"
            name="reg_no"
            placeholder="e.g. MOE-123456"
            value={form.reg_no}
            onChange={handleChange}
          />
          <Input
            required
            label="Curriculum"
            name="curriculum"
            placeholder="e.g. CBC, TVET"
            value={form.curriculum}
            onChange={handleChange}
          />
          <Input
            required
            label="Region"
            name="region"
            placeholder="e.g. Nairobi"
            value={form.region}
            onChange={handleChange}
          />
          <Input
            required
            label="Country"
            name="country"
            placeholder="e.g. Kenya"
            value={form.country}
            onChange={handleChange}
          />
          <Input
            required
            label="Level"
            name="level"
            placeholder="e.g. Primary, Secondary, College"
            value={form.level}
            onChange={handleChange}
          />
          <Input
            label="Contact Email (optional)"
            name="contact"
            placeholder="admin@institution.org"
            type="email"
            value={form.contact}
            onChange={handleChange}
          />
          <DialogFooter className="pt-3">
            <Button type="submit" variant="default">
              Add Client
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
