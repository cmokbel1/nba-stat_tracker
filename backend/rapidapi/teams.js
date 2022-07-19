const axios = require('axios');
const cfg = require('./config');

const getTeamsByConference = async (conference) => {
    try {
        console.log(`fetching teams for conference: ${conference}`);
        const teams = await axios.get(`${cfg.baseUrl}/teams?conference=${conference}`, cfg.requestConfig)
        console.log(teams);
        return teams.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
};

const getTeamById = async (id) => {
    try {
        console.log(`fetching team with id: ${id}`);
        const team = await axios.get(`${cfg.baseUrl}/teams?id=${id}`, cfg.requestConfig)
        console.log(team);
        return team.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

const getTeamPlayersBySeason = async (id, season) => {
    try {
        console.log(`fetching players from team: ${id} season: ${season}`);
        const players = await axios.get(`${cfg.baseUrl}/players?team=${id}&season=${season}`, cfg.requestConfig)
        return players.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

module.exports.getTeamsByConference = getTeamsByConference;
module.exports.getTeamById = getTeamById;
module.exports.getTeamPlayersBySeason = getTeamPlayersBySeason;