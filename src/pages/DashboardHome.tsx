
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { User, UserRound, Building, HardDrive, AlertTriangle, Key, Settings } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { useUsers } from "@/hooks/useUsers";

const recentImages = [
  { name: "Kibera Secondary v1.2", date: "2 hours ago", type: "Student" },
  { name: "Mfangano High v1.0", date: "1 day ago", type: "Teacher" },
  { name: "Kakamega Primary v2.1", date: "3 days ago", type: "Student" }
];

const licenseData = [
  { name: "Valid", value: 36, color: "#10b981" },
  { name: "Expiring", value: 7, color: "#f59e0b" },
  { name: "Expired", value: 4, color: "#ef4444" }
];

const activityData = [
  { day: "Mon", logins: 34, downloads: 12 },
  { day: "Tue", logins: 42, downloads: 18 },
  { day: "Wed", logins: 52, downloads: 24 },
  { day: "Thu", logins: 48, downloads: 22 },
  { day: "Fri", logins: 62, downloads: 30 },
  { day: "Sat", logins: 22, downloads: 8 },
  { day: "Sun", logins: 18, downloads: 5 }
];

export default function DashboardHome() {
  const navigate = useNavigate();
  const { clients } = useClients();
  const { users } = useUsers();

  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back to EdVirons Registry
              </p>
            </div>
          </div>
        </header>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <HardDrive className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Upload Image</h3>
              <p className="text-sm text-muted-foreground mb-4">Add a new OS image</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/images")}>Go to Images</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Building className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Add Client</h3>
              <p className="text-sm text-muted-foreground mb-4">Register a new institution</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/clients")}>Go to Clients</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <UserRound className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Manage Users</h3>
              <p className="text-sm text-muted-foreground mb-4">Add or update users</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/users")}>Go to Users</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Settings className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">Configure your account</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/settings")}>Go to Settings</Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <h3 className="text-2xl font-semibold">{clients.length}</h3>
                </div>
                <Building className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Users</p>
                  <h3 className="text-2xl font-semibold">{users.length}</h3>
                </div>
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">OS Images</p>
                  <h3 className="text-2xl font-semibold">12</h3>
                </div>
                <HardDrive className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Expiring Licenses</p>
                  <h3 className="text-2xl font-semibold">7</h3>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>License Status</CardTitle>
              <CardDescription>Distribution of client license statuses</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={licenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {licenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>User logins and OS image downloads</CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="logins" stroke="#8884d8" name="Logins" />
                    <Line type="monotone" dataKey="downloads" stroke="#82ca9d" name="Downloads" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Images</CardTitle>
            <CardDescription>Recently uploaded OS images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentImages.map((image, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <HardDrive className="h-8 w-8 text-primary bg-primary/10 p-1.5 rounded" />
                    <div>
                      <h4 className="font-medium">{image.name}</h4>
                      <p className="text-xs text-muted-foreground">{image.type} • Uploaded {image.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
