'use client'

// RosterBlock.js
import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useCallback, useEffect, useState } from 'react';
import RosterBlockPlayerRow from './RosterBlockPlayerRow';

function RosterBlock() {
  const { user } = useUser();
  
  const [leagues, setLeagues] = useState([]);
  const [selectedProviderTeamId, setSelectedProviderTeamId] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);

  const fetchPlayerStats = async (playerName) => {
    const response = await fetch(`/api/fetch/playerStats?playerName=${playerName}`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch player stats');
    }
  };

  useEffect(() => {
    if (selectedProviderTeamId) {
      const selectedLeague = leagues.find(league => league.userTeamId === selectedProviderTeamId);
      const playersInSelectedTeam = selectedLeague.teams[0].players;

      Promise.all(playersInSelectedTeam.map(player => fetchPlayerStats(player.name)))
        .then(stats => setPlayerStats(stats))
        .catch(error => console.error('Error fetching player stats:', error));
    }
  }, [selectedProviderTeamId, leagues]);




  if (!user) {
    return <div>Please login to view your rosters.</div>;
  }

    console.log('PLAYER STATS FOR BLOCK',playerStats);
    
    return (
        <div className="bg-white rounded-md shadow-md overflow-y-scroll hide-scrollbar p-4 my-2 mx-1 h-full">
            {/* Component Header */}
            <div className='flex items-center'> 
                <h2 className="text-2xl leading-9 font-bold text-gray-900 mb-4">My Roster</h2>
                <h4 className='ml-3 mt-3 text-sm'>
                    Team Name • NBA • Dynasty • 12 Team 
                    <select
                        id="team-selector"
                        value={selectedProviderTeamId}
                        onChange={(e) => setSelectedProviderTeamId(e.target.value)}
                        className="ml-3 border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {leagues.map((league) => (
                            <option key={league.userTeamId} value={league.userTeamId}>
                                {league.leagueName}
                            </option>
                        ))}
                    </select>
                </h4>
            </div>
    
            {/* Table Head */}
            <div className="bg-black text-white text-xs py-[3px] rounded-sm grid grid-cols-[3fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] mb-1 pr-1">
                <div className="col-span-3 font-bold pl-1 flex items-center justify-start">RANK</div>
                <div className="col-span-7 grid grid-cols-9 font-bold">
                    <span className="text-center p-1">FG%</span>
                    <span className="text-center p-1">3PM</span>
                    <span className="text-center p-1">FT%</span>
                    <span className="text-center p-1">PTS</span>
                    <span className="text-center p-1">REB</span>
                    <span className="text-center p-1">AST</span>
                    <span className="text-center p-1">ST</span>
                    <span className="text-center p-1">BLK</span>
                    <span className="text-center p-1">TO</span>
                </div>
            </div>
                
            {playerStats.map((player, index) => (
        <RosterBlockPlayerRow key={player.name} player={player} index={index} />
      ))}
        </div>
    );
    
}

export default RosterBlock;
