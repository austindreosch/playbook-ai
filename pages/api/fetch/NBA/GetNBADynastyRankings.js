import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db('playbook');

  const rankingsDoc = await db.collection('rankings').findOne({ name: 'NBADynastyRankings' });
  const playerDoc = await db.collection('stats').findOne({ league: 'nba' });

  const allPlayers = playerDoc?.stats || [];
  const rankings = rankingsDoc?.rankings || [];

  const enrichedRankings = rankings.map(r => {
    const player = allPlayers.find(p => p.info?.id === r.playerId);

    return {
      ...r,
      position: player?.info?.pos || '—',
      team: player?.info?.team || '—',
      stats: player?.stats || {},
    };
  });

  res.status(200).json({ rankings: enrichedRankings });
}
