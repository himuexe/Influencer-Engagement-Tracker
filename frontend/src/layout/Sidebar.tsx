import { Link } from 'react-router-dom';
import { BarChart3, Users, Calendar, Settings, Home } from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/', icon: Home },
  { name: 'Influencers', href: '/influencers', icon: Users },
  { name: 'Campaigns', href: '/campaigns', icon: Calendar },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col border-r bg-background lg:flex">
      <div className="flex h-14 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-x-2">
          <span className="text-xl font-semibold">Influencer Tracker</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}