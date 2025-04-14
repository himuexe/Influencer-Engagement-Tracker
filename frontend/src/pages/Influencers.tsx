import { Search, Filter } from 'lucide-react';

const influencers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    handle: '@sarahjbeauty',
    platform: 'Instagram',
    followers: '125K',
    engagement: '4.8%',
    category: 'Beauty & Lifestyle',
  },
  {
    id: 2,
    name: 'Mike Chen',
    handle: '@techmikereviews',
    platform: 'YouTube',
    followers: '450K',
    engagement: '3.2%',
    category: 'Technology',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    handle: '@emmafitness',
    platform: 'Instagram',
    followers: '89K',
    engagement: '5.1%',
    category: 'Fitness & Health',
  },
];

export function Influencers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Influencers</h1>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Add Influencer
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search influencers..."
            className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-accent">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="grid grid-cols-7 gap-4 border-b p-4 font-medium">
          <div className="col-span-2">Name</div>
          <div>Platform</div>
          <div>Followers</div>
          <div>Engagement</div>
          <div>Category</div>
          <div className="text-right">Actions</div>
        </div>
        {influencers.map((influencer) => (
          <div
            key={influencer.id}
            className="grid grid-cols-7 gap-4 border-b p-4 last:border-0"
          >
            <div className="col-span-2">
              <div className="font-medium">{influencer.name}</div>
              <div className="text-sm text-muted-foreground">
                {influencer.handle}
              </div>
            </div>
            <div className="self-center">{influencer.platform}</div>
            <div className="self-center">{influencer.followers}</div>
            <div className="self-center">{influencer.engagement}</div>
            <div className="self-center">{influencer.category}</div>
            <div className="flex justify-end gap-2">
              <button className="rounded-lg px-2 py-1 text-sm hover:bg-accent">
                Edit
              </button>
              <button className="rounded-lg px-2 py-1 text-sm text-destructive hover:bg-destructive/10">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}