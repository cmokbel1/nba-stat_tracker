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