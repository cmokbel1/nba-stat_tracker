export class RosterPlayer {

    constructor(id, firstName, lastName, jerseyNumber) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.jerseyNumber = jerseyNumber;
    }
  
    fullName() {
      return this.firstName + this.lastName;
    }
  }
  
export class Roster {
  
    constructor(id, teamName) {
      this.id = id;
      this.teamName = teamName;
      this.players = [];
    }
  
    addPlayer(player) {
      this.players.push(player);
    }
  }
  
export class ConferenceTeam {
    constructor(id, conference, teamName) {
      this.id = id;
      this.conference = conference;
      this.teamName = teamName;
    }
  }

export class TeamStatistics {
  //fieldGoalPercentage(m,a) = field goal percentage(made, attempts) // freeThrowPerecentage(m,a) = free throw percentage(made, attempts)
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