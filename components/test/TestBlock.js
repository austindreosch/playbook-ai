'use client'

import React, { useEffect, useState } from 'react';
import { getLeagueData } from 'utilities/fantraxAPI'; // Import your API functions

const TestBlock = () => {
  const [leagueData, setLeagueData] = useState(null);

  useEffect(() => {
    // Call your API function to fetch the league data
    const fetchData = async () => {
      const leagueId = "4fzl7g0gljax6594"; // Replace with your actual league ID
      const userTeamId = "u6v64wyeljax65ae"; // Replace with your actual user team ID
      const leagueName = "Franchise Mode"; // Replace with your actual league name

      const data = await getLeagueData(leagueId, userTeamId, leagueName);
      setLeagueData(data);
    };

    fetchData();
  }, []);

  if (!leagueData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      {/* Display the league data */}
      <h1>League Data</h1>
      <p>League ID: {leagueData.leagueId}</p>
      <p>User Team ID: {leagueData.userTeamId}</p>
      <p>League Name: {leagueData.leagueName}</p>

      {/* Display teams and their players */}
      <h2>Teams and Players</h2>
      {leagueData.teams.map((team) => (
        <div key={team.teamId}>
          <b>{team.teamName}</b>
          <ul>
            {team.players.map((player) => (
              <li key={player.fantraxId}>
                {player.name} - {player.position} - {player.team}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Display waiver players */}
      <b>Waiver Players</b>
      <ul>
        {leagueData.waiverPlayers.map((player) => (
          <li key={player.fantraxId}>
            {player.name} - {player.position} - {player.team}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestBlock;
