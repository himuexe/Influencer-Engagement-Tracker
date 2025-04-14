import { Calendar, Plus } from 'lucide-react';

const campaigns = [
  {
    id: 1,
    name: 'Summer Collection Launch',
    status: 'Active',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    budget: '$15,000',
    influencers: 8,
    engagement: '4.2%',
  },
  {
    id: 2,
    name: 'Back to School',
    status: 'Planning',
    startDate: '2024-08-15',
    endDate: '2024-09-15',
    budget: '$25,000',
    influencers: 12,
    engagement: 'N/A',
  },
  {
    id: 3,
    name: 'Spring Tech Review',
    status: 'Completed',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    budget: '$18,000',
    influencers: 6,
    engagement: '3.8%',
  },
];

export function Campaigns() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Campaign
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${campaign.status === 'Active' ? 'bg-green-100 text-green-800' : campaign.status === 'Planning' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {campaign.status}
              </span>
              <button className="text-sm text-muted-foreground hover:text-foreground">
                •••
              </button>
            </div>
            <h2 className="mt-4 text-lg font-semibold">{campaign.name}</h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {campaign.startDate} - {campaign.endDate}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
              <div>
                <p className="text-muted-foreground">Budget</p>
                <p className="font-medium">{campaign.budget}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Influencers</p>
                <p className="font-medium">{campaign.influencers}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Engagement</p>
                <p className="font-medium">{campaign.engagement}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}