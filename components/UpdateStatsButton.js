import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react';


function UpdateStatsButton() {
  const { user } = useUser();
  const adminSub = process.env.NEXT_PUBLIC_AUTH0_ADMIN_ID;
  const isAdmin = user && user.sub === adminSub;

  const handleUpdateClick = async () => {
    try {
      const response = await fetch('/api/fetch/nba', { method: 'GET' });

      const json = await response.json();
      console.log('Response Status:', response.status);
      console.log('📦 Response:', json);
      console.dir(json, { depth: null });

      if (response.ok) {
        alert('Database successfully updated with fresh NBA stats!');
      } else {
        alert('An error occurred while updating the database. On Button');
      }
    } catch (error) {
        console.error('Failed to update the database:', error.message, error);
        alert('Failed to update the database. Please try again later.');
     }
  };

  // Only render the button if the user is authenticated and has the admin role
  return isAdmin ? (
  <div className='inline-block flex items-center ml-0.5'>
    <button onClick={handleUpdateClick} className="inline-flex items-center gap-1.5 rounded-lg border border-primary-500 bg-myblue px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
          <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
        </svg>
        Update Stats
      </button>
  </div>
  ) : null;
}

export default UpdateStatsButton;

