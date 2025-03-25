import fs from 'fs/promises';
import Papa from 'papaparse';
import path from 'path';


async function getNBADynastyRankings() {
    const filePath = path.join(process.cwd(), 'public', 'docs', 'nba_dynasty_rankings_cat.csv');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const parsed = Papa.parse(fileContents, { header: true });
    return parsed.data;
}



// grab the stat