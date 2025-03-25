import fs from 'fs/promises';
import Papa from 'papaparse';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const docsDir = path.join(process.cwd(), 'public', 'docs');

    try {
        const files = await fs.readdir(docsDir);

        // Filter to valid CSVs only
        const validCsvs = files.filter(f =>
            f.endsWith('.csv') && !f.includes('Zone.Identifier') && !f.includes('msheld')
        );

        // For example, read the first valid one
        if (validCsvs.length === 0) {
            return res.status(404).json({ error: 'No valid CSVs found' });
        }

        const filePath = path.join(docsDir, validCsvs[0]);
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const parsed = Papa.parse(fileContents, { header: true });

        res.status(200).json({ file: validCsvs[0], rankings: parsed.data });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
