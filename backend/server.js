const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8081;
const rapidapi = require('./rapidapi');
import { RosterPlayer, Roster, ConferenceTeam, TeamStatistics } from './lib/models.js';

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// get teams
app.get('/teams/conference/:conference', async (req, res) => {
  const data = await rapidapi.teams.getTeamsByConference(req.params.conference);
  if (data.error) {
    res.status(400);
  }
  res.json(data);
});

app.get('/teams/:id', async (req, res) => {
  const data = await rapidapi.teams.getTeamById(req.params.id);
  if (data.error) {
    res.status(400);
  }
  res.json(data);
})
// get all players on a team for current season
app.get('/teams/:id/players', async (req, res) => {
  const season = req.query.season || 2021;
  const data = await rapidapi.teams.getTeamPlayersBySeason(req.params.id, season);
  if (data.error) {
    res.status(400);
  }
  const roster = new Roster(req.params.id)
  for (let i=0; i <= data.length; i++) {
    Roster.addPlayer(data[i])
  }
  res.json(roster);
})

app.get('/teams/division/:division', async (req, res) => {
  const data = await rapidapi.teams.getTeamsByDivision(req.params.division);
  if (data.error) {
    res.status(400);
  }
  res.json(data);
})

app.get('teams/:id/statistics', async (req, res) => {
  const season = req.query.season || 2021;
  const data = await rapidapi.teams.getTeamStatisticsById(req.params.id, season);
  if (data.error) {
    res.status(400);
  }
  const teamStats = new TeamStatistics(req.params.id, data.games, data.points, data.fgm, data.fga, data.fgp, data.ftm, data.gta, data.ftp, data.totreb, data.assists, data.steals, data.turnovers, data.blocks)
  res.json(teamStats);
})

app.get('/players/:id', async (req, res) => {
  const data = await rapidapi.players.getPlayerById(req.params.id);
  if (data.error) {
    res.status(400);
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

/*
Home Page - displays teams organized by conference
  team: 
    id - Number,
    conference - string,
    teamName - string

Roster View - displays Players on team, [ team stats ]
getTeamPlayersBySeason function

  team:
    id - Number,
    teamName - string
    players - []RosterPlayer
  RosterPlayer:
    id - Number,
    fullName - string,
    jerseyNumber - Number

Player Detail View - displays detailed player stats
  PlayerDetails:
    id - Number,
    fullName - string,
    jerseyNumber - Number,

*/