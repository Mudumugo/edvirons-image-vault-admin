
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { Institution } from "@/types/institution";

interface EditInstitutionDialogProps {
  institution: Institution;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditInstitutionDialog({ 
  institution,
  open, 
  onOpenChange, 
  onSuccess 
}: EditInstitutionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ ...institution });

  // Reset form data when institution changes
  useEffect(() => {
    setFormData({ ...institution });
  }, [institution]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.region) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/institution/${institution.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update institution");
      }
      
      toast.success("Institution updated successfully");
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating institution:", error);
      toast.error("Failed to update institution");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Institution</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">Registration Number</Label>
            <Input
              id="id"
              name="id"
              value={formData.id}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">Registration number cannot be changed</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Institution Name*</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Kibera High School"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Education Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="TVET">TVET</SelectItem>
                  <SelectItem value="University">University</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="curriculum">Curriculum</Label>
              <Select
                value={formData.curriculum}
                onValueChange={(value) => handleSelectChange("curriculum", value)}
              >
                <SelectTrigger id="curriculum">
                  <SelectValue placeholder="Select curriculum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CBC">CBC</SelectItem>
                  <SelectItem value="8-4-4">8-4-4</SelectItem>
                  <SelectItem value="CDACC">CDACC</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">Region/County*</Label>
              <Input
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="e.g., Nairobi"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleSelectChange("country", value)}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KE">Kenya</SelectItem>
                  <SelectItem value="UG">Uganda</SelectItem>
                  <SelectItem value="TZ">Tanzania</SelectItem>
                  <SelectItem value="RW">Rwanda</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Type selection */}
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Institution"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
