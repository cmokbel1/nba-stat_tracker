const router = require('express').Router();
const rapidapi = require('../rapidapi');
const { Roster, ConferenceTeam, TeamStatistics, RosterPlayer } = require('../lib/models.js');

// get teams by id
router.get('/:id', async (req, res) => {
    if (isNaN(req.params.id)) {
      res.status(400).json({"error": "Id must be a number"})
      return;
    }
    const data = await rapidapi.teams.getTeamById(req.params.id);
    if (data.error) {
      res.status(400).json(data.error);
      return;
    }
    res.json(data);
  })

// get teams by conference
router.get('/conference/:conference', async (req, res) => {
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
  
  // get all players on a team for current season
  router.get('/:id/players', async (req, res) => {
    const season = req.query.season || 2021;
    if (isNaN(req.params.id)) {
      res.status(400).json({"error": "Id must be a number"})
      return;
    }
    if (isNaN(season) || season.toString().length != 4) {
      res.status(400).json({"error": "Invalid season"})
      return;
    }
    const data = await rapidapi.teams.getTeamPlayersBySeason(req.params.id, season);
    if (data.error) {
      res.status(400).json(data.error);
      return;
    }
    const roster = new Roster(req.params.id)
    for (let i=0; i <= data.length; i++) {
      roster.addPlayer(RosterPlayer(data[i]));
    }
    res.json(roster);
  })

  //get teams by division
  router.get('/division/:division', async (req, res) => {
    const data = await rapidapi.teams.getTeamsByDivision(req.params.division);
    if (data.error) {
      res.status(400).json(data.error);
      return;
    }
    res.json(data);
  })
  // get team stats in a given season for each game
  router.get('/:id/statistics', async (req, res) => {
    const season = req.query.season || 2021;
    if (isNaN(req.params.id)) {
      res.status(400).json({"error": "Id must be a number"})
      return;
    }
    if (isNaN(season) || season.toString().length != 4) {
      res.status(400).json({"error": "Invalid season"})
      return;
    }
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

module.exports = router;