

import { BarChart3, TrendingUp, Users, Star } from 'lucide-react';

const stats = [
  {
    name: 'Total Influencers',
    value: '324',
    change: '+12%',
    icon: Users,
  },
  {
    name: 'Engagement Rate',
    value: '4.3%',
    change: '+2.1%',
    icon: TrendingUp,
  },
  {
    name: 'Active Campaigns',
    value: '12',
    change: '+3',
    icon: Star,
  },
  {
    name: 'Total Reach',
    value: '2.4M',
    change: '+18%',
    icon: BarChart3,
  },
];

export function Overview() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="rounded-xl border bg-card p-6 text-card-foreground shadow"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-green-500">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
          <div className="space-y-4">
            {/* Placeholder for activity feed */}
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Top Performing Influencers</h2>
          <div className="space-y-4">
            {/* Placeholder for influencer list */}
            <p className="text-sm text-muted-foreground">No influencers found</p>
          </div>
        </div>
      </div>
    </div>
  );
}