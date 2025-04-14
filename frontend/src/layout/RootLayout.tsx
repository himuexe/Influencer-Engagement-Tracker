import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col lg:pl-72">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}