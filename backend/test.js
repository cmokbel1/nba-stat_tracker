const teams = require('./http/teams');
const players = require('./http/players');

// teams.getTeamsByConference("East").then(data => console.log(data));
// teams.getTeamById(3).then(data => console.log(data));

players.getPlayersByTeam(6, 2021).then(data => console.log(data.response));
players.getPlayerById(241).then(data => console.log(data.response));