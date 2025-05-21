import { useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { useFilteredEmployees } from "@/hooks/useFilteredEmployees";
import { EmployeeFilters } from "@/components/filters/EmployeeFilters";
import { EmployeeCard } from "@/components/employee/EmployeeCard";
import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const { data: employees, isLoading, error } = useEmployees();
  const { filters, setFilters, filteredEmployees, departments } = useFilteredEmployees(employees);

  if (error) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
        <p className="text-muted-foreground">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-8 w-[200px]" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[200px] rounded-lg" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
              <p className="mt-2 text-muted-foreground">
                Manage your team members and their access
              </p>
            </div>
            <AddEmployeeDialog />
          </div>

          <div className="bg-card/50 p-4 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees"
                  className="pl-8"
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                />
              </div>
              <div className="flex gap-4">
                <EmployeeFilters
                  filters={filters}
                  setFilters={setFilters}
                  departments={departments}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Showing {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'} 
              {employees && employees.length > 0 ? ` out of ${employees.length}` : ''}
            </p>
          </div>

          {filteredEmployees.length === 0 ? (
            <div className="text-center py-12 bg-card/30 rounded-lg border border-border/50">
              <h3 className="text-lg font-medium">No employees found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
