import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  BarChart2, 
  Search, 
  Download, 
  LogOut 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Interface for user data
interface User {
  id: string;
  name: string;
  email: string;
  queries: number;
  lastActive: string;
}

// Interface for query data
interface Query {
  id: number;
  user: string;
  email: string;
  query: string;
  date: string;
  responseLength: number;
}

// Interface for topic data
interface Topic {
  topic: string;
  count: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for data
  const [users, setUsers] = useState<User[]>([]);
  const [queries, setQueries] = useState<Query[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filteredQueries, setFilteredQueries] = useState<Query[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalQueries, setTotalQueries] = useState(0);
  const [averageResponseLength, setAverageResponseLength] = useState(0);
  const [userActivityData, setUserActivityData] = useState<any[]>([]);

  // Check if user is logged in as admin
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // First check localStorage for admin role
        const userRole = localStorage.getItem('userRole');
        
        if (userRole === 'admin') {
          // If admin in localStorage, proceed with fetching data
          fetchData();
          return;
        }
        
        // If not in localStorage, check Supabase
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Access Denied",
            description: "Please log in to access this page",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }
        
        // Query the user_roles table to check if user has admin role
        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        // Check if user has admin role
        const isAdmin = roles && roles.some(role => role.role === 'admin');
        
        if (!isAdmin) {
          toast({
            title: "Access Denied",
            description: "You must have admin privileges to access this page",
            variant: "destructive",
          });
          navigate('/');
        } else {
          localStorage.setItem('userRole', 'admin');
          fetchData();
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        toast({
          title: "Error",
          description: "Failed to verify your access level",
          variant: "destructive",
        });
        navigate('/login');
      }
    };
    
    checkAdminAccess();
  }, [navigate, toast]);

  // Fetch data from Supabase
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // For demonstration, we're creating mock data as if it came from Supabase
      // In a real application, this would be a real database query
      
      // Simulate fetching users
      const mockUsers = [
        { id: "1", name: "Jane Smith", email: "jane@acme.corp", queries: 15, lastActive: "2023-04-25" },
        { id: "2", name: "John Doe", email: "john@tech.org", queries: 8, lastActive: "2023-04-24" },
        { id: "3", name: "Alice Johnson", email: "alice@megacorp.com", queries: 23, lastActive: "2023-04-26" },
        { id: "4", name: "Robert Chen", email: "robert@startupinc.net", queries: 5, lastActive: "2023-04-20" },
        { id: "5", name: "Emily Davis", email: "emily@bizfirm.co", queries: 12, lastActive: "2023-04-23" }
      ];
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);

      // Simulate fetching queries
      const mockQueries = [
        { 
          id: 1, 
          user: "Jane Smith", 
          email: "jane@acme.corp", 
          query: "What are the best practices for implementing a microservices architecture?", 
          date: "2023-04-26", 
          responseLength: 1250 
        },
        { 
          id: 2, 
          user: "John Doe", 
          email: "john@tech.org", 
          query: "How should we price our new SaaS product for the enterprise market?", 
          date: "2023-04-25", 
          responseLength: 950 
        },
        { 
          id: 3, 
          user: "Alice Johnson", 
          email: "alice@megacorp.com", 
          query: "What security measures should we implement for our cloud infrastructure?", 
          date: "2023-04-25", 
          responseLength: 1800 
        },
        { 
          id: 4, 
          user: "Robert Chen", 
          email: "robert@startupinc.net", 
          query: "How can we optimize our CI/CD pipeline for faster deployments?", 
          date: "2023-04-24", 
          responseLength: 1100 
        },
        { 
          id: 5, 
          user: "Emily Davis", 
          email: "emily@bizfirm.co", 
          query: "What's the best approach for migrating our monolith to a serverless architecture?", 
          date: "2023-04-23", 
          responseLength: 1650 
        }
      ];
      setQueries(mockQueries);
      setFilteredQueries(mockQueries);
      setTotalQueries(mockQueries.length);
      
      // Calculate average response length
      const avgLength = Math.round(mockQueries.reduce((acc, q) => acc + q.responseLength, 0) / mockQueries.length);
      setAverageResponseLength(avgLength);

      // Simulate fetching topics
      const mockTopics = [
        { topic: "Cloud Infrastructure", count: 28 },
        { topic: "Microservices", count: 22 },
        { topic: "Security", count: 19 },
        { topic: "Pricing Strategy", count: 15 },
        { topic: "DevOps", count: 12 }
      ];
      setTopics(mockTopics);

      // Create activity data for chart
      const activityData = [
        { name: 'Mon', queries: 12 },
        { name: 'Tue', queries: 19 },
        { name: 'Wed', queries: 7 },
        { name: 'Thu', queries: 15 },
        { name: 'Fri', queries: 23 },
        { name: 'Sat', queries: 8 },
        { name: 'Sun', queries: 5 },
      ];
      setUserActivityData(activityData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search for users and queries
  useEffect(() => {
    if (searchTerm) {
      setFilteredUsers(
        users.filter(user => 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      
      setFilteredQueries(
        queries.filter(query => 
          query.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
          query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.query.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
      setFilteredQueries(queries);
    }
  }, [searchTerm, users, queries]);

  const handleLogout = async () => {
    try {
      // Clear localStorage first
      localStorage.clear();
      
      // Then sign out from Supabase
      await supabase.auth.signOut();
      
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  // Function to export data as CSV
  const exportToCSV = (data: any[], filename: string) => {
    if (!data || !data.length) return;
    
    const headers = Object.keys(data[0]).join(',');
    const values = data.map(item => 
      Object.values(item).map(val => 
        typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
      ).join(',')
    ).join('\n');
    
    const csvContent = `${headers}\n${values}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Waraha Group
        </Link>
        
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users and monitor AI consultant usage
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalQueries}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Average Response Length</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{averageResponseLength}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users or queries..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="queries">
            <FileText className="mr-2 h-4 w-4" />
            Queries
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart2 className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Registered Users</CardTitle>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => exportToCSV(filteredUsers, 'waraha-users.csv')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
              <CardDescription>
                All users registered to use the AI consultant
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <p>Loading user data...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Queries</TableHead>
                      <TableHead>Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.queries}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">No users found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableCaption>
                    Total: {filteredUsers.length} users
                  </TableCaption>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="queries" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Submitted Queries</CardTitle>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => exportToCSV(filteredQueries, 'waraha-queries.csv')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
              <CardDescription>
                All queries submitted to the AI consultant
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <p>Loading query data...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="w-[300px]">Query</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQueries.length > 0 ? (
                      filteredQueries.map(query => (
                        <TableRow key={query.id}>
                          <TableCell>{query.user}</TableCell>
                          <TableCell>{query.email}</TableCell>
                          <TableCell className="max-w-[300px] truncate">{query.query}</TableCell>
                          <TableCell>{query.date}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">No queries found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableCaption>
                    Total: {filteredQueries.length} queries
                  </TableCaption>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Search Topics</CardTitle>
                <CardDescription>
                  Most common topics in user queries
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <p>Loading topic data...</p>
                  </div>
                ) : (
                  <>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={topics}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="topic"
                          >
                            {topics.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <Table className="mt-4">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Topic</TableHead>
                          <TableHead>Count</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topics.map((topic, index) => (
                          <TableRow key={index}>
                            <TableCell>{topic.topic}</TableCell>
                            <TableCell>{topic.count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Activity Timeline</CardTitle>
                <CardDescription>
                  Query activity over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <p>Loading activity data...</p>
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userActivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="queries" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
