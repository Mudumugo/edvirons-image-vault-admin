
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { RegistryTable } from "@/components/registry/RegistryTable";
import { AddInstitutionDialog } from "@/components/registry/AddInstitutionDialog";
import { useFetchRegistry } from "@/hooks/useFetchRegistry";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function Registry() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter state - using "all" instead of empty string for the default values
  const [levelFilter, setLevelFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [curriculumFilter, setCurriculumFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  // Fetching registry data
  const { data: institutions, isLoading, refetch } = useFetchRegistry();

  // Compute unique filter options from current data (safe even if institutions is undefined)
  const levels = Array.from(new Set((institutions || []).map(i => i.level))).filter(Boolean);
  const types = Array.from(new Set((institutions || []).map(i => i.type))).filter(Boolean);
  const curricula = Array.from(new Set((institutions || []).map(i => i.curriculum))).filter(Boolean);
  const regions = Array.from(new Set((institutions || []).map(i => i.region))).filter(Boolean);
  const countries = Array.from(new Set((institutions || []).map(i => i.country))).filter(Boolean);

  // Filter + search logic - modified to check for "all" instead of empty string
  const filteredInstitutions = (institutions || []).filter((institution) => {
    const matchesSearch =
      institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.curriculum.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = levelFilter === "all" || institution.level === levelFilter;
    const matchesType = typeFilter === "all" || institution.type === typeFilter;
    const matchesCurriculum = curriculumFilter === "all" || institution.curriculum === curriculumFilter;
    const matchesRegion = regionFilter === "all" || institution.region === regionFilter;
    const matchesCountry = countryFilter === "all" || institution.country === countryFilter;

    return (
      matchesSearch &&
      matchesLevel &&
      matchesType &&
      matchesCurriculum &&
      matchesRegion &&
      matchesCountry
    );
  });

  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-6 space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold">Institution Registry</h1>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Institution
          </Button>
        </header>

        <Card>
          <CardHeader className="flex flex-col gap-4">
            {/* Filter bar - updated to use "all" value instead of empty string */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4">
              <div className="flex flex-col">
                <label className="text-xs mb-1">Education Level</label>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="min-w-[140px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label className="text-xs mb-1">Type</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="min-w-[120px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>{type[0].toUpperCase() + type.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label className="text-xs mb-1">Curriculum</label>
                <Select value={curriculumFilter} onValueChange={setCurriculumFilter}>
                  <SelectTrigger className="min-w-[120px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {curricula.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label className="text-xs mb-1">Region/County</label>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="min-w-[120px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {regions.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label className="text-xs mb-1">Country</label>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="min-w-[100px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Search bar (kept as before) */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <CardTitle>Registered Institutions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage MOE registered institutions
                </p>
              </div>
              <Input
                placeholder="Search by name, ID, region, or type"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <RegistryTable 
              institutions={filteredInstitutions} 
              isLoading={isLoading}
              onRefresh={refetch}
            />
          </CardContent>
        </Card>

        <AddInstitutionDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen} 
          onSuccess={refetch}
        />
      </div>
    </>
  );
}
