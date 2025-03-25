import React from 'react';

const PlayerRow = ({ rank, name, position, team }) => (
    <div className="grid grid-cols-4 gap-4 p-4 border-b text-sm md:text-base">
        <div>{rank}</div>
        <div>{name}</div>
        <div>{position}</div>
        <div>{team}</div>
    </div>
);

export default function RankingsPage() {
    const rankings = [
        { rank: 1, name: 'Christian McCaffrey', position: 'RB', team: 'SF' },
        { rank: 2, name: 'Justin Jefferson', position: 'WR', team: 'MIN' },
        { rank: 3, name: 'Ja’Marr Chase', position: 'WR', team: 'CIN' },
        { rank: 4, name: 'Patrick Mahomes', position: 'QB', team: 'KC' },
        { rank: 5, name: 'Bijan Robinson', position: 'RB', team: 'ATL' },
        // add more players...
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Fantasy Rankings</h2>

            <div className="grid grid-cols-4 gap-4 font-semibold border-b pb-2 mb-2 text-sm md:text-base">
                <div>Rank</div>
                <div>Player</div>
                <div>Pos</div>
                <div>Team</div>
            </div>

            {rankings.map((player) => (
                <PlayerRow key={player.rank} {...player} />
            ))}
        </div>
    );
}
