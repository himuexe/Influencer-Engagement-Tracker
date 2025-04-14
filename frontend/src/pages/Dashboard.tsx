import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownRight, ArrowUpRight, BarChart3, Users, TrendingUp, MousePointerClick } from "lucide-react";
import MetricsChart from "@/components/MetricsChart";
import PlatformIcon from "@/components/PlatformIcon";
import StatCard from "@/components/StatCard";
import { useQuery } from '@tanstack/react-query';
import { mockDashboardData } from '@/lib/mockData';
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardData {
  metrics: {
    engagement: {
      value: number;
      change: number;
    };
    impressions: {
      value: number;
      change: number;
    };
    roi: {
      value: number;
      change: number;
    };
    conversions: {
      value: number;
      change: number;
    };
    clicks: {
      value: number;
      change: number;
    };
  };
  campaigns: {
    active: number;
    completed: number;
    draft: number;
  };
  platformBreakdown: {
    name: string;
    followers: number;
    engagement: number;
    posts: number;
  }[];
  recentActivities: {
    id: string;
    action: string;
    platform: string;
    time: string;
    details: string;
  }[];
  topInfluencers: {
    id: string;
    name: string;
    handle: string;
    platform: string;
    followers: number;
    engagement: number;
    image: string;
  }[];
  dailyMetrics: {
    date: string;
    engagement: number;
    impressions: number;
    clicks: number;
  }[];
}

const fetchDashboardData = async (): Promise<DashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardData as DashboardData);
    }, 1000);
  });
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const { data, isLoading } = useQuery({
    queryKey: ['dashboardData', timeRange],
    queryFn: fetchDashboardData
  });

  if (isLoading) {
    return (
      <div className="dashboard-layout animate-fade-in p-4 md:p-8 max-w-7xl mx-auto">
        <div className="grid gap-4 md:gap-8 mb-8">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const safeData = data as DashboardData;
  
  const engagementChange = safeData?.metrics?.engagement?.change || 0;
  const isEngagementUp = engagementChange >= 0;

  const roiChange = safeData?.metrics?.roi?.change || 0;
  const isRoiUp = roiChange >= 0;

  const conversionsChange = safeData?.metrics?.conversions?.change || 0;
  const isConversionsUp = conversionsChange >= 0;

  return (
    <div className="dashboard-layout animate-fade-in p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your influencer marketing performance
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Tabs defaultValue="7d" className="w-full" onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Engagement Rate"
          value={`${safeData?.metrics?.engagement?.value.toFixed(2)}%`}
          change={safeData?.metrics?.engagement?.change}
          icon={<BarChart3 className="text-primary" />}
          helpText="Average engagement across all platforms"
        />
        
        <StatCard 
          title="Impressions"
          value={`${(safeData?.metrics?.impressions?.value / 1000).toFixed(1)}K`}
          change={safeData?.metrics?.impressions?.change}
          icon={<Users className="text-primary" />}
          helpText="Total reach across all campaigns"
        />
        
        <StatCard 
          title="ROI"
          value={`${safeData?.metrics?.roi?.value.toFixed(1)}x`}
          change={safeData?.metrics?.roi?.change}
          icon={<TrendingUp className="text-primary" />}
          helpText="Return on investment for all campaigns"
        />
        
        <StatCard 
          title="Conversions"
          value={`${safeData?.metrics?.conversions?.value}`}
          change={safeData?.metrics?.conversions?.change}
          secondaryValue={`${(safeData?.metrics?.clicks?.value / 1000).toFixed(1)}K clicks`}
          icon={<MousePointerClick className="text-primary" />}
          helpText="Total conversions and clicks"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Daily engagement and impressions</CardDescription>
          </CardHeader>
          <CardContent>
            <MetricsChart 
              data={safeData?.dailyMetrics || []} 
              height={300} 
              dataKeys={['engagement', 'impressions']}
              colors={['#4f46e5', '#06b6d4']}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Breakdown</CardTitle>
            <CardDescription>Followers by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safeData?.platformBreakdown?.map((platform) => (
                <div key={platform.name} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                    <PlatformIcon platform={platform.name} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{platform.name}</span>
                      <span className="text-sm font-medium">
                        {platform.followers.toLocaleString()}
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
                        style={{
                          width: `${(platform.followers / 15000) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safeData?.recentActivities?.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 mt-0.5">
                    <PlatformIcon platform={activity.platform} size={16} />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Influencers</CardTitle>
            <CardDescription>By engagement rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safeData?.topInfluencers?.map((influencer) => (
                <div key={influencer.id} className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={influencer.image}
                      alt={influencer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{influencer.name}</p>
                        <div className="flex items-center">
                          <PlatformIcon platform={influencer.platform} size={14} />
                          <span className="text-xs text-muted-foreground ml-1">
                            @{influencer.handle}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{influencer.engagement}%</p>
                        <p className="text-xs text-muted-foreground">
                          {influencer.followers.toLocaleString()} followers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
