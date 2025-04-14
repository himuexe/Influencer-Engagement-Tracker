
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check user's theme preference and set initial class
const setInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }
};

// Set initial theme before rendering
setInitialTheme();

createRoot(document.getElementById("root")!).render(<App />);
