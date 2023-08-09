/**
 * Retrieves comprehensive league data for a given league from the Fantrax API.
 *
 * @param {string} leagueId - The unique identifier of the individual league.
 * @returns {Promise<Object|null>} A Promise that resolves to an object containing the processed league data, structured as follows:
 * 
 * {
 *   leagueId: string,
 *   teamId: string,
 *   userTeamId: string,
 *   userTeamName: string,
 *   teams: [
 *     {
 *       teamId: string,
 *       teamName: string,
 *       players: [
 *         {
 *           fantraxId: string,
 *           name: string,
 *           position: string,
 *           team: string,
 *           rotowireId: number,
 *         }
 *       ]
 *     }
 *   ],
 *   waiverPlayers: [
 *     {
 *       fantraxId: string,
 *       name: string,
 *       position: string,
 *       team: string,
 *       rotowireId: number,
 *     }
 *   ]
 * }
 * 
 * The structure represents league information, including each team's players and a list of waiver players.
 * 
 * @throws {Error} If there is an error during the data retrieval or processing.
 */

import axios from 'axios';

export const getLeagueData = async (leagueId, userTeamId, leagueName) => {
  const retrieveRostersURL = `https://www.fantrax.com/fxea/general/getTeamRosters?leagueId=${leagueId}`;
  const playerDataURL = "https://www.fantrax.com/fxea/general/getPlayerIds?sport=NBA";
  
  try {
    const [rostersResponse, playerDataResponse] = await Promise.all([
      axios.get(retrieveRostersURL),
      axios.get(playerDataURL)
    ]);

    const rostersData = rostersResponse.data;
    const playerDataMap = playerDataResponse.data;

    const leagueData = {
      leagueId: leagueId,
      userTeamId: userTeamId,
      leagueName: leagueName,
      leagueInfo: {},
      teams: [],
      waiverPlayers: []
    };
    
    leagueData.waiverPlayers = await getWaivers(leagueId); //array with unrostered players
    leagueData.leagueInfo = await getLeagueInfo(leagueId); //object with roster size, active roster size, scoring system etc

    for (let teamId in rostersData) {
      const teamData = rostersData[teamId];
      const players = [];


      // If rosterItems contains player details directly:
      teamData.rosterItems.forEach(item => {
        const playerData = playerDataMap[item.id];
        if (playerData) {
          const cleanedName = playerData.name.split(', ').reverse().join(' ');
          // Create a simplified player object and add it to the players array
          players.push({
            fantraxId: playerData.fantraxId,
            name: cleanedName,
            position: playerData.position,
            team: playerData.team,
            statsIncId: playerData.statsIncId,
            rotowireId: playerData.rotowireId,
          });
        }
      });

      leagueData.teams.push({
        teamId: teamId,
        teamName: teamData.teamName,
        players: players
      });
    }

    console.log(leagueData);
    return leagueData;

  } catch (error) {
    console.error("Error fetching and processing league data:", error);
    throw error;
  }
}





// get all players then sort out inactive players, for a waiver list
export const getWaivers = async (leagueId) => {
  const playerDataURL = "https://www.fantrax.com/fxea/general/getPlayerIds?sport=NBA";
  
  try {
    const playerDataResponse = await axios.get(playerDataURL);
    const playerDataMap = playerDataResponse.data;

    const waiverPlayers = [];

    for (let playerId in playerDataMap) {
      const playerDataItem = playerDataMap[playerId]; // Change variable name to avoid conflict
      if (playerDataItem.team !== "(N/A)" && playerDataItem.team !== "Tm") {
        waiverPlayers.push({
          fantraxId: playerDataItem.fantraxId,
          name: playerDataItem.name,
          position: playerDataItem.position,
          team: playerDataItem.team,
          rotowireId: playerDataItem.rotowireId,
        });
      }
    }

    return waiverPlayers;

  } catch (error) {
    console.error("Error fetching waiver player data:", error);
    return null;
  }
}



// get roster size and active roster size, scoring system, and later on get matchups etc
export const getLeagueInfo = async (leagueId) => {
  const leagueInfoUrl = `https://www.fantrax.com/fxea/general/getLeagueInfo?leagueId=${leagueId}`
  
  try {
    const leagueInfoResponse = await axios.get(leagueInfoUrl);
    const leagueInfoData = leagueInfoResponse.data;

    // console.log(leagueInfoData);
    const positionConstraints = leagueInfoData.rosterInfo.positionConstraints;
    const positionArray = generatePositionArray(positionConstraints);

    const leagueInfo = {
      activeRosterSize: leagueInfoData.rosterInfo.maxTotalActivePlayers,
      totalRosterSize: leagueInfoData.rosterInfo.maxTotalPlayers,
      positionArray: positionArray
    };

    return leagueInfo;

  } catch (error) {
    console.error("Error fetching waiver player data:", error);
    return null;
  }
}


// helper function to generate position array for getLeagueInfo
const generatePositionArray = (positionConstraints) => {
  const positionArray = [];
  
  for (const position in positionConstraints) {
    const maxActive = positionConstraints[position].maxActive;
    
    for (let i = 0; i < maxActive; i++) {
      positionArray.push(position);
    }
  }
  
  return positionArray;
};