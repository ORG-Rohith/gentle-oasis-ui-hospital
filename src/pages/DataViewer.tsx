
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Search, Filter, Eye, Phone, Mail, MapPin } from "lucide-react";

const DataViewer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock patient data
  const patients = [
    {
      id: "P001",
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      address: "123 Main St, City, State",
      bloodType: "A+",
      lastVisit: "2024-12-08",
      status: "Active"
    },
    {
      id: "P002",
      name: "Mary Johnson",
      age: 32,
      gender: "Female",
      phone: "+1 (555) 234-5678",
      email: "mary.johnson@email.com",
      address: "456 Oak Ave, City, State",
      bloodType: "O-",
      lastVisit: "2024-12-07",
      status: "Active"
    },
    {
      id: "P003",
      name: "Robert Davis",
      age: 58,
      gender: "Male",
      phone: "+1 (555) 345-6789",
      email: "robert.davis@email.com",
      address: "789 Pine Rd, City, State",
      bloodType: "B+",
      lastVisit: "2024-12-05",
      status: "Inactive"
    }
  ];

  // Mock doctor data
  const doctors = [
    {
      id: "D001",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      experience: "15 years",
      phone: "+1 (555) 987-6543",
      email: "sarah.johnson@hospital.com",
      department: "Cardiovascular",
      availability: "Available",
      rating: 4.9,
      patients: 127
    },
    {
      id: "D002",
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      experience: "12 years",
      phone: "+1 (555) 876-5432",
      email: "michael.chen@hospital.com",
      department: "Neuroscience",
      availability: "Busy",
      rating: 4.8,
      patients: 89
    },
    {
      id: "D003",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      experience: "8 years",
      phone: "+1 (555) 765-4321",
      email: "emily.rodriguez@hospital.com",
      department: "Children's Health",
      availability: "Available",
      rating: 4.9,
      patients: 156
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || 
                         (filterType === "active" && patient.status === "Active") ||
                         (filterType === "inactive" && patient.status === "Inactive");
    return matchesSearch && matchesFilter;
  });

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-green-500">
          <Database className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Data Viewer</h1>
          <p className="text-gray-600">View and manage patient and doctor information</p>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gray-800">Search & Filter</CardTitle>
          <CardDescription>Find specific patients or doctors quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-card border-white/30"
                  placeholder="Search by name, ID, or specialty..."
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 glass-card border-white/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Records</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="patients" className="space-y-6">
        <TabsList className="glass-card p-1">
          <TabsTrigger value="patients" className="data-[state=active]:bg-white/50">
            Patients ({filteredPatients.length})
          </TabsTrigger>
          <TabsTrigger value="doctors" className="data-[state=active]:bg-white/50">
            Doctors ({filteredDoctors.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="glass-card hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{patient.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
                        <p className="text-gray-600">ID: {patient.id}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={patient.status === "Active" ? "default" : "secondary"}
                      className={patient.status === "Active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"}
                    >
                      {patient.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Age & Gender</p>
                      <p className="font-medium text-gray-800">{patient.age} years, {patient.gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Blood Type</p>
                      <p className="font-medium text-gray-800">{patient.bloodType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Visit</p>
                      <p className="font-medium text-gray-800">{patient.lastVisit}</p>
                    </div>
                    <div>
                      <Button size="sm" className="glass-button">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{patient.address}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="glass-card hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{doctor.name.split(' ')[1].charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                        <p className="text-gray-600">{doctor.specialty}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={doctor.availability === "Available" ? "default" : "secondary"}
                      className={doctor.availability === "Available" ? "bg-green-500 text-white" : "bg-orange-400 text-white"}
                    >
                      {doctor.availability}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Experience</p>
                      <p className="font-medium text-gray-800">{doctor.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Department</p>
                      <p className="font-medium text-gray-800">{doctor.department}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rating</p>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-800">{doctor.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500">Patients</p>
                      <p className="font-medium text-gray-800">{doctor.patients}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-4">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{doctor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{doctor.email}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4 glass-button">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataViewer;
