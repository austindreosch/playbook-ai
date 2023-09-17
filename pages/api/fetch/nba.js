// /api/fetch/nba.js
import Papa from 'papaparse';
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const client = new MongoClient(uri, options);

export default async function handler(req, res) {
    try {
        await client.connect();

        // 1. Fetch the NBA stats and process it.
        const apiKeyToken = process.env.NEXT_PUBLIC_MYSPORTSFEEDS_API_KEY; 
        const password = "MYSPORTSFEEDS";
        const credentials = Buffer.from(`${apiKeyToken}:${password}`).toString('base64');

        // const season = '2022-2023-regular';
        // const params = new URLSearchParams({
        //     'date': '20230821',
        //     'force': 'true',
        // });
        // const url = `https://api.mysportsfeeds.com/v2.1/pull/nba/${season}/player_stats_totals.json`;

        const url = `https://api.mysportsfeeds.com/v2.1/pull/nba/2022-2023-regular/player_stats_totals.json`

        const fetchOptions = {
          method: 'GET',
          headers: {
            "Authorization": `Basic ${credentials}`,
            'User-Agent': 'node ' + process.version
          }
        };

        const response = await fetch(url, fetchOptions);
        const data = await response.json();
        console.log('HERE IS THE DATA', data);
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
            minPerGame: parseFloat((playerStats.stats.miscellaneous.minSecondsPerGame / 60).toFixed(1)),
            },
            stats: {
            gamesPlayed: playerStats.stats.gamesPlayed,
            fgPct: playerStats.stats.fieldGoals.fgPct,
            ptsPerGame: playerStats.stats.offense.ptsPerGame,
            fgaPerGame: playerStats.stats.fieldGoals.fgAttPerGame,
            fgmPerGame: playerStats.stats.fieldGoals.fgMadePerGame,
            ftPct: playerStats.stats.freeThrows.ftPct,
            rebPerGame: playerStats.stats.rebounds.rebPerGame,
            astPerGame: playerStats.stats.offense.astPerGame,
            ftaPerGame: playerStats.stats.freeThrows.ftAttPerGame,
            stlPerGame: playerStats.stats.defense.stlPerGame,
            ftmPerGame: playerStats.stats.freeThrows.ftMadePerGame,
            blkPerGame: playerStats.stats.defense.blkPerGame,
            fg2PtPct: playerStats.stats.fieldGoals.fg2PtPct,
            toPerGame: playerStats.stats.defense.tovPerGame,
            threePtPct: playerStats.stats.fieldGoals.fg3PtPct,
            offRebPerGame: playerStats.stats.rebounds.offRebPerGame,
            defRebPerGame: playerStats.stats.rebounds.defRebPerGame,
            fg3PtMadePerGame: playerStats.stats.fieldGoals.fg3PtMadePerGame,
            efgPct: (playerStats.stats.fieldGoals.fgMade + 0.5 * playerStats.stats.fieldGoals.fg3PtMade) / playerStats.stats.fieldGoals.fgAtt,
            tsPct: (playerStats.stats.offense.pts) / (2 * (playerStats.stats.fieldGoals.fgAtt + 0.44 * playerStats.stats.freeThrows.ftAtt)) * 100,
            }
        }));


        // 2. Fetch and process the dynasty rankings and add them to the processed player stats.
        const dynastyResponse = await fetch('https://drive.google.com/uc?export=download&id=1rYRWEIX7sdHkcIQ2CfhhZc8TtnGqcx0z');
        const dynastyCsv = await dynastyResponse.text();

        const dynastyRankings = Papa.parse(dynastyCsv, {
            header: false,
            skipEmptyLines: true
        }).data;

        const rankingMap = new Map();
        dynastyRankings.forEach(([rank, name]) => {
            rankingMap.set(name, parseInt(rank, 10));
        });

        console.log("Players before adding dynasty rank:", players.map(p => p.info.fullName));

        const playersWithRanking = players.map(player => {
            const fullName = player.info.fullName;
            if (rankingMap.has(fullName)) {
                player.info.dynastyRank = rankingMap.get(fullName);
                console.log(`Matched player: ${fullName} with dynasty rank: ${player.info.dynastyRank}`);
            }
            return player;
        });

        console.log("Players after adding dynasty rank:", playersWithRanking.map(p => ({
            name: p.info.fullName,
            dynastyRank: p.info.dynastyRank
        })));

        // 3. Update the MongoDB database with the combined data.
        const playbookDB = client.db('playbook');
        const statsCollection = playbookDB.collection('stats');

        await statsCollection.updateOne(
            { league: 'nba' },
            { $set: { stats: playersWithRanking } },
            { upsert: true }
        );

        // 4. Send the response.
        res.status(200).json(data);

    } catch (error) {
        console.error('Error:', error.message, error.stack);
        res.status(500).json({ error: 'An error occurred' });
    } finally {
        if (client.topology.isConnected()) {
            await client.close();
        }
    }
}
