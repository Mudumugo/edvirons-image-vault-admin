
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditInstitutionDialog } from "./EditInstitutionDialog";
import { DeleteInstitutionDialog } from "./DeleteInstitutionDialog";
import { Edit, Trash } from "lucide-react";
import type { Institution } from "@/types/institution";

interface RegistryTableProps {
  institutions: Institution[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function RegistryTable({ institutions, isLoading, onRefresh }: RegistryTableProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  const handleEdit = (institution: Institution) => {
    setSelectedInstitution(institution);
    setEditDialogOpen(true);
  };

  const handleDelete = (institution: Institution) => {
    setSelectedInstitution(institution);
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reg Number</TableHead>
              <TableHead>Institution Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Curriculum</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">Loading...</TableCell>
              </TableRow>
            ) : institutions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">No institutions found</TableCell>
              </TableRow>
            ) : (
              institutions.map((institution) => (
                <TableRow key={institution.id}>
                  <TableCell className="font-mono">{institution.id}</TableCell>
                  <TableCell className="font-medium">{institution.name}</TableCell>
                  <TableCell>{institution.level}</TableCell>
                  <TableCell>{institution.curriculum}</TableCell>
                  <TableCell>{institution.region}</TableCell>
                  <TableCell>{institution.country}</TableCell>
                  <TableCell className="capitalize">{institution.type}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(institution)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(institution)}>
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedInstitution && (
        <>
          <EditInstitutionDialog
            institution={selectedInstitution}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onSuccess={onRefresh}
          />
          <DeleteInstitutionDialog
            institution={selectedInstitution}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onSuccess={onRefresh}
          />
        </>
      )}
    </>
  );
}
