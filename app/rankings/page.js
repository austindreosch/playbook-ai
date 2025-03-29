'use client';

import PlayerRow from '@/components/PlayerRow/PlayerRow';
import StatTableHeader from '@/components/PlayerRow/StatTableHeader';
import React, { useEffect, useState } from 'react';

export default function RankingsPage() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {1
    async function fetchRankings() {
      const res = await fetch('/api/fetch/NBA/GetNBADynastyRankings');
      const json = await res.json();
      setRankings(json.rankings || []);
    }

    fetchRankings();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Fantasy 9-Cat Rankings</h2>

      {/* <StatTableHeader />
      <PlayerRow/> */}

      
      {/* {rankings.map((player, index) => (
        <PlayerRow
          key={index}
          index={index}
          player={player}
        />
      ))} */}

    </div>
  );
}
