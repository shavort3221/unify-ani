
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

// Replace with your actual publishable key
// Accept either VITE_CLERK_PUBLISHABLE_KEY or NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                         import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 
                         "pk_test_aW50ZW5zZS1qYXktNzIuY2xlcmsuYWNjb3VudHMuZGV2JA";

// Create a simple component to show when no valid key is provided
const InvalidKeyNotice = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-50 to-sky-100 dark:from-slate-900 dark:to-slate-800">
    <div className="max-w-md w-full p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-sky-100 dark:border-slate-700">
      <h1 className="text-2xl font-bold text-center mb-4">Authentication Setup Required</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        To use the authentication features, you need to set up a valid Clerk publishable key.
      </p>
      <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 p-4 rounded-md text-amber-800 dark:text-amber-200 text-sm mb-4">
        <strong>Developer Note:</strong> Please set the <code className="bg-amber-100 dark:bg-amber-800 px-1 py-0.5 rounded">VITE_CLERK_PUBLISHABLE_KEY</code> environment variable.
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        You can get your key from the <a href="https://dashboard.clerk.com/last-active?path=api-keys" className="text-sky-500 hover:text-sky-600 underline" target="_blank" rel="noreferrer">Clerk Dashboard</a>.
      </p>
    </div>
  </div>
);

// Determine if we have a valid key
const isValidKey = PUBLISHABLE_KEY && !PUBLISHABLE_KEY.includes('placeholder') && PUBLISHABLE_KEY.startsWith('pk_');

// Create the root element
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");
const root = createRoot(rootElement);

// Render the app with or without Clerk provider based on key validity
if (isValidKey) {
  root.render(
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <App />
    </ClerkProvider>
  );
} else {
  // Render the notice if no valid key is provided
  root.render(<InvalidKeyNotice />);
  console.warn("Missing valid Clerk Publishable Key - authentication features will not work");
}
