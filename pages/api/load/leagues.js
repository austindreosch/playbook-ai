import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;

async function connectToDatabase() {
  const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db('playbook');
}

async function fetchPlayerStats(db, playerNames) {
  const stats = await db.collection('stats').find({ "info.fullName": { $in: playerNames }}).toArray();
  console.log("stats:", stats);
  return stats;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const { userAuthId, sport } = req.query;
  console.log("userAuthId:", userAuthId);
  console.log("sport:", sport);

  if (!userAuthId) {
    return res.status(400).json({ error: 'userAuthId is required.' });
  }

  try {
    const db = await connectToDatabase();

    // Fetch user's leagues for the given sport
    const leagues = await db.collection("leagues").find({ userAuthId: userAuthId, leagueSport: sport }).toArray();

    if (!leagues.length) {
      return res.status(404).json({ error: 'No leagues found for the given userAuthId and sport.' });
    }

    // Enrich leagues with player stats
    for (const league of leagues) {
      const myTeams = league.teams.filter(team => team.userAuthId === userAuthId);

      for (const team of myTeams) {
        const playerNames = team.players.map(player => player.name);
        const playerStats = await fetchPlayerStats(db, playerNames);
        
        // Assign player stats to each player in the team
        for (const player of team.players) {
          const specificPlayerStats = playerStats.find(s => s.info.fullName === player.name)?.playerStatsTotals?.find(
            stat => `${stat.player.firstName} ${stat.player.lastName}` === player.name
          );
          if (specificPlayerStats) {
            player.stats = specificPlayerStats.stats;
          }
        }
      }
    }

    // Return enriched leagues
    return res.status(200).json(leagues);

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: 'Failed to fetch leagues and player stats.' });
  }
}
