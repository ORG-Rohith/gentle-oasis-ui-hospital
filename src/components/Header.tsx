
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="glass-card border-b border-white/20 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="glass-button" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search patients, doctors..."
            className="pl-10 w-80 glass-card border-white/30"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="glass-button">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-soft"></div>
        <span className="text-sm text-gray-600">System Online</span>
      </div>
    </header>
  );
}
