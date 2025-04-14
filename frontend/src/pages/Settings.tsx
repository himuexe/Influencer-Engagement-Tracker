import { User, Bell, Shield, Database } from 'lucide-react';

const settingsSections = [
  {
    id: 'profile',
    name: 'Profile Settings',
    icon: User,
    description: 'Manage your account information and preferences',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    description: 'Configure how you receive alerts and updates',
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield,
    description: 'Manage your security preferences and API keys',
  },
  {
    id: 'data',
    name: 'Data Management',
    icon: Database,
    description: 'Configure data synchronization and storage settings',
  },
];

export function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className="flex cursor-pointer items-start gap-4 rounded-xl border bg-card p-6 shadow-sm transition-colors hover:bg-accent"
            >
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-semibold">{section.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Connected Platforms</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your social media platform connections
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#E1306C]" />
              <div>
                <p className="font-medium">Instagram</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
            <button className="text-sm text-destructive hover:text-destructive/80">
              Disconnect
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#FF0000]" />
              <div>
                <p className="font-medium">YouTube</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
            <button className="text-sm text-destructive hover:text-destructive/80">
              Disconnect
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#000000]" />
              <div>
                <p className="font-medium">TikTok</p>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <button className="text-sm text-primary hover:text-primary/80">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}