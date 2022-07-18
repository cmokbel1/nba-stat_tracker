const teams = require('./http/teams');

teams.getTeamsByConference("East").then(data => console.log(data));
teams.getTeamById(2).then(data => console.log(data));