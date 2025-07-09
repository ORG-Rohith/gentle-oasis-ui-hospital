
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, User, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [appointmentData, setAppointmentData] = useState({
    patientName: "",
    patientId: "",
    doctorId: "",
    timeSlot: "",
    appointmentType: "",
    notes: ""
  });

  const doctors = [
    { id: "1", name: "Dr. Sarah Johnson", specialty: "Cardiology" },
    { id: "2", name: "Dr. Michael Chen", specialty: "Neurology" },
    { id: "3", name: "Dr. Emily Rodriguez", specialty: "Pediatrics" },
    { id: "4", name: "Dr. James Wilson", specialty: "Orthopedics" }
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const appointmentTypes = [
    "Regular Checkup",
    "Follow-up",
    "Emergency",
    "Consultation",
    "Surgery",
    "Lab Results"
  ];

  const handleInputChange = (field: string, value: string) => {
    setAppointmentData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !appointmentData.timeSlot) {
      toast.error("Please select date and time for the appointment");
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Appointment scheduled successfully!");
    
    // Reset form
    setSelectedDate(undefined);
    setAppointmentData({
      patientName: "",
      patientId: "",
      doctorId: "",
      timeSlot: "",
      appointmentType: "",
      notes: ""
    });
  };

  const upcomingAppointments = [
    {
      id: "1",
      patientName: "John Smith",
      doctor: "Dr. Sarah Johnson",
      date: "Today",
      time: "2:30 PM",
      type: "Regular Checkup",
      status: "confirmed"
    },
    {
      id: "2",
      patientName: "Mary Johnson",
      doctor: "Dr. Emily Rodriguez",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Follow-up",
      status: "pending"
    },
    {
      id: "3",
      patientName: "Robert Davis",
      doctor: "Dr. Michael Chen",
      date: "Dec 12",
      time: "3:15 PM",
      type: "Consultation",
      status: "confirmed"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-green-500">
          <CalendarIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Appointment Scheduler</h1>
          <p className="text-gray-600">Schedule and manage patient appointments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-gray-800">Schedule New Appointment</CardTitle>
            <CardDescription>Fill in the appointment details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="text-gray-700">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={appointmentData.patientName}
                    onChange={(e) => handleInputChange("patientName", e.target.value)}
                    className="glass-card border-white/30"
                    placeholder="Enter patient name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientId" className="text-gray-700">Patient ID</Label>
                  <Input
                    id="patientId"
                    value={appointmentData.patientId}
                    onChange={(e) => handleInputChange("patientId", e.target.value)}
                    className="glass-card border-white/30"
                    placeholder="P001, P002..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Select Doctor *</Label>
                <Select value={appointmentData.doctorId} onValueChange={(value) => handleInputChange("doctorId", value)}>
                  <SelectTrigger className="glass-card border-white/30">
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700">Appointment Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal glass-card border-white/30",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Time Slot *</Label>
                  <Select value={appointmentData.timeSlot} onValueChange={(value) => handleInputChange("timeSlot", value)}>
                    <SelectTrigger className="glass-card border-white/30">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Appointment Type *</Label>
                <Select value={appointmentData.appointmentType} onValueChange={(value) => handleInputChange("appointmentType", value)}>
                  <SelectTrigger className="glass-card border-white/30">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-700">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={appointmentData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="glass-card border-white/30"
                  placeholder="Any special instructions or notes..."
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transition-all duration-300 transform hover:scale-105"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-gray-800">Upcoming Appointments</CardTitle>
            <CardDescription>Recent and upcoming scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="glass-card p-4 rounded-lg hover:bg-white/60 transition-all duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{appointment.patientName}</h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Stethoscope className="h-3 w-3" />
                          {appointment.doctor}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-1">{appointment.type}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
