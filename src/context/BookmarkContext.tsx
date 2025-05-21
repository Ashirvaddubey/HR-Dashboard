
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Employee } from "@/types/employee";
import { toast } from "@/components/ui/sonner";

interface BookmarkContextType {
  bookmarkedEmployees: Employee[];
  addBookmark: (employee: Employee) => void;
  removeBookmark: (employeeId: number) => void;
  isBookmarked: (employeeId: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedEmployees, setBookmarkedEmployees] = useState<Employee[]>([]);

  // Load bookmarks from localStorage        on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedEmployees");
    if (savedBookmarks) {
      try {
        setBookmarkedEmployees(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Failed to parse bookmarks from localStorage:", error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever th change
  useEffect(() => {
    localStorage.setItem("bookmarkedEmployees", JSON.stringify(bookmarkedEmployees));
  }, [bookmarkedEmployees]);

  const addBookmark = (employee: Employee) => {
    setBookmarkedEmployees((prev) => {
      if (prev.some((e) => e.id === employee.id)) {
        return prev;
      }
      toast.success(`${employee.firstName} ${employee.lastName} bookmarked`);
      return [...prev, employee];
    });
  };

  const removeBookmark = (employeeId: number) => {
    setBookmarkedEmployees((prev) => {
      const employee = prev.find((e) => e.id === employeeId);
      if (employee) {
        toast.info(`${employee.firstName} ${employee.lastName} removed from bookmarks`);
      }
      return prev.filter((e) => e.id !== employeeId);
    });
  };

  const isBookmarked = (employeeId: number) => {
    return bookmarkedEmployees.some((e) => e.id === employeeId);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedEmployees, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};
