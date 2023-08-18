// pages/api/importleague

import League from '../../../models/League';
import dbConnect from '../../../utilities/dbConnect';

const handler = async (req, res) => {
  await dbConnect();

  if (req.method === 'GET') {
    // Fetch all leagues
    try {
      const leagues = await League.find({});
      res.status(200).json(leagues);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === 'POST') {
    // Create a new league
    try {
      const league = new League(req.body);
      await league.save();
      res.status(201).json(league);
      console.log('THE LEAGUE IS BEING SAVED TO DB',league);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    // Handle other HTTP methods (e.g., PUT, DELETE)
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};

export default handler;
