'use client'

// RosterBlock.js
import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useCallback, useEffect, useState } from 'react';
import RosterBlockPlayerRow from './RosterBlockPlayerRow';

// import { calculateScore } from '../utilities/calculateScore';

function RosterBlock() {
    const { user, isLoading } = useUser();
    const [leaguesData, setLeaguesData] = useState([]);
    const [selectedLeagueIndex, setSelectedLeagueIndex] = useState(0); // Defaults to the first league

    useEffect(() => {
      const fetchLeaguesData = async () => {
        if (!user) return;

        try {
          const response = await fetch(`/api/load/leagues?userAuthId=${user.sub}&sport=NBA`);
          if (response.ok) {
            const leagues = await response.json();
            setLeaguesData(leagues);
          } else {
            console.error('Failed to fetch leagues data');
          }
        } catch (error) {
          console.error('Error fetching leagues data:', error);
        }
      };

      fetchLeaguesData();
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your roster.</div>;
    }

    const selectedLeague = leaguesData[selectedLeagueIndex];
    const selectedTeam = selectedLeague ? selectedLeague.teams.find(team => team.teamId === selectedLeague.userTeamId) : null;
    

    if (!selectedLeague) {
        return <div>Loading...</div>; // or any other appropriate placeholder
    }

    console.log('SELECTED LEAGUE', selectedLeague);


    
    return (
        <div className="bg-white rounded-md shadow-md overflow-y-scroll hide-scrollbar p-4 my-2 mx-1 h-full">
            {/* Component Header */}
            <div className='flex items-center'> 
                <h2 className="text-2xl leading-9 font-bold text-gray-900 mb-4">{selectedTeam.teamName}</h2>
                <h4 className='ml-3 mt-3 text-sm'>
                {selectedLeague.leagueScoring} • {selectedLeague.leagueSport} • {selectedLeague.leagueFormat} • {selectedLeague.teams.length} Team  • {selectedLeague.leagueProvider}
                <select
                    id="team-selector"
                    value={selectedLeagueIndex}
                    onChange={(e) => setSelectedLeagueIndex(e.target.value)}
                    className="ml-3 border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {leaguesData.map((league, index) => (
                    <option key={index} value={index}>
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
                
            {selectedTeam && selectedTeam.players
                .sort((a, b) => b.playbookScore - a.playbookScore)
                .map((player, playerIndex) => (
                    <RosterBlockPlayerRow key={playerIndex} player={player} index={playerIndex} />
            ))}

        </div>
    );
    
}

export default RosterBlock;
