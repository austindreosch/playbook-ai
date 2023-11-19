// LeagueRosterBlock.js
import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import RosterBlockPlayerRow from './RosterBlockPlayerRow';

function RosterBlockLeague() {
    const { user, isLoading } = useUser();
    const [leaguesData, setLeaguesData] = useState([]);
    const [selectedLeagueIndex, setSelectedLeagueIndex] = useState(0);
    const [selectedTeamIndex, setSelectedTeamIndex] = useState(0); // State to track the selected team index

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
        return <div className='my-auto pt-32'>
            <ThreeCircles /* ... */ />
        </div>;
    }

    if (!user) {
        return <div>Please log in to view league rosters.</div>;
    }

    const selectedLeague = leaguesData[selectedLeagueIndex];
    const teams = selectedLeague ? selectedLeague.teams : [];
    const selectedTeam = teams[selectedTeamIndex]; // Using selected team index

    if (!selectedLeague) {
        return <div className='my-auto pt-32'>
            <ThreeCircles /* ... */ />
        </div>;
    }

    return (
        <div className="bg-white rounded-md shadow-md overflow-y-scroll hide-scrollbar p-4 mx-1 h-full">
            {/* League and Team Selectors */}
            <div className='flex flex-col sm:flex-row justify-between items-center mb-4'>
                {/* Existing League Selector Logic */}
                
                {/* Team Selection Dropdown */}
                <div>
                    <label htmlFor="team-selector" className="block text-sm font-medium text-gray-700">Select Team</label>
                    <select
                        id="team-selector"
                        value={selectedTeamIndex}
                        onChange={(e) => setSelectedTeamIndex(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {teams.map((team, index) => (
                            <option key={index} value={index}>
                                {team.teamName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Roster Display */}
            <div>
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

                {/* Player Rows */}
                {selectedTeam && selectedTeam.players && selectedTeam.players.length > 0
                    ? selectedTeam.players.map((player, playerIndex) => (
                        <RosterBlockPlayerRow key={playerIndex} player={player} index={playerIndex} />
                    ))
                    : <div>No players found for the selected team.</div>
                }

            </div>

            
        </div>
    );
}

export default RosterBlockLeague;
