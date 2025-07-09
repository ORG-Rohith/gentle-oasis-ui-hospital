
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Calendar,
  Stethoscope,
  Database,
  Download,
  Heart,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Register Patient", url: "/patients/register", icon: UserPlus },
  { title: "Doctor Availability", url: "/doctors/availability", icon: Stethoscope },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "View Data", url: "/data/view", icon: Database },
  { title: "Data Recovery", url: "/data/recovery", icon: Download },
];

export function AppSidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="glass-card border-r border-white/20">
      <SidebarContent>
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-green-500">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-800">MediCare</h2>
              <p className="text-sm text-gray-600">Hospital Management</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={isActive(item.url) ? "bg-primary/20 text-primary font-medium" : ""}>
                    <NavLink to={item.url} className="flex items-center gap-3 transition-all duration-200 hover:bg-white/50 rounded-lg">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/20 p-4">
        <div className="glass-card p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{user?.name.charAt(0)}</span>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="w-full glass-button"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
