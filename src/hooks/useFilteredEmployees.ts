
import { useState, useMemo } from 'react';
import { Employee, FilterOptions } from '@/types/employee';

export const useFilteredEmployees = (employees: Employee[] | undefined) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    department: 'all',
    minRating: 0,
  });

  const departments = useMemo(() => {
    if (!employees) return [];
    
    const depts = new Set<string>();
    employees.forEach(emp => {
      if (emp.company?.department) {
        depts.add(emp.company.department);
      }
    });
    
    return Array.from(depts).sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];

    return employees.filter(employee => {
      // Search filter
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      const searchMatch = filters.search === '' || 
        fullName.includes(filters.search.toLowerCase()) || 
        employee.email.toLowerCase().includes(filters.search.toLowerCase());

      // Department filter
      const departmentMatch = filters.department === 'all' || 
        employee.company?.department === filters.department;

      // Rating filter
      const ratingMatch = (employee.performance?.rating || 0) >= filters.minRating;

      return searchMatch && departmentMatch && ratingMatch;
    });
  }, [employees, filters]);

  return {
    filters,
    setFilters,
    filteredEmployees,
    departments
  };
};
