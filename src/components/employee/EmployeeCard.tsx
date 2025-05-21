
import { Link } from "react-router-dom";
import { Eye, Bookmark, BookmarkCheck, ArrowUp, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/types/employee";
import { useBookmarks } from "@/context/BookmarkContext";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(employee.id);
  const navigate = useNavigate();

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when bookmark button is clicked
    if (bookmarked) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee);
    }
  };

  const handlePromote = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when promote button is clicked
    toast.success(`${employee.firstName} ${employee.lastName} has been promoted!`);
  };

  const handleViewDetails = () => {
    navigate(`/employee/${employee.id}`);
  };

  // Determine badge color based on role
  const getBadgeVariant = () => {
    const department = employee.company.department.toLowerCase();
    if (department === "engineering") return "bg-blue-700";
    if (department === "marketing") return "bg-purple-700";
    if (department === "sales") return "bg-green-700";
    if (department === "finance") return "bg-amber-700";
    if (department === "hr") return "bg-red-700";
    if (department === "product") return "bg-indigo-700";
    if (department === "design") return "bg-pink-700";
    return "bg-gray-700";
  };

  // Determine role badge
  const getRoleBadge = () => {
    const rating = employee.performance?.rating || 0;
    if (rating >= 5) return { text: "Senior", color: "bg-green-700" };
    if (rating >= 4) return { text: "Lead", color: "bg-purple-700" };
    if (rating >= 3) return { text: "Manager", color: "bg-blue-700" };
    return { text: "Associate", color: "bg-amber-600" };
  };

  const roleBadge = getRoleBadge();

  return (
    <Card 
      className="bg-card/30 border-border/30 overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="h-12 w-12 rounded-full object-cover border border-border/50"
              />
            </div>
            <div className="ml-3">
              <h3 className="font-medium">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{employee.company.title}</p>
            </div>
          </div>
          <Badge className={`${roleBadge.color} text-white`}>
            {roleBadge.text}
          </Badge>
        </div>
        
        <div className="mt-2 mb-4">
          <Badge variant="outline" className="mr-2">
            {employee.company.department}
          </Badge>
        </div>
        
        <div className="mt-4 mb-3">
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">Performance:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < (employee.performance?.rating || 0)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm">{employee.performance?.rating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 truncate">
            {employee.email}
          </p>
        </div>
        
        <div className="flex justify-between mt-6">
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/employee/${employee.id}`);
              }}
              className="text-blue-500 hover:text-blue-400 hover:bg-blue-950/50"
            >
              <Eye className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBookmarkToggle}
              className={`${bookmarked ? "text-amber-500 hover:text-amber-400" : "text-gray-500 hover:text-gray-400"} hover:bg-gray-800/50`}
            >
              {bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handlePromote} 
              className="text-green-500 hover:text-green-400 hover:bg-green-950/50"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500 hover:text-gray-400 hover:bg-gray-800/50"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
