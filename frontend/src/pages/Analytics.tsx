import { BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const metrics = [
  {
    name: 'Total Reach',
    value: '2.4M',
    change: '+18%',
    trend: 'up',
  },
  {
    name: 'Engagement Rate',
    value: '4.3%',
    change: '-0.5%',
    trend: 'down',
  },
  {
    name: 'Conversion Rate',
    value: '2.8%',
    change: '+0.3%',
    trend: 'up',
  },
  {
    name: 'ROI',
    value: '3.2x',
    change: '+0.8x',
    trend: 'up',
  },
];

const platforms = [
  {
    name: 'Instagram',
    followers: '850K',
    engagement: '4.2%',
    posts: 128,
  },
  {
    name: 'YouTube',
    followers: '320K',
    engagement: '3.8%',
    posts: 45,
  },
  {
    name: 'TikTok',
    followers: '520K',
    engagement: '5.1%',
    posts: 96,
  },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="rounded-xl border bg-card p-6 text-card-foreground shadow"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{metric.name}</p>
              <div
                className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
              >
                {metric.change}
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Performance by Platform</h2>
            <select className="rounded-md border bg-background px-2 py-1 text-sm">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <div className="space-y-4">
            {platforms.map((platform) => (
              <div key={platform.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{platform.name}</span>
                  <span className="text-muted-foreground">
                    {platform.engagement} engagement
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: platform.engagement }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow">
          <h2 className="mb-6 text-lg font-semibold">Growth Trends</h2>
          <div className="flex h-[200px] items-end justify-between gap-2">
            {/* Placeholder for chart */}
            <div className="flex-1 rounded-t bg-primary/20" style={{ height: '60%' }} />
            <div className="flex-1 rounded-t bg-primary/20" style={{ height: '75%' }} />
            <div className="flex-1 rounded-t bg-primary/20" style={{ height: '45%' }} />
            <div className="flex-1 rounded-t bg-primary/20" style={{ height: '90%' }} />
            <div className="flex-1 rounded-t bg-primary/20" style={{ height: '65%' }} />
            <div className="flex-1 rounded-t bg-primary/20" style={{ height: '80%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}