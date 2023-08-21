// /api/fetch/nba.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Update with your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  try {
    await client.connect();

    const apiKeyToken = process.env.NEXT_PUBLIC_MYSPORTSFEEDS_API_KEY;
    const password = "MYSPORTSFEEDS";
    const credentials = Buffer.from(`${apiKeyToken}:${password}`).toString('base64');

    const headers = {
      'Authorization': `Basic ${credentials}`,
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}`;

    const season = 'current';
    const params = new URLSearchParams({
        'date': formattedDate, // Current date in YYYYMMDD format
        'force': 'true', // Optional, defaults to true
    });
    const url = `https://api.mysportsfeeds.com/v2.1/pull/nba/${season}/player_stats_totals.json?${params}`;

    const response = await fetch(url, { method: 'GET', headers: headers });
    const data = await response.json();

    // Process the data as needed
    const players = data.playerStatsTotals.map((playerStats) => ({
        info: {
          id: playerStats.player.id,
          firstName: playerStats.player.firstName,
          lastName: playerStats.player.lastName,
          fullName: `${playerStats.player.firstName} ${playerStats.player.lastName}`,
          age: playerStats.player.age,
          height: playerStats.player.height,
          weight: playerStats.player.weight,
          team: playerStats.team.abbreviation,
          teamId: playerStats.team.id,
          img: playerStats.player.officialImageSrc,
          pos: playerStats.player.primaryPosition,
          injStatus: playerStats.player.currentInjury,
        },
        stats: {
          gamesPlayed: playerStats.gamesPlayed,
          fgPct: playerStats.fieldGoals.fgPct,
          ptsPerGame: playerStats.offense.ptsPerGame,
          fgaPerGame: playerStats.fieldGoals.fgAttPerGame,
          fgmPerGame: playerStats.fieldGoals.fgMadePerGame,
          ftPct: playerStats.freeThrows.ftPct,
          rebPerGame: playerStats.rebounds.rebPerGame,
          astPerGame: playerStats.offense.astPerGame,
          ftaPerGame: playerStats.freeThrows.ftAttPerGame,
          stlPerGame: playerStats.defense.stlPerGame,
          ftmPerGame: playerStats.freeThrows.ftMadePerGame,
          blkPerGame: playerStats.defense.blkPerGame,
          fg2PtPct: playerStats.fieldGoals.fg2PtPct,
          toPerGame: playerStats.defense.tovPerGame,
          threePtPct: playerStats.fieldGoals.fg3PtPct,
          offRebPerGame: playerStats.rebounds.offRebPerGame,
          defRebPerGame: playerStats.rebounds.defRebPerGame,
          efgPct: (playerStats.fieldGoals.fgMade + 0.5 * playerStats.fieldGoals.fg3PtMade) / playerStats.fieldGoals.fgAtt,
          tsPct: (playerStats.offense.pts) / (2 * (playerStats.fieldGoals.fgAtt + 0.44 * playerStats.freeThrows.ftAtt)) * 100,
        }
    }));

    // Get the playbook database and stats collection
    const playbookDB = client.db('playbook');
    const statsCollection = playbookDB.collection('stats');

    // Update the 'nba' entry with the new stats
    await statsCollection.updateOne(
      { league: 'nba' },
      { $set: { stats: players } },
      { upsert: true }
    );

    res.status(200).json(players);
  } catch (error) {
    console.error('Error fetching data:', error.message, error.stack);

    res.status(500).json({ error: 'An error occurred while fetching NBA data' });
  } finally {
    // Disconnect from the MongoDB client
    if (client.isConnected()) {
      await client.close();
    }
  }
}
