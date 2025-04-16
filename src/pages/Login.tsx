
import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    firstName: ''
  });
  
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('userFirstName');
  
  // If already logged in, redirect to home
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store first name in localStorage (temporary solution until Supabase integration)
    localStorage.setItem('userFirstName', formData.firstName);
    
    toast({
      title: "Welcome!",
      description: `Nice to see you, ${formData.firstName}!`,
    });
    
    // Use replace instead of push to avoid back button issues
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <Input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="pl-10"
                  placeholder="Enter your first name"
                />
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  placeholder="Enter your email"
                />
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
