import mongoose, { Schema } from 'mongoose';

const playerSchema = new Schema({
    provider: String,
    leagueId: String,
    name: String, 
    position: String,
    team: String,
    rotowireId: Number
});

const teamSchema = new Schema({
    teamId: String,
    teamName: String,
    players: [playerSchema]
});

const leagueInfoSchema = new Schema({
    activeRosterSize: Number,
    totalRosterSize: Number,
    positionArray: [String]
});

const leagueSchema = new Schema({
    userAuthId: String,
    leagueId: String,
    userTeamId: String,
    leagueName: String,
    leagueInfo: leagueInfoSchema,
    teams: [teamSchema]
});
  
const League = mongoose.model('League', leagueSchema);


export default mongoose.models.League || mongoose.model('League', leagueSchema);
