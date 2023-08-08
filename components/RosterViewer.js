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
              {Object.values(teamsData[teamId].players).map((player) => (
                <li key={player.fantraxId}>
                  {player.name} • {player.position} • {player.team}
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



// {
//     "team001": {
//       "teamName": "Golden State Warriors",
//       "players": {
//         "03xmv": {
//           "name": "Stephen Curry",
//           "position": "PG",
//           "team"    : "GSW",
//           "fantraxId": "03xmv",
//           "statsIncId": 1035,
//           "rotowireId": 3035,
//         },
//         "04xkv": {
//             "name": "Draymond Green",
//             "position": "PF",
//             "team"    : "GSW",
//             "fantraxId": "04xkv",
//             "statsIncId": 1036,
//             "rotowireId": 3036,
//         },
//       }
//     },
// }