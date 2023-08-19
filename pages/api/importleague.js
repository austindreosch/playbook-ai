// pages/api/importleague

import League from '../../models/League';
import dbConnect from '../../utilities/dbConnect';

const handler = async (req, res) => {
  try {
    await dbConnect();

    if (req.method === 'GET') {
      const leagues = await League.find({});
      res.status(200).json(leagues);
    } else if (req.method === 'POST') {
      const league = new League(req.body);
      await league.save();
      res.status(201).json(league);
      console.log('THE LEAGUE IS BEING SAVED TO DB', league);
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error); // Log the error to get more insights
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export default handler;
