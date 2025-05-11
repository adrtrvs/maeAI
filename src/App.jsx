
import React from 'react';
import HomePage from '@/pages/HomePage';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex flex-col items-center justify-center p-4">
        <HomePage />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
  