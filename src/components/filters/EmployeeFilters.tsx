
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FilterOptions } from "@/types/employee";

interface EmployeeFiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  departments: string[];
}

export function EmployeeFilters({
  filters,
  setFilters,
  departments,
}: EmployeeFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search);
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, setFilters]);

  return (
    <div className="bg-card p-4 rounded-lg shadow mb-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name or email"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select
            value={filters.department}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, department: value }))
            }
          >
            <SelectTrigger id="department">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="rating">Minimum Rating</Label>
            <span className="text-sm text-muted-foreground">
              {filters.minRating}/5
            </span>
          </div>
          <Slider
            id="rating"
            min={0}
            max={5}
            step={1}
            value={[filters.minRating]}
            onValueChange={([value]) =>
              setFilters((prev) => ({ ...prev, minRating: value }))
            }
            className="py-2"
          />
        </div>
      </div>
    </div>
  );
}
