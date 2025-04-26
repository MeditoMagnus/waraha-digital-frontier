
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

// Mock data for users
const mockUsers = [
  { id: 1, name: "Jane Smith", email: "jane@acme.corp", queries: 15, lastActive: "2023-04-25" },
  { id: 2, name: "John Doe", email: "john@tech.org", queries: 8, lastActive: "2023-04-24" },
  { id: 3, name: "Alice Johnson", email: "alice@megacorp.com", queries: 23, lastActive: "2023-04-26" },
  { id: 4, name: "Robert Chen", email: "robert@startupinc.net", queries: 5, lastActive: "2023-04-20" },
  { id: 5, name: "Emily Davis", email: "emily@bizfirm.co", queries: 12, lastActive: "2023-04-23" }
];

// Mock data for AI queries
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

// Mock data for topics
const topTopics = [
  { topic: "Cloud Infrastructure", count: 28 },
  { topic: "Microservices", count: 22 },
  { topic: "Security", count: 19 },
  { topic: "Pricing Strategy", count: 15 },
  { topic: "DevOps", count: 12 }
];

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

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [filteredQueries, setFilteredQueries] = useState(mockQueries);

  // Check if user is logged in as admin
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You must be logged in as an admin to access this page",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  // Handle search for users and queries
  useEffect(() => {
    if (searchTerm) {
      setFilteredUsers(
        mockUsers.filter(user => 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      
      setFilteredQueries(
        mockQueries.filter(query => 
          query.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
          query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.query.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(mockUsers);
      setFilteredQueries(mockQueries);
    }
  }, [searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/login');
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
            <p className="text-4xl font-bold">{mockUsers.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mockQueries.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Average Response Length</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {Math.round(mockQueries.reduce((acc, q) => acc + q.responseLength, 0) / mockQueries.length)}
            </p>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Topic</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topTopics.map((topic, index) => (
                      <TableRow key={index}>
                        <TableCell>{topic.topic}</TableCell>
                        <TableCell>{topic.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Activity Timeline</CardTitle>
                <CardDescription>
                  Query activity over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Chart visualization would go here
                  <br/>
                  (In a real app, this would use recharts)
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
