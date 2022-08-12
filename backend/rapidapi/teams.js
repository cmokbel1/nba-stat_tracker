const axios = require('axios');
const cfg = require('./config');

const getTeamsByConference = async (conference) => {
    try {
        console.log(`fetching teams for conference: ${conference}`);
        const teams = await axios.get(`${cfg.baseUrl}/teams?conference=${conference}`, cfg.requestConfig);
        return teams.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
};

const getTeamById = async (id) => {
    try {
        console.log(`fetching team with id: ${id}`);
        const team = await axios.get(`${cfg.baseUrl}/teams?id=${id}`, cfg.requestConfig);
        return team.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

const getTeamPlayersBySeason = async (id, season) => {
    try {
        console.log(`fetching players from team: ${id} season: ${season}`);
        const opts = Object.assign({ params: { team:id, season } }, cfg.requestConfig);
        const players = await axios.get(`${cfg.baseUrl}/players`, opts);
        return players.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

const getTeamsByDivision = async (division) => {
    try {
        console.log(`fetching teams from division: ${division}`);
        const teams = await axios.get(`${cfg.baseUrl}/teams?division=${division}`, cfg.requestConfig);
        return teams.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

const getTeamStatisticsById = async (id, season) => {
    try {
        console.log(`fetching stats for team: ${id}, season: ${season}`);
        const stats = await axios.get(`${cfg.baseUrl}/teams/statistics?season=${season}&id=${id}`, cfg.requestConfig);
        return stats.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

module.exports.getTeamsByConference = getTeamsByConference;
module.exports.getTeamById = getTeamById;
module.exports.getTeamPlayersBySeason = getTeamPlayersBySeason;
module.exports.getTeamsByDivision = getTeamsByDivision;
module.exports.getTeamStatisticsById = getTeamStatisticsById;