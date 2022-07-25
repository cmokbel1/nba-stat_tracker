const { pipelinePrimaryTopicReference } = require('@babel/types');
const axios = require('axios');
const { ModuleMocker } = require('jest-mock');
const cfg = require('./config');

const getPlayerById = async (id) => {
    try {
        console.log(`fetching player: ${id}`);
        const player = await axios.get(`${cfg.baseUrl}/players?id=${id}`, cfg.requestConfig);
        return player.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

const getPlayerStatisticsById = async (id, season) => {
    try {
        console.log(`fetching player: ${id} statistics, from season: ${season} `);
        const player = await axios.get(`${cfg.baseUrl}/players/statistics?season=${season}&id=${id}`, cfg.requestConfig);
        return player.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

const getPlayerByName = async (name) => {
try {
    console.log(`fetching player(s) with name: ${name}`);
    const player = await axios.get(`${cfg.baseUrl}/players?search=${name}`, cfg.requestConfig);
    return player.data.response;
} catch (err) {
    console.log(err);
    return { "error": err.message };
}
}

module.exports.getPlayerById = getPlayerById;
module.exports.getPlayerStatisticsById = getPlayerStatisticsById;
module.exports.getPlayerByName = getPlayerByName;