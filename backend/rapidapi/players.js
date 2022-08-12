const axios = require('axios');
const cfg = require('./config');

const getPlayerById = async (id) => {
    try {
        console.log(`fetching player: ${id}`);
        const player = await axios.get(`${cfg.baseUrl}/players?id=${id}`, cfg.requestConfig);
        if (player.data.response.length > 0) {
            // returning the index 0 allows us to see the entire object, including the object data for leagues which gives us
            // the players jersey number, as well as their position and active status
            return player.data.response[0];
        }
        return { "error": `Player with ${id} not found` };
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

const getPlayerStatisticsById = async (id, season) => {
    try {
        console.log(`fetching player: ${id} statistics, from season: ${season} `);
        const opts = Object.assign({ params: { id, season }}, cfg.requestConfig);
        const player = await axios.get(`${cfg.baseUrl}/players/statistics`, opts);
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