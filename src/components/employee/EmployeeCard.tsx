
import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/types/employee";
import { useBookmarks } from "@/context/BookmarkContext";
import { toast } from "sonner";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(employee.id);

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee);
    }
  };

  const handlePromote = () => {
    toast.success(`${employee.firstName} ${employee.lastName} has been promoted!`);
  };

  return (
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="h-24 w-24 rounded-full object-cover border-2 border-primary"
            />
            <Badge className="absolute -bottom-1 right-0 bg-primary">
              {employee.performance?.rating || 0}/5
            </Badge>
          </div>
          <h3 className="mt-4 text-lg font-medium">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">{employee.company.title}</p>
          <Badge variant="outline" className="mt-2">
            {employee.company.department}
          </Badge>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Email:</span> {employee.email}
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Age:</span> {employee.age}
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-muted-foreground mr-1">Rating:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < (employee.performance?.rating || 0)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Link to={`/employee/${employee.id}`}>
          <Button variant="outline" size="sm">View Profile</Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handlePromote}>
            Promote
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmarkToggle}
            className={bookmarked ? "text-primary" : ""}
          >
            {bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
