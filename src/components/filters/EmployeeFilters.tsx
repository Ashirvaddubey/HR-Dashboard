// filtering employees
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  return (
    <>
      <Select
        value={filters.department}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, department: value }))
        }
      >
        <SelectTrigger className="w-[180px] bg-background/50">
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
      
      <Select
        value={filters.minRating.toString()}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, minRating: parseInt(value) }))
        }
      >
        <SelectTrigger className="w-[180px] bg-background/50">
          <SelectValue placeholder="All Ratings" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">All Ratings</SelectItem>
          <SelectItem value="1">1+ Star</SelectItem>
          <SelectItem value="2">2+ Stars</SelectItem>
          <SelectItem value="3">3+ Stars</SelectItem>
          <SelectItem value="4">4+ Stars</SelectItem>
          <SelectItem value="5">5 Stars</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
