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
import { MongoClient } from 'mongodb';

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

    // Extract the necessary data from the API responses
    const rostersData = rostersResponse.data;
    const playerDataMap = playerDataResponse.data;

    // Prepare an object to store the processed data
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

    // Output the processed data to the console for debugging or verification purposes
    console.log(processedData);

    // Return the processed data
    return processedData;

  } catch (error) {
    // Log any errors that occur during the data retrieval or processing
    console.error("Error fetching and processing league data:", error);
    // Return null to indicate that an error occurred
    return null;
  }
}




// THINK ABOUT THIS LATER

// export const getTeamsWithPlayers = async (leagueId) => {
//   const retrieveRostersURL = `https://www.fantrax.com/fxea/general/getTeamRosters?leagueId=${leagueId}`;
//   const playerDataURL = "https://www.fantrax.com/fxea/general/getPlayerIds?sport=NBA";

//   try {
//     // Check if the data is available in the database for the specified leagueId
//     const cachedData = await fetchFromDatabase(leagueId);

//     if (cachedData) {
//       // If data is available in the database, return it directly
//       return cachedData;
//     } else {
//       // If data is not available in the database, fetch it from the APIs
//       const [rostersResponse, playerDataResponse] = await Promise.all([
//         axios.get(retrieveRostersURL),
//         axios.get(playerDataURL)
//       ]);

//       // Process the data and save it to the database
//       const rostersData = rostersResponse.data;
//       const playerDataMap = playerDataResponse.data;
//       const processedData = {}; // Processed data structure as before

//       // ... Synthesize the data and store it in processedData ...

//       // Save the synthesized data to the database
//       await saveToDatabase(leagueId, processedData);

//       // Return the processed data
//       return processedData;
//     }

//   } catch (error) {
//     console.error("Error fetching and processing league data:", error);
//     return null;
//   }
// };




// // Function to fetch cached data from the database
// const fetchFromDatabase = async (leagueId) => {
//   try {
//     // Initialize your database connection and retrieve the data for the given leagueId
//     const client = new MongoClient(MONGODB_CONNECTION_STRING, { useNewUrlParser: true });
//     await client.connect();
//     const db = client.db(DATABASE_NAME);
//     const collection = db.collection('leagueData');

//     // Query the database for the leagueId and return the data
//     const result = await collection.findOne({ leagueId: leagueId });
//     client.close();

//     return result;
//   } catch (error) {
//     console.error("Error fetching cached data from the database:", error);
//     return null;
//   }
// };

// // Function to save data to the database
// const saveToDatabase = async (leagueId, data) => {
//   try {
//     // Initialize your database connection and save the data for the given leagueId
//     const client = new MongoClient(MONGODB_CONNECTION_STRING, { useNewUrlParser: true });
//     await client.connect();
//     const db = client.db(DATABASE_NAME);
//     const collection = db.collection('leagueData');

//     // Upsert the data into the database using the leagueId as the identifier
//     await collection.updateOne({ leagueId: leagueId }, { $set: data }, { upsert: true });
//     client.close();
//   } catch (error) {
//     console.error("Error saving data to the database:", error);
//   }
// };