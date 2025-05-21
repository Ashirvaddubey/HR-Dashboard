import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmployee } from "@/hooks/useEmployees";
import { useBookmarks } from "@/context/BookmarkContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Bookmark, BookmarkCheck, Star, Phone, Mail, MapPin, Building, UserPlus, Award } from "lucide-react";
import { toast } from "sonner";

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: employee, isLoading, error } = useEmployee(id || "");
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock project data
  const mockProjects = [
    { id: 1, name: "Website Redesign", role: "Lead Developer", status: "In Progress", completion: 75 },
    { id: 2, name: "CRM Integration", role: "Backend Developer", status: "Completed", completion: 100 },
    { id: 3, name: "Mobile App", role: "UI Designer", status: "Planning", completion: 25 },
  ];

  // Mock feedback data
  const mockFeedback = [
    { 
      id: 1, 
      from: "Jane Smith", 
      role: "Project Manager", 
      date: "2025-05-01", 
      rating: 5, 
      comment: "Excellent work on the website redesign. Showed great technical leadership and problem-solving skills." 
    },
    { 
      id: 2, 
      from: "John Doe", 
      role: "Team Lead", 
      date: "2025-04-15", 
      rating: 4, 
      comment: "Good collaboration skills. Could improve on meeting deadlines." 
    },
  ];

  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    if (!employee) return;
    
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee);
    }
  };

  const handlePromote = () => {
    if (!employee) return;
    toast.success(`${employee.firstName} ${employee.lastName} has been promoted!`);
  };

  if (error) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
        <p className="text-muted-foreground">{(error as Error).message}</p>
        <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Dashboard
      </Button>

      {isLoading ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-32 w-32 rounded-full" />
                    <Skeleton className="h-6 w-48 mt-4" />
                    <Skeleton className="h-4 w-32 mt-2" />
                    <Skeleton className="h-4 w-24 mt-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-2/3">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        </div>
      ) : employee ? (
        <>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Employee Profile Card */}
            <div className="md:w-1/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={employee.image}
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="h-32 w-32 rounded-full object-cover border-2 border-primary"
                    />
                    <h2 className="mt-4 text-xl font-bold">
                      {employee.firstName} {employee.lastName}
                    </h2>
                    <p className="text-muted-foreground">{employee.company.title}</p>
                    <Badge variant="outline" className="mt-2">
                      {employee.company.department}
                    </Badge>
                    
                    <div className="flex mt-4 items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < (employee.performance?.rating || 0)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-medium">
                        {employee.performance?.rating}/5
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mt-6">
                      <Button onClick={handlePromote}>
                        <Award className="mr-2 h-4 w-4" />
                        Promote
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleBookmarkToggle}
                      >
                        {isBookmarked(employee.id) ? (
                          <>
                            <BookmarkCheck className="mr-2 h-4 w-4" />
                            Bookmarked
                          </>
                        ) : (
                          <>
                            <Bookmark className="mr-2 h-4 w-4" />
                            Bookmark
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div className="md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{employee.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>{employee.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p>
                          {employee.address.address}, {employee.address.city}, {employee.address.state}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p>{employee.company.department} - {employee.company.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <UserPlus className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Employment</p>
                        <p>Age: {employee.age}, Position: {employee.company.title}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Tabs for more details */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Summary of employee's performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Projects Completed</span>
                        <span className="font-medium">{employee.performance?.projects || 0}</span>
                      </div>
                      <Progress value={employee.performance?.projects ? (employee.performance.projects / 10) * 100 : 0} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Completion Rate</span>
                        <span className="font-medium">{employee.performance?.completionRate || 0}%</span>
                      </div>
                      <Progress value={employee.performance?.completionRate || 0} className="bg-muted" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Overall Rating</span>
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
                      <Progress value={(employee.performance?.rating || 0) * 20} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                  <CardDescription>Professional background</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    {employee.firstName} {employee.lastName} is a {employee.company.title} in the {employee.company.department} department at {employee.company.name}. 
                    With a strong track record of successful project deliveries and consistent performance, {employee.firstName} has demonstrated exceptional skills in their field.
                  </p>
                  <p className="mt-4">
                    Based in {employee.address.city}, {employee.address.state}, {employee.firstName} has been a valuable member of the team and continues to contribute to the company's growth and success.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Project Assignments</CardTitle>
                  <CardDescription>Current and past projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockProjects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.role}</p>
                          </div>
                          <Badge className={
                            project.status === "Completed" ? "bg-green-500" : 
                            project.status === "In Progress" ? "bg-blue-500" : "bg-yellow-500"
                          }>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Completion</span>
                            <span className="text-sm font-medium">{project.completion}%</span>
                          </div>
                          <Progress value={project.completion} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Feedback</CardTitle>
                  <CardDescription>Reviews and ratings from colleagues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockFeedback.map((feedback) => (
                      <div key={feedback.id} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{feedback.from}</h4>
                            <p className="text-sm text-muted-foreground">{feedback.role}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < feedback.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(feedback.date).toLocaleDateString()}
                        </p>
                        <p className="mt-3">{feedback.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Employee Not Found</h1>
          <p className="text-muted-foreground">
            The employee you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </div>
      )}
    </div>
  );
}
