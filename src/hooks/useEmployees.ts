import { useQuery } from '@tanstack/react-query';
import { Employee } from '@/types/employee';

// Helper function to add mock data for departments and performance
const enhanceEmployeeData = (employees: any[]): Employee[] => {
  const departments = ['Engineering', 'Sales', 'Marketing', 'Product', 'Design', 'HR', 'Finance'];
  
  return employees.map(employee => {
    // Generate random performance data
    const performance = {
      rating: Math.floor(Math.random() * 5) + 1,
      projects: Math.floor(Math.random() * 10) + 1,
      completionRate: Math.floor(Math.random() * 40) + 60,
    };
    
    // Assign a random department
    const department = departments[Math.floor(Math.random() * departments.length)];
    
    return {
      ...employee,
      performance,
      company: {
        ...employee.company,
        department
      }
    };
  });
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await fetch('https://dummyjson.com/users?limit=20');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return enhanceEmployeeData(data.users);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useEmployee = (id: string | number) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/users/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return enhanceEmployeeData([data])[0];
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
