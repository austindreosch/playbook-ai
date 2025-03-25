import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db('playbook');

  const doc = await db.collection('stats').findOne({ league: 'nba' });

  res.status(200).json({
    players: doc?.stats || []
  });
}
