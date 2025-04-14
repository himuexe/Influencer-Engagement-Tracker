import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layout/RootLayout';
import { Overview } from '@/pages/Overview';
import { Influencers } from '@/pages/Influencers';
import { Campaigns } from '@/pages/Campaigns';
import { Analytics } from '@/pages/Analytics';
import { Settings } from '@/pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: 'influencers',
        element: <Influencers />,
      },
      {
        path: 'campaigns',
        element: <Campaigns />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);