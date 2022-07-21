const axios = require('axios');
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

module.exports.getPlayerById = getPlayerById;