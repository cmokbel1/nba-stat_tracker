const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8081;
const teams = require('./http/teams');
const players = require('./http/players');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// get teams
app.get('/teams/conference/:conference', async (req,res) => {
   const data = await teams.getTeamsByConference(req.params.conference);
   if (data.error) {
    res.status(400).json(data);
   } else {
    res.json(data);
   }
});

app.get('/teams/:id', async (req,res) => {
  const data = await teams.getTeamById(req.params.id);
  if (data.error) {
    res.status(400).json(data);
  } else {
    res.json(data);
  }
})
// get players
app.get('players/team/:id/:season', async (req,res) => {
  const data = await players.getPlayersByTeam(req.params.id, req.params.season);
  if (data.error) {
    res.status(400).json(data);
  } else {
    res.json(data);
  }
})

app.get('/players/:id', async (req,res) => {
  const data = await players.getPlayerById(req.params.id);
  if (data.error) {
    res.status(400).json(data);
  } else {
    res.json(data);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});