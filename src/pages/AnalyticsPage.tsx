
import { useAnalytics } from "@/hooks/useAnalytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, BookmarkCheck, Star } from "lucide-react";

export default function AnalyticsPage() {
  const { 
    departmentStats, 
    bookmarkTrends, 
    isLoading, 
    totalEmployees, 
    totalBookmarks, 
    averageRating 
  } = useAnalytics();

  const statCards = [
    { 
      title: "Total Employees", 
      value: totalEmployees, 
      description: "Active in the system",
      icon: Users,
      color: "text-blue-500" 
    },
    { 
      title: "Bookmarked", 
      value: totalBookmarks, 
      description: "Employees bookmarked", 
      icon: BookmarkCheck,
      color: "text-purple-500" 
    },
    { 
      title: "Average Rating", 
      value: averageRating, 
      description: "Overall performance", 
      icon: Star,
      color: "text-yellow-500" 
    },
  ];

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-2 text-muted-foreground">
          Performance insights and trends across your organization
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {isLoading 
          ? Array(3).fill(0).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))
          : statCards.map((stat) => (
              <Card key={stat.title} className="transition-all hover:shadow-md">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))
        }
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Department Performance */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Average performance ratings by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-80">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={departmentStats}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      name="Average Rating"
                      dataKey="averageRating"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bookmark Trends */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Bookmark Trends</CardTitle>
            <CardDescription>Employee bookmarks over time</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-80">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={bookmarkTrends}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Bookmarks"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Department Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Breakdown</CardTitle>
          <CardDescription>
            Detailed stats by department
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left font-medium">Department</th>
                    <th className="py-3 text-center font-medium">Employees</th>
                    <th className="py-3 text-center font-medium">Avg. Rating</th>
                    <th className="py-3 text-center font-medium">Rating Visual</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentStats.map((dept) => (
                    <tr key={dept.name} className="border-b hover:bg-muted/50">
                      <td className="py-3 font-medium">{dept.name}</td>
                      <td className="py-3 text-center">{dept.employeeCount}</td>
                      <td className="py-3 text-center">{dept.averageRating}</td>
                      <td className="py-3">
                        <div className="flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < dept.averageRating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : i < Math.ceil(dept.averageRating) && i >= Math.floor(dept.averageRating) 
                                    ? "text-yellow-500 fill-yellow-500 opacity-50" 
                                    : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
