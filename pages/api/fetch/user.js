// /api/fetch/user.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Replace with your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  try {
    await client.connect();
    const database = client.db('playbook'); // Replace with your database name
    const leaguesCollection = database.collection('leagues'); // Replace with your collection name

    const userAuthId = req.query.userAuthId; // Extract the userAuthId from the query parameters

    // Customize this query to find leagues by the user's Auth0 ID, assuming the leagues contain a field with this ID
    const userLeagues = await leaguesCollection.find({ userAuthId: userAuthId }).toArray();

    res.status(200).json(userLeagues);
  } catch (error) {
    console.error('Failed to fetch user leagues', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  } finally {
    await client.close();
  }
}
