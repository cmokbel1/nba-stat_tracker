const playersUrl = 'https://api-nba-v1.p.rapidapi.com/players';
const apiKey = process.env.RAPID_API_KEY;
const axios = require('axios');

const getPlayersByTeam = async (id, season) => {
    try {
        console.log(`fetching players from team: ${id}`);
        const players = await axios.get(`${playersUrl}?team=${id}&season=${season}`,
            {
                method: "get",
                headers: {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": apiKey
                }
            })
        console.log(players);
        return players.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

const getPlayerById = async (id) => {
    try {
        console.log(`fetching player: ${id}`);
        const player = await axios.get(`${playersUrl}?id=${id}`,
            {
                method: "get",
                headers: {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": apiKey
                }
            })
            console.log(player);
            return player.data.response;
    } catch (err) {
        console.log(err);
        return { "error": err.message };
    }
}

module.exports.getPlayersByTeam = getPlayersByTeam;
module.exports.getPlayerById = getPlayerById;