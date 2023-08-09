/**
 * Retrieves teams and players data for a given league from Fantrax API.
 *
 * @param {string} leagueId - The unique identifier of the individual league.
 * @returns {Promise<Object>} A Promise that resolves to an object containing the processed data. Processed data structure:
 * 
 *                           { teamId: {
 *                               teamName: string,
 *                               players: [
 *                                 {
 *                                   fantraxId: string,
 *                                   name: string,
 *                                   position: string,
 *                                   team: string,
 *                                   statsIncId: number,
 *                                   rotowireId: number,
 *                                 },
 *                               ],
 *                             },
 *                            }
 * 
 * @throws {Error} If there is an error during the data retrieval or processing.
 */

import axios from 'axios';

// get all teams along with their players name and information
export const getTeamsWithPlayers = async (leagueId) => {
  const retrieveRostersURL = `https://www.fantrax.com/fxea/general/getTeamRosters?leagueId=${leagueId}`;
  const playerDataURL = "https://www.fantrax.com/fxea/general/getPlayerIds?sport=NBA";

  try {
    // Fetch both rosters and player data in parallel for improved efficiency
    const [rostersResponse, playerDataResponse] = await Promise.all([
      axios.get(retrieveRostersURL),
      axios.get(playerDataURL)
    ]);
    const rostersData = rostersResponse.data;
    const playerDataMap = playerDataResponse.data;

    const processedData = {};

    // Process data for each team and their respective players
    for (let teamId in rostersData) {
      const teamData = rostersData[teamId];
      const players = [];

      // Loop through each player in the team's roster
      teamData.rosterItems.forEach(item => {
        const playerData = playerDataMap[item.id];
        if (playerData) {
          // Create a simplified player object and add it to the players array
          players.push({
            fantraxId: playerData.fantraxId,
            name: playerData.name,
            position: playerData.position,
            team: playerData.team,
            statsIncId: playerData.statsIncId,
            rotowireId: playerData.rotowireId,
          });
        }
      });

      // Store the team data with its players in the processedData object
      processedData[teamId] = {
        teamName: teamData.teamName,
        players: players
      };
    }

    console.log(processedData);
    return processedData;

  } catch (error) {
    console.error("Error fetching and processing league data:", error);
    return null;
  }
}





// get all players in the league
export const getAllPlayers = async (leagueId) => {

}



{ leagueInfo: {
    leagueId: string,
    teams: [
      teamId1: {
        teamName: string,
        players: [
          {
            teamName: string,
            players: [
              {
                fantraxId: string,
                name: string,
                position: string,
                team: string,
                rotowireId: number,
              }
            ]
          }
        ]
      }
    ],
    waiverPlayers: [
      // enter each player that isnt on a roster, and doesnt have N/A for their NBA team
      {
        fantraxId: string,
        name: string,
        position: string,
        team: string,
        rotowireId: number,
      }
    ]
  }
}
  


  
//   teamId: {
//     teamName: string,
//     players: [
//       {
//         fantraxId: string,
//         name: string,
//         position: string,
//         team: string,
//         statsIncId: number,
//         rotowireId: number,
//       },
//     ],
//   },
// }