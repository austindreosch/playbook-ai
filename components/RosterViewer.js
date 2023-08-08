import React, { useEffect, useState } from 'react';
import { getTeamsWithPlayers } from '../utilities/fantraxAPI';

const RosterViewer = ({ leagueId }) => {
  const [teamsData, setTeamsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeamsWithPlayers(leagueId);
      setTeamsData(data);
    };

    fetchData();
  }, [leagueId]);

  return (
    <div className="rosterViewer">
      {teamsData ? (
        Object.keys(teamsData).map((teamId) => (
          <div key={teamId} className="teamData">
            <b>{teamsData[teamId].teamName}</b>
            <ul>
              {Object.keys(teamsData[teamId].players).map((playerId) => (
                <li key={playerId}>
                  {teamsData[teamId].players[playerId]}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RosterViewer;
