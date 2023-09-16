const averages = {
    fgPct: 49.1,
    fg3PtMadePerGame: 1.63,
    ftPct: 80.0,
    ptsPerGame: 17.11,
    rebPerGame: 6.4,
    astPerGame: 3.97,
    stlPerGame: 0.96,
    blkPerGame: 0.64,
    toPerGame: 1.96
};

const weights = {
    fgPct: 1,
    fg3PtMadePerGame: 1,
    ftPct: 1,
    ptsPerGame: 1,
    rebPerGame: 1,
    astPerGame: 1,
    stlPerGame: 1,
    blkPerGame: 1,
    toPerGame: 0.5  // devalue turnovers
};

const stdDeviations = {
    fgPct: 5,
    fg3PtMadePerGame: 0.5,
    ftPct: 5,
    ptsPerGame: 5,
    rebPerGame: 2,
    astPerGame: 2,
    stlPerGame: 0.5,
    blkPerGame: 0.5,
    toPerGame: 1
};

function modifiedSigmoid(t) {
    return 100 / (1 + Math.exp(-0.2 * t));
}


export function calculateScore(player) {
    const stats = [
        { value: parseFloat(player.stats.fgPct), average: averages.fgPct, stdDev: stdDeviations.fgPct },
        { value: player.stats.fg3PtMadePerGame, average: averages.fg3PtMadePerGame, stdDev: stdDeviations.fg3PtMadePerGame },
        { value: parseFloat(player.stats.ftPct), average: averages.ftPct, stdDev: stdDeviations.ftPct },
        { value: player.stats.ptsPerGame, average: averages.ptsPerGame, stdDev: stdDeviations.ptsPerGame },
        { value: player.stats.rebPerGame, average: averages.rebPerGame, stdDev: stdDeviations.rebPerGame },
        { value: player.stats.astPerGame, average: averages.astPerGame, stdDev: stdDeviations.astPerGame },
        { value: player.stats.stlPerGame, average: averages.stlPerGame, stdDev: stdDeviations.stlPerGame },
        { value: player.stats.blkPerGame, average: averages.blkPerGame, stdDev: stdDeviations.blkPerGame },
        { value: player.stats.toPerGame, average: averages.toPerGame, stdDev: stdDeviations.toPerGame }
    ];

    const zScores = stats.map(stat => (stat.value - stat.average) / stat.stdDev);

    // Convert Z-scores to a scale
    const normalizedScores = zScores.map(z => 50 + (z * 10)); 

    const totalScore = normalizedScores.reduce((sum, score) => sum + score, 0);
    
    let averageScore = totalScore / normalizedScores.length;

    // Apply the modified sigmoid transformation to the score
    averageScore = modifiedSigmoid(averageScore - 50);  // Centering the averageScore

    return Math.round(averageScore);
}
