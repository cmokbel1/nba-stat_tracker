const rapidapi = require('./rapidapi');

// rapidapi.teams.getTeamsByConference("East").then(data => console.log(data));
// rapidapi.teams.getTeamById(3).then(data => console.log(data));

// rapidapi.teams.getTeamPlayersBySeason(6, 2021).then(data => console.log(data));
// rapidapi.players.getPlayerById(241).then(console.log);
// rapidapi.players.getPlayerStatisticsById(734, 2021).then(console.log);
rapidapi.players.getPlayerBySearch("bryant").then(console.log);
