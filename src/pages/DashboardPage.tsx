
import { useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { useFilteredEmployees } from "@/hooks/useFilteredEmployees";
import { EmployeeFilters } from "@/components/filters/EmployeeFilters";
import { EmployeeCard } from "@/components/employee/EmployeeCard";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Manage and monitor employee performance across your organization
        </p>
      </div>

      {isLoading ? (
        <>
          <div className="bg-card p-4 rounded-lg shadow mb-6 animate-pulse">
            <div className="h-10 bg-muted rounded-md mb-4"></div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="h-12 bg-muted rounded-md"></div>
              <div className="h-12 bg-muted rounded-md"></div>
              <div className="h-12 bg-muted rounded-md"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-card rounded-lg p-6 h-72">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-4 w-24 mt-4" />
                  <Skeleton className="h-4 w-32 mt-2" />
                  <Skeleton className="h-4 w-16 mt-2" />
                </div>
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex justify-between mt-4">
                  <Skeleton className="h-9 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <EmployeeFilters
            filters={filters}
            setFilters={setFilters}
            departments={departments}
          />

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredEmployees.length} of {employees?.length || 0} employees
            </p>
          </div>

          {filteredEmployees.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <h3 className="text-lg font-medium">No employees found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
