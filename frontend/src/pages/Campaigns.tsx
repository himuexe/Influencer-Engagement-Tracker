import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Download,
  Eye,
  FilePlus,
  Filter,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Sliders,
  Trash,
  X,
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { mockCampaignsData, mockCampaignDetailsData } from '@/lib/mockData';
import PlatformIcon from '@/components/PlatformIcon';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Add proper type definitions for the campaign data
interface CampaignData {
  id: string;
  name: string;
  startDate: string;
  endDate: string | null;
  status: 'active' | 'completed' | 'draft';
  budget: number;
  platforms: string[];
  influencers: number;
  engagement: number;
  impressions: number;
}

interface CampaignDetailsData {
  platformBreakdown: {
    name: string;
    percentage: number;
    value: number;
  }[];
  dailyEngagement: {
    date: string;
    value: number;
  }[];
  topPosts: {
    id: string;
    influencer: string;
    content: string;
    platform: string;
    engagement: number;
    date: string;
  }[];
}

// Mock API calls
const fetchCampaigns = async (): Promise<CampaignData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCampaignsData as CampaignData[]);
    }, 500);
  });
};

const fetchCampaignDetails = async (campaignId: string): Promise<CampaignDetailsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const details = mockCampaignDetailsData.find(item => item.campaignId === campaignId);
      resolve(details?.data as CampaignDetailsData);
    }, 500);
  });
};

// Update the component to use proper type assertions
const Campaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<CampaignData['status'] | null>(null);
  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Make sure to type the campaign data properly
  const { data: campaignsData, isLoading: isLoadingCampaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
  });

  const { data: campaignDetailsData, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['campaignDetails', selectedCampaign],
    queryFn: () => fetchCampaignDetails(selectedCampaign),
    enabled: !!selectedCampaign,
  });

  // Type assertion to safely access data
  const typedCampaignsData = campaignsData as CampaignData[];
  const typedCampaignDetailsData = campaignDetailsData as CampaignDetailsData;

  // Filter campaigns based on filter state
  const filteredCampaigns = typedCampaignsData
    ? typedCampaignsData.filter((campaign) => {
        if (statusFilter && campaign.status !== statusFilter) return false;
        if (platformFilter && !campaign.platforms.includes(platformFilter)) return false;
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return campaign.name.toLowerCase().includes(query);
        }
        return true;
      })
    : [];

  const handleStatusFilter = (status: CampaignData['status'] | null) => {
    setStatusFilter(status);
  };

  const handlePlatformFilter = (platform: string | null) => {
    setPlatformFilter(platform);
  };

  const clearFilters = () => {
    setStatusFilter(null);
    setPlatformFilter(null);
    setSearchQuery('');
  };

  // Update JSX to use proper type assertions
  return (
    <div className="dashboard-layout animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage and track your influencer campaigns
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button onClick={() => {}} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-64"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusFilter('active')}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter('completed')}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter('draft')}>
                Draft
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handlePlatformFilter('Instagram')}>
                Instagram
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePlatformFilter('Twitter')}>
                Twitter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePlatformFilter('YouTube')}>
                YouTube
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={clearFilters}>
                Clear Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <Sliders className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Campaigns List */}
      {isLoadingCampaigns ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCampaign(campaign.id)}>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="truncate">{campaign.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
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
                </CardTitle>
                <CardDescription className="text-xs">
                  {new Date(campaign.startDate).toLocaleDateString()} - {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'Ongoing'}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex gap-1 mb-3">
                  {campaign.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="text-xs">
                      <PlatformIcon platform={platform} size={12} className="mr-1" />
                      {platform}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/50 p-2 rounded">
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded">
                    <p className="text-xs text-muted-foreground">Influencers</p>
                    <p className="font-medium">{campaign.influencers.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded">
                    <p className="text-xs text-muted-foreground">Engagement</p>
                    <p className="font-medium">{campaign.engagement.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded">
                    <p className="text-xs text-muted-foreground">Impressions</p>
                    <p className="font-medium">{campaign.impressions.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Campaign Details Sheet */}
      <Sheet open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {isLoadingDetails ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : selectedCampaign && typedCampaignDetailsData ? (
            <>
              <SheetHeader className="space-y-2.5">
                <SheetTitle>{typedCampaignsData.find(c => c.id === selectedCampaign)?.name}</SheetTitle>
                <SheetDescription>
                  Detailed metrics and performance insights for this campaign.
                </SheetDescription>
              </SheetHeader>
              
              {/* Platform Distribution */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Platform Distribution</h3>
                <div className="space-y-4">
                  {typedCampaignDetailsData.platformBreakdown.map((platform) => (
                    <div key={platform.name} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                        <PlatformIcon platform={platform.name} size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{platform.name}</span>
                          <span className="text-sm font-medium">
                            {platform.percentage}% ({platform.value})
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              platform.name === 'Instagram'
                                ? 'bg-[#E1306C]'
                                : platform.name === 'Twitter'
                                ? 'bg-[#1DA1F2]'
                                : 'bg-[#FF0000]'
                            }`}
                            style={{ width: `${platform.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Daily Engagement */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Daily Engagement</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={typedCampaignDetailsData.dailyEngagement}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#4f46e5" 
                        fill="#4f46e5" 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Top Performing Posts */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Top Performing Posts</h3>
                <div className="space-y-4">
                  {typedCampaignDetailsData.topPosts.map((post) => (
                    <div key={post.id} className="flex items-start border rounded-lg p-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 mt-0.5">
                        <PlatformIcon platform={post.platform} size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{post.influencer}</p>
                            <p className="text-sm mt-1">{post.content}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          <div className="bg-muted px-2 py-1 rounded text-xs font-medium">
                            {post.engagement.toLocaleString()} engagements
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Campaigns;
