
import { useState } from "react";
import { useBookmarks } from "@/context/BookmarkContext";
import { EmployeeCard } from "@/components/employee/EmployeeCard";
import { useFilteredEmployees } from "@/hooks/useFilteredEmployees";
import { EmployeeFilters } from "@/components/filters/EmployeeFilters";
import { Badge } from "@/components/ui/badge";
import { BookmarkX } from "lucide-react";

export default function BookmarksPage() {
  const { bookmarkedEmployees } = useBookmarks();
  const { filters, setFilters, filteredEmployees, departments } = useFilteredEmployees(bookmarkedEmployees);

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your bookmarked employees and quick actions
        </p>
      </div>

      {bookmarkedEmployees.length > 0 ? (
        <>
          <EmployeeFilters 
            filters={filters} 
            setFilters={setFilters} 
            departments={departments} 
          />

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredEmployees.length} of {bookmarkedEmployees.length} bookmarked employees
            </p>
          </div>

          {filteredEmployees.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <h3 className="text-lg font-medium">No bookmarked employees match your filters</h3>
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
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-card rounded-lg border">
          <div className="rounded-full bg-background p-3 mb-4">
            <BookmarkX className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No bookmarked employees</h3>
          <p className="text-muted-foreground text-center mt-1 max-w-md">
            When you bookmark employees from the dashboard, they'll appear here for quick access.
          </p>
        </div>
      )}
    </div>
  );
}
