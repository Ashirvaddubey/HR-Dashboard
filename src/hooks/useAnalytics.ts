import { useState, useEffect } from 'react';
import { useEmployees } from './useEmployees';
import { useBookmarks } from '@/context/BookmarkContext';
import { Department } from '@/types/employee';

export const useAnalytics = () => {
  const { data: employees, isLoading } = useEmployees();
  const { bookmarkedEmployees } = useBookmarks();
  const [departmentStats, setDepartmentStats] = useState<Department[]>([]);
  const [bookmarkTrends, setBookmarkTrends] = useState<{ name: string; value: number }[]>([]);
  
  useEffect(() => {
    if (!employees) return;

    // Calculate department stats
    const deptMap: Record<string, { total: number; count: number }> = {};
    
    employees.forEach(emp => {
      const dept = emp.company.department;
      if (!deptMap[dept]) {
        deptMap[dept] = { total: 0, count: 0 };
      }
      deptMap[dept].total += emp.performance?.rating || 0;
      deptMap[dept].count += 1;
    });

    const departmentData = Object.keys(deptMap).map(name => ({
      name,
      employeeCount: deptMap[name].count,
      averageRating: Math.round((deptMap[name].total / deptMap[name].count) * 10) / 10
    }));
    
    setDepartmentStats(departmentData);

    // Create mock bookmark trend data
    // In a real app, this would come from actual tracking data
    const mockTrends = [
      { name: 'Jan', value: Math.floor(Math.random() * 20) },
      { name: 'Feb', value: Math.floor(Math.random() * 20) },
      { name: 'Mar', value: Math.floor(Math.random() * 20) },
      { name: 'Apr', value: Math.floor(Math.random() * 20) },
      { name: 'May', value: Math.floor(Math.random() * 20) },
      { name: 'Jun', value: bookmarkedEmployees.length },
    ];
    
    setBookmarkTrends(mockTrends);
  }, [employees, bookmarkedEmployees]);

  // Calculate average rating for all employees
  const overallAverageRating = employees ? 
    Math.round((employees.reduce((sum, emp) => sum + (emp.performance?.rating || 0), 0) / employees.length) * 10) / 10 : 0;

  // Calculate average rating for bookmarked employees
  const bookmarkedAverageRating = bookmarkedEmployees.length > 0 ?
    Math.round((bookmarkedEmployees.reduce((sum, emp) => sum + (emp.performance?.rating || 0), 0) / bookmarkedEmployees.length) * 10) / 10 : 0;

  return {
    departmentStats,
    bookmarkTrends,
    isLoading,
    totalEmployees: employees?.length || 0,
    totalBookmarks: bookmarkedEmployees.length,
    averageRating: bookmarkedEmployees.length > 0 ? bookmarkedAverageRating : overallAverageRating
  };
};
