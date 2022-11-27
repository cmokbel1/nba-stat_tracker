const router = require('express').Router();
const rapidapi = require('../rapidapi');
const { RosterPlayer, RosterPlayerStats } = require('../lib/models.js');

router.get('/:id', async (req, res) => {
    if (isNaN(req.params.id)) {
      res.status(400).json({"error": "Id must be a number"})
      return;
    }
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

router.get('/:id/statistics', async (req, res) => {
  const season = req.query.season || 2021;
  if (isNaN(req.params.id)) {
    res.status(400).json({"error": "Id must be a number"})
    return;
  }
  const data = await rapidapi.players.getPlayerStatisticsById(req.params.id, season);
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  let teamId = data[0].team.id;
  let totalPoints = 0;
  let totalFgm = 0;
  let totalFga = 0;
  let totalAssists = 0;
  for (let i=0; i < data.length; i++) {
    if (data[i].points !== null) {
      totalPoints += data[i].points;
    }
    if (data[i].fgm !== null) {
      totalFgm += data[i].fgm;
    }
    if (data[i].fga !== null) {
      totalFga += data[i].fga;
    }
    if (data[i].assists !== null) {
      totalAssists += data[i].assists;
    }
  }
  let playerStats = new RosterPlayerStats(teamId,totalPoints, totalFgm, totalFga, totalAssists);
  console.log(playerStats)
  res.json(playerStats);
})

module.exports = router