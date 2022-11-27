const router = require('express').Router();
const rapidapi = require('../rapidapi');
const { RosterPlayer } = require('../lib/models.js');

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
    console.log(data);
    const player = new RosterPlayer(req.params.id, data.firstname, data.lastname, jerseyNumber);
    res.json(player);
  })

router.get('/:id/statistics', async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({"error": "Id must be a number"})
    return;
  }
  const data = await rapidapi.players.getPlayerStatisticsById(req.params.id);
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  console.log(data);
})
  module.exports = router