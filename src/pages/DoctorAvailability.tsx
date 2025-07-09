
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Search, Clock, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const DoctorAvailability = () => {
  const [patientId, setPatientId] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock doctor data
  const mockDoctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      available: true,
      nextSlot: "2:30 PM",
      location: "Room 205",
      phone: "+1 (555) 123-4567",
      experience: "15 years",
      rating: 4.9
    },
    {
      id: "2", 
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      available: false,
      nextSlot: "Tomorrow 9:00 AM",
      location: "Room 301",
      phone: "+1 (555) 234-5678",
      experience: "12 years",
      rating: 4.8
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      available: true,
      nextSlot: "3:15 PM",
      location: "Room 150",
      phone: "+1 (555) 345-6789",
      experience: "8 years",
      rating: 4.9
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      available: true,
      nextSlot: "4:00 PM",
      location: "Room 180",
      phone: "+1 (555) 456-7890",
      experience: "20 years",
      rating: 4.7
    }
  ];

  const handleSearch = async () => {
    if (!patientId.trim()) {
      toast.error("Please enter a patient ID");
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock patient data and doctor recommendations
    const mockPatient = {
      id: patientId,
      name: "John Smith",
      condition: "Regular Checkup",
      recommendedSpecialties: ["General Medicine", "Cardiology"]
    };

    setSearchResults({
      patient: mockPatient,
      doctors: mockDoctors
    });
    
    setIsSearching(false);
    toast.success("Doctor availability checked successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-green-500">
          <Stethoscope className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Doctor Availability</h1>
          <p className="text-gray-600">Check which doctors are available for your patient</p>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gray-800">Patient Lookup</CardTitle>
          <CardDescription>Enter patient ID to check doctor availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="patientId" className="text-gray-700">Patient ID</Label>
              <Input
                id="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="glass-card border-white/30"
                placeholder="Enter patient ID (e.g., P001, P002)"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transition-all duration-300 transform hover:scale-105"
              >
                {isSearching ? (
                  <>
                    <Search className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Check Availability
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {searchResults && (
        <div className="space-y-6 slide-up">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-gray-800">Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{searchResults.patient.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{searchResults.patient.name}</h3>
                  <p className="text-gray-600">ID: {searchResults.patient.id}</p>
                  <p className="text-sm text-gray-500">{searchResults.patient.condition}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-gray-800">Available Doctors</CardTitle>
              <CardDescription>Doctors currently available for consultation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.doctors.map((doctor: any) => (
                  <Card key={doctor.id} className={`glass-card transition-all duration-300 hover:scale-105 ${doctor.available ? 'ring-2 ring-green-200' : 'opacity-75'}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <p className="text-xs text-gray-500">{doctor.experience} experience</p>
                        </div>
                        <Badge 
                          variant={doctor.available ? "default" : "secondary"}
                          className={doctor.available ? "bg-green-500 text-white" : "bg-orange-200 text-orange-800"}
                        >
                          {doctor.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Next slot: {doctor.nextSlot}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{doctor.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{doctor.phone}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({doctor.rating})</span>
                        </div>
                      </div>

                      <Button
                        className={`w-full mt-4 transition-all duration-300 ${
                          doctor.available 
                            ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white" 
                            : "glass-button"
                        }`}
                        disabled={!doctor.available}
                      >
                        {doctor.available ? "Book Appointment" : "Add to Waitlist"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DoctorAvailability;
