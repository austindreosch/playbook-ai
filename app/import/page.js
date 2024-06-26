//  /import page

'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import ImportLeagueForm from '/components/ImportLeagueForm';

export default function LeaguePage() {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-center p-10">
      <ImportLeagueForm userId={user?.sub} />
    </div>
  );
}
