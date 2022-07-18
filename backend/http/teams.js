require('dotenv').config();
const teamsUrl = 'https://api-nba-v1.p.rapidapi.com/teams';
const apiKey = process.env.RAPID_API_KEY;
const axios = require('axios');

const getTeamsByConference = async (conference) => {
    try {
        console.log(`fetching teams for conference: ${conference} `)
        const teams = await axios.get(`${teamsUrl}?conference=${conference}`, {
                method: "get",
                headers: {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": apiKey
                }
        })
        console.log(teams);
        return teams.data.response;
    } catch (err) {
        console.log(err);
        return {"error": err.message};
    }
};

module.exports.getTeamsByConference = getTeamsByConference;