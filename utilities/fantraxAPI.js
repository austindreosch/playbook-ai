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
  
  try {
    const rostersResponse = await axios.get(retrieveRostersURL);
    const rostersData = rostersResponse.data;

    const leagueData = {
      leagueId: leagueId,
      userTeamId: userTeamId,
      leagueName: leagueName,
      leagueInfo: {},
      teams: [],
      waiverPlayers: []
    };

    leagueData.waiverPlayers = await getWaivers(leagueId);
    leagueData.leagueInfo = await getLeagueInfo(leagueId);

    for (let teamId in rostersData) {
      const teamData = rostersData[teamId];
      const players = [];


      console.log(teamData.rosterInfo[0]);
      // If rosterItems contains player details directly:
      teamData.rosterItems.forEach(item => {
        players.push({
          fantraxId: item.fantraxId,
          name: item.name,
          position: item.position,
          team: item.team,
          rotowireId: item.rotowireId,
        });
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
      if (playerDataItem.team !== "(N/A)") {
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