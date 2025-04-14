
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, Eye, FilePlus, MoreVertical, Pencil, Trash, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Table as TableIcon, Filter, Search } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import PlatformIcon, { PlatformType } from "@/components/PlatformIcon";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";

interface ReportData {
  id: string;
  name: string;
  dateRange: {
    start: string;
    end: string;
  };
  type: string;
  platforms: PlatformType[];
  dateCreated: string;
  metrics: {
    impressions: number;
    engagement: number;
    clicks: number;
    conversions: number;
  };
}

const fetchReports = async (): Promise<ReportData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "rep_1",
          name: "Q2 Instagram Campaign Performance",
          dateRange: {
            start: "2023-04-01",
            end: "2023-06-30"
          },
          type: "Campaign",
          platforms: ["instagram"],
          dateCreated: "2023-07-05",
          metrics: {
            impressions: 1250000,
            engagement: 87500,
            clicks: 32000,
            conversions: 4800
          }
        },
        {
          id: "rep_2",
          name: "Summer Product Launch",
          dateRange: {
            start: "2023-05-15",
            end: "2023-07-15"
          },
          type: "Product",
          platforms: ["instagram", "twitter", "youtube"],
          dateCreated: "2023-07-20",
          metrics: {
            impressions: 2750000,
            engagement: 195000,
            clicks: 68000,
            conversions: 12500
          }
        },
        {
          id: "rep_3",
          name: "Influencer Performance Analysis",
          dateRange: {
            start: "2023-01-01",
            end: "2023-06-30"
          },
          type: "Influencer",
          platforms: ["instagram", "youtube"],
          dateCreated: "2023-07-10",
          metrics: {
            impressions: 4500000,
            engagement: 320000,
            clicks: 95000,
            conversions: 18200
          }
        },
        {
          id: "rep_4",
          name: "ROI Breakdown by Platform",
          dateRange: {
            start: "2023-03-01",
            end: "2023-06-30"
          },
          type: "ROI",
          platforms: ["instagram", "twitter", "youtube"],
          dateCreated: "2023-07-15",
          metrics: {
            impressions: 3200000,
            engagement: 240000,
            clicks: 82000,
            conversions: 15600
          }
        },
        {
          id: "rep_5",
          name: "Hashtag Campaign Performance",
          dateRange: {
            start: "2023-06-01",
            end: "2023-06-30"
          },
          type: "Campaign",
          platforms: ["instagram", "twitter"],
          dateCreated: "2023-07-08",
          metrics: {
            impressions: 980000,
            engagement: 76000,
            clicks: 28000,
            conversions: 3900
          }
        }
      ]);
    }, 1500);
  });
};

const PLATFORM_COLORS = {
  instagram: "#E1306C",
  twitter: "#1DA1F2",
  youtube: "#FF0000"
};

const CHART_COLORS = ["#9b87f5", "#33C3F0", "#1EAEDB", "#7E69AB"];

const TYPE_COLORS = {
  Campaign: "bg-purple-100 text-purple-800",
  Product: "bg-blue-100 text-blue-800",
  Influencer: "bg-pink-100 text-pink-800",
  ROI: "bg-green-100 text-green-800"
};

const Reports = () => {
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [date, setDate] = useState<DateRange>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [reportDetailOpen, setReportDetailOpen] = useState(false);
  const { toast } = useToast();

  const { data: reportsData, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });

  const typedReportsData = reportsData as ReportData[];

  const handleCreateReport = () => {
    toast({
      title: "Report Created",
      description: "Your report has been successfully created.",
    });
    setIsCreatingReport(false);
  };

  const handleReportClick = (report: ReportData) => {
    setSelectedReport(report);
    setReportDetailOpen(true);
  };

  // Function to generate chart data from selected report
  const getChartData = (report: ReportData | null) => {
    if (!report) return [];
    
    // Create date range for the chart
    const startDate = new Date(report.dateRange.start);
    const endDate = new Date(report.dateRange.end);
    const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Generate data points
    return Array.from({ length: Math.min(diffDays, 10) }).map((_, index) => {
      const factor = Math.sin(index / 3) * 0.5 + 0.5; // Create some variation
      return {
        date: format(new Date(startDate.getTime() + index * (1000 * 60 * 60 * 24 * (diffDays / 10))), 'MMM dd'),
        impressions: Math.round(report.metrics.impressions / 10 * (factor + 0.5)),
        engagement: Math.round(report.metrics.engagement / 10 * (factor + 0.5)),
        clicks: Math.round(report.metrics.clicks / 10 * (factor + 0.5)),
        conversions: Math.round(report.metrics.conversions / 10 * (factor + 0.5))
      };
    });
  };

  // Function to generate pie chart data
  const getPieChartData = (report: ReportData | null) => {
    if (!report) return [];
    
    return [
      { name: 'Impressions', value: report.metrics.impressions },
      { name: 'Engagement', value: report.metrics.engagement },
      { name: 'Clicks', value: report.metrics.clicks },
      { name: 'Conversions', value: report.metrics.conversions }
    ];
  };

  return (
    <div className="dashboard-layout animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 text-transparent bg-clip-text">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground">
              Create, manage, and analyze custom reports for your campaigns
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button onClick={() => setIsCreatingReport(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <FilePlus className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4 rounded-lg mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search reports..." className="pl-9" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-white dark:bg-slate-800">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="campaign">Campaign</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="influencer">Influencer</SelectItem>
                  <SelectItem value="roi">ROI</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-white dark:bg-slate-800">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal bg-white dark:bg-slate-800",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center space-x-2 ml-auto">
              <Button 
                variant={viewMode === "grid" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "table" ? "default" : "outline"} 
                size="icon" 
                onClick={() => setViewMode("table")}
                className="rounded-l-none"
              >
                <TableIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="all" className="rounded-full">All Reports</TabsTrigger>
            <TabsTrigger value="campaigns" className="rounded-full">Campaigns</TabsTrigger>
            <TabsTrigger value="products" className="rounded-full">Products</TabsTrigger>
            <TabsTrigger value="influencers" className="rounded-full">Influencers</TabsTrigger>
            <TabsTrigger value="roi" className="rounded-full">ROI Analysis</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Reports List */}
        {viewMode === "grid" ? (
          isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-dashed border-2 border-muted hover:border-primary/50 group cursor-pointer"
                onClick={() => setIsCreatingReport(true)}
              >
                <CardContent className="flex flex-col items-center justify-center h-64 p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FilePlus className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Create New Report</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Build a custom report with tailored metrics and visualizations
                  </p>
                </CardContent>
              </Card>
              
              {typedReportsData?.map((report) => (
                <Card 
                  key={report.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleReportClick(report)}
                >
                  <CardHeader className="p-5 pb-2 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {report.name}
                        </CardTitle>
                        <CardDescription className="flex items-center text-xs mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(report.dateRange.start).toLocaleDateString()} - {new Date(report.dateRange.end).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={cn("ml-2", TYPE_COLORS[report.type as keyof typeof TYPE_COLORS] || "bg-gray-100 text-gray-800")}>
                        {report.type}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {report.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs flex items-center gap-1 bg-white/50 dark:bg-black/20">
                          <PlatformIcon platform={platform} size={12} />
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 pt-4">
                    <div className="h-28">
                      {/* Mini chart preview */}
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Imp', value: report.metrics.impressions / 10000 },
                          { name: 'Eng', value: report.metrics.engagement / 1000 },
                          { name: 'Clk', value: report.metrics.clicks / 1000 },
                          { name: 'Conv', value: report.metrics.conversions / 100 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                          <XAxis dataKey="name" fontSize={10} />
                          <YAxis hide />
                          <Tooltip content={() => null} />
                          <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">Impressions</p>
                        <p className="font-medium">{report.metrics.impressions.toLocaleString()}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">Engagement</p>
                        <p className="font-medium">{report.metrics.engagement.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 text-xs text-muted-foreground flex justify-between border-t">
                    <span>Created {new Date(report.dateCreated).toLocaleDateString()}</span>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => {
                        e.stopPropagation();
                        toast({
                          title: "Report downloaded",
                          description: "The report has been downloaded successfully."
                        });
                      }}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )
        ) : (
          // Table view
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Platforms</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead className="text-right">Metrics</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    typedReportsData?.map((report) => (
                      <TableRow key={report.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleReportClick(report)}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <Badge className={cn(TYPE_COLORS[report.type as keyof typeof TYPE_COLORS] || "bg-gray-100 text-gray-800")}>
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {report.platforms.map((platform) => (
                              <div key={platform} className="w-6 h-6 rounded-full flex items-center justify-center" 
                                style={{ backgroundColor: `${PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS]}20` }}>
                                <PlatformIcon platform={platform} size={12} />
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(report.dateRange.start).toLocaleDateString()} - {new Date(report.dateRange.end).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex gap-3 text-xs">
                            <span className="text-muted-foreground">Imp: <strong className="text-foreground">{report.metrics.impressions.toLocaleString()}</strong></span>
                            <span className="text-muted-foreground">Eng: <strong className="text-foreground">{report.metrics.engagement.toLocaleString()}</strong></span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" /> Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Report Creation Dialog */}
      <Dialog open={isCreatingReport} onOpenChange={setIsCreatingReport}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Configure your custom report settings and metrics
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Tabs defaultValue="general">
              <TabsList className="mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="visualization">Visualization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input id="report-name" placeholder="Enter report name" />
                </div>
                
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="campaign">Campaign</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="influencer">Influencer</SelectItem>
                      <SelectItem value="roi">ROI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Platforms</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="instagram" />
                      <Label htmlFor="instagram" className="flex items-center">
                        <PlatformIcon platform="instagram" size={16} className="mr-2" />
                        Instagram
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="twitter" />
                      <Label htmlFor="twitter" className="flex items-center">
                        <PlatformIcon platform="twitter" size={16} className="mr-2" />
                        Twitter
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="youtube" />
                      <Label htmlFor="youtube" className="flex items-center">
                        <PlatformIcon platform="youtube" size={16} className="mr-2" />
                        YouTube
                      </Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="space-y-4">
                <div className="space-y-2">
                  <Label>Metrics to Include</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="impressions" defaultChecked />
                      <Label htmlFor="impressions">Impressions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="engagement" defaultChecked />
                      <Label htmlFor="engagement">Engagement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="clicks" defaultChecked />
                      <Label htmlFor="clicks">Clicks</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="conversions" defaultChecked />
                      <Label htmlFor="conversions">Conversions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="roi" />
                      <Label htmlFor="roi">ROI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cpc" />
                      <Label htmlFor="cpc">Cost per Click</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ctr" />
                      <Label htmlFor="ctr">Click-through Rate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cpa" />
                      <Label htmlFor="cpa">Cost per Acquisition</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Comparison</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select comparison period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="previous">Previous Period</SelectItem>
                      <SelectItem value="yoy">Year over Year</SelectItem>
                      <SelectItem value="custom">Custom Period</SelectItem>
                      <SelectItem value="none">No Comparison</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="visualization" className="space-y-4">
                <div className="space-y-2">
                  <Label>Chart Types</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                      <div className="h-20 bg-muted/50 rounded-md flex items-center justify-center mb-2">
                        <LineChartIcon className="h-10 w-10 text-primary/70" />
                      </div>
                      <div className="text-sm font-medium">Line Chart</div>
                      <div className="text-xs text-muted-foreground">Show trends over time</div>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                      <div className="h-20 bg-muted/50 rounded-md flex items-center justify-center mb-2">
                        <BarChart3 className="h-10 w-10 text-primary/70" />
                      </div>
                      <div className="text-sm font-medium">Bar Chart</div>
                      <div className="text-xs text-muted-foreground">Compare values across categories</div>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                      <div className="h-20 bg-muted/50 rounded-md flex items-center justify-center mb-2">
                        <PieChartIcon className="h-10 w-10 text-primary/70" />
                      </div>
                      <div className="text-sm font-medium">Pie Chart</div>
                      <div className="text-xs text-muted-foreground">Show composition of data</div>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                      <div className="h-20 bg-muted/50 rounded-md flex items-center justify-center mb-2">
                        <TableIcon className="h-10 w-10 text-primary/70" />
                      </div>
                      <div className="text-sm font-medium">Data Table</div>
                      <div className="text-xs text-muted-foreground">Show detailed data in rows and columns</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Additional Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-legend" defaultChecked />
                      <Label htmlFor="show-legend">Show Legend</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-labels" defaultChecked />
                      <Label htmlFor="show-labels">Show Data Labels</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-grid" defaultChecked />
                      <Label htmlFor="show-grid">Show Grid Lines</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingReport(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateReport} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Detail Dialog */}
      {selectedReport && (
        <Dialog open={reportDetailOpen} onOpenChange={setReportDetailOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="mr-8">{selectedReport.name}</DialogTitle>
                <Badge className={cn(TYPE_COLORS[selectedReport.type as keyof typeof TYPE_COLORS] || "bg-gray-100 text-gray-800")}>
                  {selectedReport.type}
                </Badge>
              </div>
              <DialogDescription className="flex flex-wrap gap-2 items-center mt-2">
                <span className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {new Date(selectedReport.dateRange.start).toLocaleDateString()} - {new Date(selectedReport.dateRange.end).toLocaleDateString()}
                </span>
                <span className="text-muted-foreground mx-2">•</span>
                <div className="flex gap-1">
                  {selectedReport.platforms.map((platform) => (
                    <Badge key={platform} variant="outline" className="text-xs flex items-center gap-1 bg-white/50 dark:bg-black/20">
                      <PlatformIcon platform={platform} size={12} />
                      {platform}
                    </Badge>
                  ))}
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                  <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                  <TabsTrigger value="raw">Raw Data</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-medium text-sm text-muted-foreground mb-1">Impressions</div>
                        <div className="text-2xl font-bold">{selectedReport.metrics.impressions.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-medium text-sm text-muted-foreground mb-1">Engagement</div>
                        <div className="text-2xl font-bold">{selectedReport.metrics.engagement.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-medium text-sm text-muted-foreground mb-1">Clicks</div>
                        <div className="text-2xl font-bold">{selectedReport.metrics.clicks.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-medium text-sm text-muted-foreground mb-1">Conversions</div>
                        <div className="text-2xl font-bold">{selectedReport.metrics.conversions.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                      <CardDescription>Key metrics for the selected time period</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={getChartData(selectedReport)}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="impressions" name="Impressions" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
                            <Bar dataKey="engagement" name="Engagement" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} />
                            <Bar dataKey="clicks" name="Clicks" fill={CHART_COLORS[2]} radius={[4, 4, 0, 0]} />
                            <Bar dataKey="conversions" name="Conversions" fill={CHART_COLORS[3]} radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="trends" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Metric Trends</CardTitle>
                      <CardDescription>Performance trends over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={getChartData(selectedReport)}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="impressions" name="Impressions" stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="engagement" name="Engagement" stroke={CHART_COLORS[1]} strokeWidth={2} dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="clicks" name="Clicks" stroke={CHART_COLORS[2]} strokeWidth={2} dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="conversions" name="Conversions" stroke={CHART_COLORS[3]} strokeWidth={2} dot={{ r: 4 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="breakdown" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Metrics Distribution</CardTitle>
                        <CardDescription>Breakdown of key metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-72 flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={getPieChartData(selectedReport)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={90}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {getPieChartData(selectedReport).map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => value.toLocaleString()} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Platform Breakdown</CardTitle>
                        <CardDescription>Performance by platform</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedReport.platforms.map((platform) => (
                            <div key={platform} className="space-y-2">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full mr-3" style={{ backgroundColor: `${PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS]}20` }}>
                                  <PlatformIcon platform={platform} size={16} className="m-2" />
                                </div>
                                <div className="font-medium capitalize">{platform}</div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Impressions</span>
                                  <span className="font-medium">{Math.round(selectedReport.metrics.impressions * (Math.random() * 0.4 + 0.1)).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Engagement</span>
                                  <span className="font-medium">{Math.round(selectedReport.metrics.engagement * (Math.random() * 0.4 + 0.1)).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Clicks</span>
                                  <span className="font-medium">{Math.round(selectedReport.metrics.clicks * (Math.random() * 0.4 + 0.1)).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Conversions</span>
                                  <span className="font-medium">{Math.round(selectedReport.metrics.conversions * (Math.random() * 0.4 + 0.1)).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="raw" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Raw Data</CardTitle>
                      <CardDescription>Detailed metrics by date</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Impressions</TableHead>
                            <TableHead className="text-right">Engagement</TableHead>
                            <TableHead className="text-right">Clicks</TableHead>
                            <TableHead className="text-right">Conversions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getChartData(selectedReport).map((data, i) => (
                            <TableRow key={i}>
                              <TableCell>{data.date}</TableCell>
                              <TableCell className="text-right">{data.impressions.toLocaleString()}</TableCell>
                              <TableCell className="text-right">{data.engagement.toLocaleString()}</TableCell>
                              <TableCell className="text-right">{data.clicks.toLocaleString()}</TableCell>
                              <TableCell className="text-right">{data.conversions.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setReportDetailOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Report downloaded",
                  description: "The report has been downloaded successfully."
                });
              }} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Reports;
