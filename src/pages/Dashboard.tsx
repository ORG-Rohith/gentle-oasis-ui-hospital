
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Activity,
  TrendingUp,
  Clock,
  Stethoscope,
  Bed
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "1,247",
      description: "+12% from last month",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Available Doctors",
      value: "24",
      description: "Currently on duty",
      icon: UserCheck,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Today's Appointments",
      value: "89",
      description: "15 pending confirmations",
      icon: Calendar,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Available Beds",
      value: "156",
      description: "78% occupancy rate",
      icon: Bed,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const recentActivities = [
    { time: "2 min ago", activity: "New patient registered: John Smith", type: "success" },
    { time: "5 min ago", activity: "Dr. Johnson updated patient records", type: "info" },
    { time: "10 min ago", activity: "Appointment scheduled for 3:30 PM", type: "warning" },
    { time: "15 min ago", activity: "Emergency admission processed", type: "error" },
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your hospital overview.</p>
        </div>
        <div className="flex items-center gap-2 glass-card p-3 rounded-lg">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className={`glass-card hover:scale-105 transition-all duration-300 slide-up`} style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <p className="text-xs text-gray-600 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 glass-card rounded-lg hover:bg-white/60 transition-all duration-200">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'info' ? 'bg-blue-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                  <div>
                    <p className="text-sm text-gray-800">{activity.activity}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Stethoscope className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Frequently used hospital operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="glass-button p-4 rounded-lg text-left hover:scale-105 transition-all duration-200">
                <Users className="h-6 w-6 text-blue-500 mb-2" />
                <p className="font-medium text-gray-800">Register Patient</p>
                <p className="text-xs text-gray-600">Add new patient</p>
              </button>
              <button className="glass-button p-4 rounded-lg text-left hover:scale-105 transition-all duration-200">
                <Calendar className="h-6 w-6 text-green-500 mb-2" />
                <p className="font-medium text-gray-800">Schedule</p>
                <p className="text-xs text-gray-600">Book appointment</p>
              </button>
              <button className="glass-button p-4 rounded-lg text-left hover:scale-105 transition-all duration-200">
                <TrendingUp className="h-6 w-6 text-purple-500 mb-2" />
                <p className="font-medium text-gray-800">Reports</p>
                <p className="text-xs text-gray-600">View analytics</p>
              </button>
              <button className="glass-button p-4 rounded-lg text-left hover:scale-105 transition-all duration-200">
                <Activity className="h-6 w-6 text-orange-500 mb-2" />
                <p className="font-medium text-gray-800">Emergency</p>
                <p className="text-xs text-gray-600">Quick admission</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
