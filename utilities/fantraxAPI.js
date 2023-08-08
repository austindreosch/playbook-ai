// utils/fantraxAPI.js
import axios from 'axios';

const getPlayerNameMap = async () => {
  const url = "https://www.fantrax.com/fxea/general/getAdp?sport=NBA&order=ADP";
  try {
      const response = await axios.get(url);
      const players = response.data;

      const playerNameMap = {};

      players.forEach(player => {
          playerNameMap[player.id] = player.name;
      });

      return playerNameMap;

  } catch (error) {
      console.error("Error fetching players:", error);
      return null;
  }
}



export const getTeamsWithPlayers = async (leagueId) => {
  const retrieveRostersURL = `https://www.fantrax.com/fxea/general/getTeamRosters?leagueId=${leagueId}`;
  
  try {
    const playerNameMap = await getPlayerNameMap();

    const response = await axios.get(retrieveRostersURL);
    const dataFromApi = response.data;
    
    const processedData = {};
    
    for (let teamId in dataFromApi) {
      const teamData = dataFromApi[teamId];
      const players = {};

      teamData.rosterItems.forEach(item => {
        players[item.id] = playerNameMap[item.id]; // Using the hashmap to get player names by ID
      });

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
