const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8081;
const rapidapi = require('./rapidapi');
const { RosterPlayer, Roster, ConferenceTeam, TeamStatistics } = require('./lib/models.js');

app.use(cors());

const validationCheck = (id, season = null) => {
  if (isNaN(id)) {
    res.status(400).json({"error": "Id must be a number"})
    return;
  }
  if (isNaN(season) && season.length !== 4) {
    res.status(400).json({"error": "Invalid season"})
    return;
  }
};

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// get teams
app.get('/teams/conference/:conference', async (req, res) => {
  const conf = req.params.conference.toLowerCase();
  if (conf != 'east' && conf != 'west') {
    res.status(400).json({ "error" : "Conference must be either East or West" });
    return;
  }
  const data = await rapidapi.teams.getTeamsByConference(req.params.conference);    
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  const conferenceTeams = [];
  for (let i=0; i < data.length; i++) {
    if (data[i].nbaFranchise === true) {
      conferenceTeams.push(new ConferenceTeam(data[i]));
    }
  }
  res.json(conferenceTeams);
});

app.get('/teams/:id', async (req, res) => {
  validationCheck(req.params.id);
  const data = await rapidapi.teams.getTeamById(req.params.id);
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  res.json(data);
})

// get all players on a team for current season
app.get('/teams/:id/players', async (req, res) => {
  const season = req.query.season || 2021;
  validationCheck(req.params.id, season);
  const data = await rapidapi.teams.getTeamPlayersBySeason(req.params.id, season);
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  const roster = new Roster(req.params.id)
  for (let i=0; i <= data.length; i++) {
    roster.addPlayer(data[i])
  }
  res.json(roster);
})

app.get('/teams/division/:division', async (req, res) => {
  const data = await rapidapi.teams.getTeamsByDivision(req.params.division);
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  res.json(data);
})

app.get('/teams/:id/statistics', async (req, res) => {
  const season = req.query.season || 2021;
  validationCheck(req.params.id,season);
  const datas = await rapidapi.teams.getTeamStatisticsById(req.params.id, season);
  if (datas.error) {
    res.status(400).json(datas.error);
    return;
  }
  const data = datas[0];
  const teamStats = new TeamStatistics(req.params.id,
   data.games, data.points, data.fgm, data.fga, data.fgp,
    data.ftm, data.gta, data.ftp, data.totreb, data.assists,
     data.steals, data.turnovers, data.blocks)
  res.json(teamStats);
})

app.get('/players/:id', async (req, res) => {
  validationCheck(req.params.id);
  const data = await rapidapi.players.getPlayerById(req.params.id);
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  let jerseyNumber = "";
  if (data.leagues.standard) {
    jerseyNumber = data.leagues.standard.jersey;
  }
  const player = new RosterPlayer(req.params.id, data.firstname, data.lastname, jerseyNumber);
  res.json(player);
})

app.listen(port, () => {
  console.log(`backend listening on port ${port}`)
});
