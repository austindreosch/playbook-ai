import mongoose, { Schema } from 'mongoose';

const playerSchema = new Schema({
    providerId: String,
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
    uniqueLeagueId: String,
    userAuthId: String,
    userTeamId: String,
    providerLeagueId: String,
    leagueProvider: String,
    leagueName: String,
    leagueSport: String,
    leagueFormat: String,
    leagueScoring: String,
    leagueInfo: leagueInfoSchema,
    teams: [teamSchema]
  });

  console.log(mongoose.models);
  const League = mongoose.model('League', leagueSchema);


  export default League;