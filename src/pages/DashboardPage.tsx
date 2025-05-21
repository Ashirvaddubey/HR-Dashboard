import { useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { useFilteredEmployees } from "@/hooks/useFilteredEmployees";
import { EmployeeFilters } from "@/components/filters/EmployeeFilters";
import { EmployeeCard } from "@/components/employee/EmployeeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Performance Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Track employee performance and manage team insights
          </p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-12 bg-muted rounded-md animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="h-72" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="bg-card/50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Employee Performance</h2>
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
