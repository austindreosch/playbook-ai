import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;

// Function to connect to the MongoDB database
async function connectToDatabase() {
  const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db('playbook');
}

// Function to fetch player stats based on player names
async function fetchPlayerStats(db, playerNames) {
    // Construct an array to hold all the statistics for the requested players
    const allPlayerStats = [];

    for (let playerName of playerNames) {
        // Query the 'stats' collection to fetch player stats
        const playerStat = await db.collection('stats')
            .findOne({
                league: 'nba',
                'stats.info.fullName': playerName
            }, {
                projection: { 'stats.$': 1 }
            });

        if (playerStat && playerStat.stats && playerStat.stats.length > 0) {
            allPlayerStats.push(playerStat.stats[0]);
        }
    }
    // console.log("allPlayerStats: 0", allPlayerStats[0]);
    return allPlayerStats;
}

function getDefaultPlayerStats(playerName) {
    return {
        info: {
            id: null,
            firstName: "Unknown",
            lastName: "Player",
            fullName: playerName,
            age: null,
            height: "N/A",
            weight: null,
            team: "N/A",
            teamId: null,
            img: null,
            pos: "N/A",
            injStatus: null
        },
        stats: {
            gamesPlayed: 0,
            fgPct: 0,
            ptsPerGame: 0,
            fgaPerGame: 0,
            fgmPerGame: 0,
            ftPct: 0,
            rebPerGame: 0,
            astPerGame: 0,
            ftaPerGame: 0,
            stlPerGame: 0,
            ftmPerGame: 0,
            blkPerGame: 0,
            fg2PtPct: 0,
            fg3PtMadePerGame: 0,
            toPerGame: 0,
            threePtPct: 0,
            offRebPerGame: 0,
            defRebPerGame: 0,
            efgPct: 0,
            tsPct: 0
        }
    };
}







// API endpoint handler
export default async function handler(req, res) {
    console.log("api/load/leagues endpoint called.");

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  // Extract userAuthId and sport from query parameters
  const { userAuthId, sport } = req.query;
//   console.log("userAuthId:", userAuthId);
//   console.log("sport:", sport);

  // Check if userAuthId is provided
  if (!userAuthId) {
    return res.status(400).json({ error: 'userAuthId is required.' });
  }

  try {
    const db = await connectToDatabase();

    // Fetch user's leagues for the given sport
    const leagues = await db.collection("leagues").find({ userAuthId: userAuthId, leagueSport: sport }).toArray();
    // console.log("league 0 (in load/leagues) BEFORE LOOP:", leagues[0].teams[0].players[0]);

    // If no leagues are found, return a 404 error
    if (!leagues.length) {
        console.log("No leagues found for the given userAuthId and sport.");
      return res.status(404).json({ error: 'No leagues found for the given userAuthId and sport.' });
    }

    // Enrich leagues with player stats
    for (const league of leagues) {
        // Find the single team that belongs to the current user in the league
        const myTeam = league.teams.find(team => team.teamId === league.userTeamId);
        console.log("**LOADING LEAGUE**:", league.leagueName);
      
        if (myTeam) {
            // Extract player names from the user's team
            const playerNames = myTeam.players.map(player => player.name);
    
            // Fetch the stats for these players from the database
            const playerStats = await fetchPlayerStats(db, playerNames);
            // console.log("playerStats:", playerStats);
    
            // Assign the fetched stats to the respective players
            for (const player of myTeam.players) {
                const specificPlayerStats = playerStats.find(s => s.info.fullName === player.name);
            
                if (specificPlayerStats) {
                    player.info = specificPlayerStats.info;
                    player.stats = specificPlayerStats.stats;
                    console.log(`Found stats for: ${player.name}`);
                } else {
                    const defaultStats = getDefaultPlayerStats(player.name);
                    player.info = defaultStats.info;
                    player.stats = defaultStats.stats;
                    console.log(`No stats found for: ${player.name}. Using default stats.`);
                }
            }
            
            // console.log("league 0 (in load/leagues) AFTER LOOP:", leagues[0].teams[0].players[0]);
    
        }
      }
      

    // Return enriched leagues with player stats
    // console.log("API LOAD leagues:", leagues[0].teams[0].players);
    return res.status(200).json(leagues);

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: 'Failed to fetch leagues and player stats.' });
  }
}
