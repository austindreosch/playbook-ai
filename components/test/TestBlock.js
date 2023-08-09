'use client'

import React, { useEffect, useState } from 'react';
import { getLeagueData } from 'utilities/fantraxAPI'; // Import your API functions

const TestBlock = () => {
  const [leagueData, setLeagueData] = useState(null);
  const [userTeam, setUserTeam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const leagueId = "4fzl7g0gljax6594"; 
      const userTeamId = "u6v64wyeljax65ae"; 
      const leagueName = "Franchise Mode"; 

      const data = await getLeagueData(leagueId, userTeamId, leagueName);
      setLeagueData(data);

      // Find and set the user team
      const foundUserTeam = data.teams.find(team => team.teamId === userTeamId);
      setUserTeam(foundUserTeam);
    };

    fetchData();
  }, []);

  if (!userTeam) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      {/* Display the league data */}
      <h1>{leagueData.leagueName}</h1>
      <p>League ID: {leagueData.leagueId}</p>
      <p>Your Team ID: {leagueData.userTeamId}</p>

      {/* Display your team's players */}
      <b>{userTeam.teamName}</b>
      <ul>
        {userTeam.players.map((player) => (
          <li key={player.fantraxId}>
            {player.name} - {player.position} - {player.team} ({player.fantraxId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestBlock;
