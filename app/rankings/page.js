'use client';

import React, { useEffect, useState } from 'react';

const PlayerRow = ({ rank, name, position, team, stats }) => (
  <div className="grid grid-cols-13 gap-2 p-2 border-b text-xs md:text-sm text-center">
    <div>{rank}</div>
    <div className="text-left">{name}</div>
    <div>{position}</div>
    <div>{team}</div>
    <div>{stats?.ptsPerGame?.toFixed(1) || '–'}</div>
    <div>{stats?.rebPerGame?.toFixed(1) || '–'}</div>
    <div>{stats?.astPerGame?.toFixed(1) || '–'}</div>
    <div>{stats?.stlPerGame?.toFixed(1) || '–'}</div>
    <div>{stats?.blkPerGame?.toFixed(1) || '–'}</div>
    <div>{stats?.fg3PtMadePerGame?.toFixed(1) || '–'}</div>
    <div>{stats?.toPerGame?.toFixed(1) || '–'}</div>
    <div>{stats?.fgPct?.toFixed(1) || '–'}</div>
    <div>{stats?.ftPct?.toFixed(1) || '–'}</div>
  </div>
);

export default function RankingsPage() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
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

      <div className="grid grid-cols-13 gap-2 font-semibold border-b pb-2 mb-2 text-xs md:text-sm text-center">
        <div>#</div>
        <div className="text-left">Player</div>
        <div>Pos</div>
        <div>Team</div>
        <div>PTS</div>
        <div>REB</div>
        <div>AST</div>
        <div>STL</div>
        <div>BLK</div>
        <div>3PM</div>
        <div>TO</div>
        <div>FG%</div>
        <div>FT%</div>
      </div>

      {rankings.map((player, i) => (
        <PlayerRow
          key={i}
          rank={player.rank}
          name={player.name}
          position={player.position}
          team={player.team}
          stats={player.stats}
        />
      ))}
    </div>
  );
}
