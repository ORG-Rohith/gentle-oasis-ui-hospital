
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Download, 
  Upload, 
  Database, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  FileText,
  HardDrive
} from "lucide-react";
import { toast } from "sonner";

const DataRecovery = () => {
  const [exportProgress, setExportProgress] = useState(0);
  const [importProgress, setImportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async (dataType: string) => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    for (let i = 0; i <= 100; i += 10) {
      setExportProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setIsExporting(false);
    toast.success(`${dataType} data exported successfully!`);
  };

  const handleImport = async () => {
    setIsImporting(true);
    setImportProgress(0);

    // Simulate import progress
    for (let i = 0; i <= 100; i += 15) {
      setImportProgress(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setIsImporting(false);
    toast.success("Data imported successfully!");
  };

  const backupHistory = [
    {
      id: "1",
      date: "2024-12-09 08:00 AM",
      type: "Full Backup",
      size: "2.3 GB",
      status: "Success",
      records: "1,247 patients, 24 doctors"
    },
    {
      id: "2",
      date: "2024-12-08 08:00 AM",
      type: "Incremental",
      size: "145 MB",
      status: "Success",
      records: "87 new records"
    },
    {
      id: "3",
      date: "2024-12-07 08:00 AM",
      type: "Full Backup",
      size: "2.1 GB",
      status: "Success",
      records: "1,195 patients, 24 doctors"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-green-500">
          <Database className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Data Recovery</h1>
          <p className="text-gray-600">Export, import, and manage your hospital data</p>
        </div>
      </div>

      <Alert className="glass-card border-blue-200">
        <Shield className="h-4 w-4" />
        <AlertDescription className="text-gray-700">
          All data operations are encrypted and secured. Regular backups are automatically created every 24 hours.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="export" className="space-y-6">
        <TabsList className="glass-card p-1">
          <TabsTrigger value="export" className="data-[state=active]:bg-white/50">
            Export Data
          </TabsTrigger>
          <TabsTrigger value="import" className="data-[state=active]:bg-white/50">
            Import Data
          </TabsTrigger>
          <TabsTrigger value="backups" className="data-[state=active]:bg-white/50">
            Backup History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <FileText className="h-5 w-5" />
                  Patient Data Export
                </CardTitle>
                <CardDescription>Export all patient records and medical history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Records</span>
                    <span>1,247 patients</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Data Size</span>
                    <span>~1.8 GB</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Format</span>
                    <span>CSV, JSON, PDF</span>
                  </div>
                </div>
                
                {isExporting && (
                  <div className="space-y-2">
                    <Progress value={exportProgress} className="h-2" />
                    <p className="text-sm text-gray-600 text-center">{exportProgress}% complete</p>
                  </div>
                )}
                
                <Button
                  onClick={() => handleExport("Patient")}
                  disabled={isExporting}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                >
                  {isExporting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Export Patient Data
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <HardDrive className="h-5 w-5" />
                  Doctor Data Export
                </CardTitle>
                <CardDescription>Export doctor profiles and schedules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Records</span>
                    <span>24 doctors</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Data Size</span>
                    <span>~45 MB</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Format</span>
                    <span>CSV, JSON, PDF</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleExport("Doctor")}
                  disabled={isExporting}
                  className="w-full glass-button hover:bg-white/60"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Doctor Data
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Database className="h-5 w-5" />
                  Complete System Backup
                </CardTitle>
                <CardDescription>Export all hospital management system data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 glass-card rounded-lg">
                    <p className="text-gray-500">Patients</p>
                    <p className="font-bold text-gray-800">1,247</p>
                  </div>
                  <div className="text-center p-3 glass-card rounded-lg">
                    <p className="text-gray-500">Doctors</p>
                    <p className="font-bold text-gray-800">24</p>
                  </div>
                  <div className="text-center p-3 glass-card rounded-lg">
                    <p className="text-gray-500">Appointments</p>
                    <p className="font-bold text-gray-800">3,456</p>
                  </div>
                  <div className="text-center p-3 glass-card rounded-lg">
                    <p className="text-gray-500">Total Size</p>
                    <p className="font-bold text-gray-800">2.3 GB</p>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleExport("Complete System")}
                  disabled={isExporting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Complete Backup
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Upload className="h-5 w-5" />
                Data Import
              </CardTitle>
              <CardDescription>Import previously exported data or migrate from other systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="glass-card border-yellow-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-700">
                  Warning: Importing data will merge with existing records. Please ensure data compatibility before proceeding.
                </AlertDescription>
              </Alert>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center glass-card">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Drop files here or click to browse</h3>
                <p className="text-gray-600 mb-4">Supported formats: CSV, JSON, XML</p>
                <Button className="glass-button">
                  Choose Files
                </Button>
              </div>

              {isImporting && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Progress value={importProgress} className="h-2" />
                    <p className="text-sm text-gray-600 text-center">{importProgress}% complete</p>
                  </div>
                  <Alert className="glass-card border-blue-200">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <AlertDescription className="text-gray-700">
                      Processing import... Please do not close this window.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={handleImport}
                  disabled={isImporting}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                >
                  {isImporting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Start Import
                    </>
                  )}
                </Button>
                <Button variant="outline" className="glass-button">
                  Validate Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backups" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Database className="h-5 w-5" />
                Backup History
              </CardTitle>
              <CardDescription>View and manage automated backups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backupHistory.map((backup) => (
                  <div key={backup.id} className="glass-card p-4 rounded-lg hover:bg-white/60 transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{backup.type}</h4>
                          <p className="text-sm text-gray-600">{backup.date}</p>
                          <p className="text-xs text-gray-500">{backup.records}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">{backup.size}</p>
                        <Badge className="bg-green-100 text-green-800 mt-1">
                          {backup.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="glass-button">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="glass-button">
                        Restore
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataRecovery;
