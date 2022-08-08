class RosterPlayer {

  constructor(id, firstName, lastName, jerseyNumber) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.jerseyNumber = jerseyNumber;
    this.fullName = firstName + " " + lastName;
  }
}

class Roster {

  constructor(id) {
    this.id = id;
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }
}

class ConferenceTeam {

  constructor(id, conference, teamName) {
    this.id = id;
    this.conference = conference;
    this.teamName = teamName;
  }
}

class TeamStatistics {

  constructor(id, games, points, fieldGoalsMade, fieldGoalsAttempted, fieldGoalPercentage, freeThrowsMade, freeThrowsAttempted, freeThrowPerecentage, rebounds, assists, steals, turnovers, blocks) {
    this.id = id;
    this.games = games;
    this.points = points;
    this.fieldGoalsMade = fieldGoalsMade;
    this.fieldGoalsAttempted = fieldGoalsAttempted;
    this.fieldGoalPercentage = fieldGoalPercentage;
    this.freeThrowsMade = freeThrowsMade;
    this.freeThrowsAttempted = freeThrowsAttempted;
    this.freeThrowPerecentage = freeThrowPerecentage;
    this.rebounds = rebounds;
    this.assists = assists;
    this.steals = steals;
    this.turnovers = turnovers;
    this.blocks = blocks;
  }
}

module.exports = { RosterPlayer, Roster, ConferenceTeam, TeamStatistics }