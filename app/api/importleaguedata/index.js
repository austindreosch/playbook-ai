import { getLeagueDataForImport } from '../../utilities/path-to-your-utility-file';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { leagueId, leagueName, provider } = req.body;

  if (!leagueId || !leagueName || !provider) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const leagueData = await getLeagueDataForImport(leagueId, leagueName, provider);
    return res.status(200).json(leagueData);
  } catch (error) {
    console.error("Error in /api/import/leaguedata:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
