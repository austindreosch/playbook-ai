// utils/fantraxAPI.js
import axios from 'axios';

export const getTeamsWithPlayerIds = async (leagueId) => {
  const retrieveRostersURL = `https://www.fantrax.com/fxea/general/getTeamRosters?leagueId=${leagueId}`;
  
  try {
    const response = await axios.get(retrieveRostersURL);
    const dataFromApi = response.data;
    
    const processedData = {};
    
    for (let teamId in dataFromApi) {
      const teamData = dataFromApi[teamId];
      const playerIds = teamData.rosterItems.map(item => item.id);
      
      processedData[teamId] = {
        teamName: teamData.teamName,
        playerIds: playerIds
      };
    }
    console.log(processedData);
    return processedData;
    
  } catch (error) {
    console.error("Error fetching and processing league data:", error);
    return null;
  }
}

