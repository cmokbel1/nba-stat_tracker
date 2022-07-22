const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8081;
const rapidapi = require('./rapidapi');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// get teams
app.get('/teams/conference/:conference', async (req, res) => {
  const data = await rapidapi.teams.getTeamsByConference(req.params.conference);
  if (data.error) {
    res.status(400);
  } else {
    res.json(data);
  }
});

app.get('/teams/:id', async (req, res) => {
  const data = await rapidapi.teams.getTeamById(req.params.id);
  if (data.error) {
    res.status(400);
  } else {
    res.json(data);
  }
})
// get all players on a team for current season
app.get('/teams/:id/players', async (req, res) => {
  const season = req.query.season || 2021;
  const data = await rapidapi.teams.getTeamPlayersBySeason(req.params.id, season);
  if (data.error) {
    res.status(400);
  } else {
    res.json(data);
  }
})

app.get('/teams/division/:division', async (req,res) => {
  const data = await rapidapi.teams.getTeamsByDivision(req.params.division);
  if (data.error) {
    res.status(400);
  } else {
    res.json(data);
  }
})

app.get('teams/:id/statistics', async (req,res) => {
  const season = req.query.season || 2021;
  const data = await rapidapi.teams.getTeamStatisticsById(req.params.id, season);
  if (data.error) {
    res.status(400);
  } else {
    res.json(data);
  }
})

app.get('/players/:id', async (req, res) => {
  const data = await rapidapi.players.getPlayerById(req.params.id);
  if (data.error) {
    res.status(400);
  } else {
    res.json(data);
  }
})

app.listen(port, () => {
  console.log(`backend listening on port ${port}`)
});