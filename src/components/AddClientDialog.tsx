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
            name="name"
            placeholder="Institution Name (e.g. Greenfields School)"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            required
            name="reg_no"
            placeholder="Registration Number (e.g. MOE-123456)"
            value={form.reg_no}
            onChange={handleChange}
          />
          <Input
            required
            name="curriculum"
            placeholder="Curriculum (e.g. CBC, TVET)"
            value={form.curriculum}
            onChange={handleChange}
          />
          <Input
            required
            name="region"
            placeholder="Region (e.g. Nairobi)"
            value={form.region}
            onChange={handleChange}
          />
          <Input
            required
            name="country"
            placeholder="Country (e.g. Kenya)"
            value={form.country}
            onChange={handleChange}
          />
          <Input
            required
            name="level"
            placeholder="Institution Level (e.g. Primary, Secondary, College)"
            value={form.level}
            onChange={handleChange}
          />
          <Input
            name="contact"
            placeholder="Contact Email (admin@institution.org)"
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
