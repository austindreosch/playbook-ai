import { MongoClient } from 'mongodb';

// Access the MONGODB_URI from the environment variables
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const handler = async (req, res) => {
  try {
    await client.connect();

    const db = client.db('playbook'); // Replace with your DB name
    const leaguesCollection = db.collection('leagues'); // Replace with your collection name

    if (req.method === 'GET') {
      const leagues = await leaguesCollection.find({}).toArray();
      res.status(200).json(leagues);
    } else if (req.method === 'POST') {
      const league = req.body;
      const result = await leaguesCollection.insertOne(league);

      console.log('Full insert result:', JSON.stringify(result));

      if (result && result.insertedCount === 1) {
        res.status(201).json(result.ops[0]);
        // console.log('THE LEAGUE IS BEING SAVED TO DB', result.ops[0]);

        console.log('Full insert result:', JSON.stringify(result));
      } else {
        console.log('Full insert result:', JSON.stringify(result));
        res.status(500).json({ success: false, message: 'Insertion failed' });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error); // Log the error to get more insights
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};

export default handler;
