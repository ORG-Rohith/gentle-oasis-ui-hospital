
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Loader2, Shield, Users } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, isLoading } = useAuth();

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (!success) {
      toast.error("Invalid credentials. Try admin/admin123 or receptionist/rec123");
    } else {
      toast.success("Welcome to MediCare Hospital Management System!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md fade-in">
        <Card className="glass-card shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-blue-500 to-green-500 w-fit bounce-gentle">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">MediCare HMS</CardTitle>
            <CardDescription className="text-gray-600">
              Hospital Management System
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-card border-white/30"
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-card border-white/30"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-2.5 transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            
            <div className="border-t border-white/20 pt-4">
              <div className="text-center text-sm text-gray-600 mb-3">Demo Credentials:</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 p-2 glass-card rounded">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700">Admin: admin / admin123</span>
                </div>
                <div className="flex items-center gap-2 p-2 glass-card rounded">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Receptionist: receptionist / rec123</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
