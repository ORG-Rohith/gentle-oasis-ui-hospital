
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    bloodType: "",
    allergies: "",
    medicalHistory: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`Patient ${formData.firstName} ${formData.lastName} registered successfully!`);
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      emergencyContact: "",
      bloodType: "",
      allergies: "",
      medicalHistory: ""
    });
    
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      emergencyContact: "",
      bloodType: "",
      allergies: "",
      medicalHistory: ""
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-green-500">
          <UserPlus className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Patient Registration</h1>
          <p className="text-gray-600">Register a new patient in the system</p>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gray-800">Patient Information</CardTitle>
          <CardDescription>Please fill out all required fields carefully</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="glass-card border-white/30"
                  placeholder="Enter first name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="glass-card border-white/30"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-700">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="150"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="glass-card border-white/30"
                  placeholder="Age"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-700">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="glass-card border-white/30">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Blood Type</Label>
                <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
                  <SelectTrigger className="glass-card border-white/30">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="glass-card border-white/30"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="glass-card border-white/30"
                  placeholder="patient@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-700">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="glass-card border-white/30"
                placeholder="Complete address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact" className="text-gray-700">Emergency Contact *</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                className="glass-card border-white/30"
                placeholder="Emergency contact name and phone"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies" className="text-gray-700">Known Allergies</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                className="glass-card border-white/30"
                placeholder="List any known allergies..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory" className="text-gray-700">Medical History</Label>
              <Textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                className="glass-card border-white/30"
                placeholder="Brief medical history..."
                rows={4}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Register Patient
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="glass-button"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientRegistration;
