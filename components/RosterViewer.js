import React, { useEffect, useState } from 'react';
import { getTeamsWithPlayerIds } from '../utilities/fantraxAPI';

const RosterViewer = ({ leagueId }) => {
  const [teamsData, setTeamsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeamsWithPlayerIds(leagueId);
      setTeamsData(data);
    };

    fetchData();
  }, [leagueId]);

  return (
    <div className="rosterViewer">
      {teamsData ? (
        Object.keys(teamsData).map((teamId) => (
          <div key={teamId} className="teamData">
            <h2>{teamsData[teamId].teamName}</h2>
            <ul>
              {teamsData[teamId].playerIds.map((playerId) => (
                <li key={playerId}>{playerId}</li>
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
