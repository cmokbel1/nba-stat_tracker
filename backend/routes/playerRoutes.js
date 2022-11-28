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
  let totalSteals = 0;
  let totalBlocks = 0;
  let totalTurnovers = 0;
  for (let i=0; i < data.length; i++) {
    const points = data[i].points;
    const fgm = data[i].fgm;
    const fga = data[i].fga;
    const assists = data[i].assists;
    const steals = data[i].steals;
    const blocks = data[i].blocks;
    const turnovers = data[i].turnovers;
    // add non null values to totals 
    totalPoints += points !== null ? points : 0;
    totalFgm += fgm !== null ? fgm : 0;
    totalFga += fga !== null ? fga : 0;
    totalAssists += assists !== null ? assists : 0;
    totalSteals += steals !== null ? steals : 0;
    totalBlocks += blocks !== null ? blocks : 0;
    totalTurnovers += turnovers !== null ? turnovers : 0;
  }
  const playerStats = new RosterPlayerStats(teamId,totalPoints, totalFgm, totalFga, totalAssists, totalSteals, totalBlocks, totalTurnovers);
  res.json(playerStats);
})

module.exports = router