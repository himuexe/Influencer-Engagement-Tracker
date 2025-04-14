import { Bell, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-[150px] rounded-md border border-input bg-background px-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[250px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <button className="relative hover:opacity-80">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">3</span>
          </button>
          <button className="flex items-center gap-x-2 hover:opacity-80">
            <User className="h-5 w-5" />
            <span className="hidden text-sm font-medium sm:block">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}